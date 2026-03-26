// ============================================================
// AI Service — NVIDIA Nemotron (OpenAI-compatible API)
// Called by statResolver.js.
// Returns { nextScene, deltas, storySummary } for the given player choice.
// ============================================================

import { logRequest, logResponse, logError } from "./logger";

const API_KEY  = import.meta.env.VITE_NVIDIA_API_KEY;
const MODEL    = import.meta.env.VITE_NVIDIA_MODEL_NAME;
// Route through Vite's dev proxy (/nvidia-api → https://integrate.api.nvidia.com)
// to avoid CORS restrictions in the browser
const BASE_URL = "/nvidia-api/v1";

// ------------------------------------------------------------
// Prompt builders
// ------------------------------------------------------------

function buildSystemPrompt(story, step, isCustom) {
  let prompt = story.config.systemPromptBase ?? "";

  if (isCustom && story.config.customInputFraming) {
    prompt += "\n\n" + story.config.customInputFraming;
  }

  const checkpoint = story.config.softCheckpoints?.find((c) => c.atStep === step);
  if (checkpoint) {
    prompt += `\n\nThis scene must include: ${checkpoint.mustInclude}.`;
  }

  prompt += `

Respond ONLY with valid JSON in exactly this shape — no markdown, no extra text:
{
  "sceneText": "2–3 paragraph narrative for this scene",
  "choices": ["choice A (10–12 words)", "choice B (10–12 words)"],
  "statDeltas": { "statName": delta },
  "storySummary": "1–2 sentence summary"
}
Rules:
- sceneText should continue naturally from the previous scene and the player's choice.
- statDeltas reflects the consequence of the action the player just took — not predictions for the next choices. Affect 1–3 stats, integers between -15 and +15. Only include non-zero keys.
- Available stats: wit, charm, luck, excitement, nerve.
- storySummary must be 1–2 sentences MAXIMUM. Capture only the key story beats and the player's most recent action. Be ruthlessly concise — omit anything not essential to narrative continuity. Do not pad or repeat.`;

  return prompt;
}

function buildUserPrompt(step, choiceText, storySummary, stats, totalSteps) {
  const summaryLine = storySummary ?? "(story is just beginning)";

  const statLine = Object.entries(stats)
    .map(([k, v]) => `${k[0].toUpperCase()}${k.slice(1)} ${v}`)
    .join(", ");

  return `Step: ${step} of ${totalSteps}

Context: ${summaryLine}

Current stats: ${statLine}

The player just chose: "${choiceText}"

Generate the next scene.`;
}

// ------------------------------------------------------------
// Main export
// ------------------------------------------------------------

export async function generateScene({ story, step, choiceText, choiceIndex, storySummary, stats }) {
  const isCustom = choiceIndex == null;
  const systemPrompt = buildSystemPrompt(story, step, isCustom);
  const userPrompt = buildUserPrompt(step, choiceText, storySummary, stats, story.scenes.length);

  logRequest(step, choiceText, systemPrompt, userPrompt);

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const msg = `NVIDIA API error: ${response.status} ${response.statusText}`;
    logError(step, msg);
    throw new Error(msg);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) {
    logError(step, "Empty response from API");
    throw new Error("Empty response from API");
  }

  // Strip markdown code fences if the model wraps its JSON anyway
  const cleaned = raw.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
  const parsed = JSON.parse(cleaned);

  logResponse(step, raw, parsed);

  const nextScene = {
    text: parsed.sceneText,
    choices: parsed.choices,
    // No precomputed statChanges — deltas are resolved per-action, not per-future-choice
  };

  // statDeltas is now a flat object for the action the player just took
  const deltas = parsed.statDeltas ?? {};
  const newSummary = parsed.storySummary ?? storySummary;

  return { nextScene, deltas, storySummary: newSummary };
}

// ============================================================
// AI Service — NVIDIA Nemotron (OpenAI-compatible API)
// Called by statResolver.js in Phase 4.
// Returns { nextScene, deltas } for the given player choice.
// ============================================================

const API_KEY   = import.meta.env.VITE_NVIDIA_API_KEY;
const MODEL     = import.meta.env.VITE_NVIDIA_MODEL_NAME;
// Route through Vite's dev proxy (/nvidia-api → https://integrate.api.nvidia.com)
// to avoid CORS restrictions in the browser
const BASE_URL  = "/nvidia-api/v1";

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
  "statDeltas": {
    "choice0": { "statName": delta },
    "choice1": { "statName": delta }
  }
}
Rules:
- Only include non-zero keys in statDeltas. Delta values are integers between -15 and +15.
- Available stats: wit, charm, luck, excitement, nerve.
- Each choice in statDeltas should affect 1–3 stats.
- sceneText should continue naturally from the previous scene and the player's choice.`;

  return prompt;
}

function buildUserPrompt(step, choiceText, choiceHistory, stats) {
  const historyLines = choiceHistory.length > 0
    ? choiceHistory.map((e) => `  Step ${e.step}: player chose "${e.choiceText}"`).join("\n")
    : "  (no choices yet — this is the first)";

  const statLine = Object.entries(stats)
    .map(([k, v]) => `${k[0].toUpperCase()}${k.slice(1)} ${v}`)
    .join(", ");

  return `Step: ${step} of 6

Story so far:
${historyLines}

Current stats: ${statLine}

The player just chose: "${choiceText}"

Generate the next scene.`;
}

// ------------------------------------------------------------
// Main export
// ------------------------------------------------------------

export async function generateScene({ story, step, choiceText, choiceIndex, choiceHistory, stats }) {
  const isCustom = choiceIndex == null;

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: buildSystemPrompt(story, step, isCustom) },
        { role: "user",   content: buildUserPrompt(step, choiceText, choiceHistory, stats) },
      ],
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    throw new Error(`NVIDIA API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty response from API");

  // Strip markdown code fences if the model wraps its JSON anyway
  const cleaned = raw.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
  const parsed = JSON.parse(cleaned);

  const nextScene = {
    text: parsed.sceneText,
    choices: parsed.choices,
    statChanges: [parsed.statDeltas?.choice0 ?? {}, parsed.statDeltas?.choice1 ?? {}],
  };

  // Deltas for the choice the player actually made
  const deltaKey = isCustom ? "choice0" : `choice${choiceIndex}`;
  const deltas = parsed.statDeltas?.[deltaKey] ?? {};

  return { nextScene, deltas };
}

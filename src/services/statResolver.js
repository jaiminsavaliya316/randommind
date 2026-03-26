import { generateScene } from "./aiService";

// Fallback deltas used when AI call fails and no hardcoded statChanges exist
const CUSTOM_INPUT_SPREAD = { wit: 3, charm: 3, luck: 3, excitement: 3, nerve: 3 };

// Returns { deltas, nextScene }
// deltas     — stat changes for the chosen option
// nextScene  — { text, choices, statChanges } for the next step (AI-generated or hardcoded fallback)
export async function resolveStatChanges({ scene, choiceText, choiceIndex, statNames, choiceHistory, step, story, stats }) {
  const isCustom = choiceIndex == null;

  try {
    return await generateScene({ story, step, choiceText, choiceIndex, choiceHistory, stats });
  } catch (err) {
    console.warn("AI scene generation failed — using hardcoded fallback:", err);

    const deltas = isCustom
      ? { ...CUSTOM_INPUT_SPREAD }
      : (scene.statChanges?.[choiceIndex] ?? {});

    // story.scenes is 0-indexed; step is the current step (before increment)
    // so story.scenes[step] is the next scene
    const nextScene = story.scenes[step] ?? story.scenes[story.scenes.length - 1];

    return { deltas, nextScene };
  }
}

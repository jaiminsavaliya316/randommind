// ============================================================
// PHASE 4 SWAP POINT
// This is the only function that needs to change in Phase 4.
//
// Current (Phase 3): returns hardcoded deltas from scene.statChanges[choiceIndex]
// Phase 4: make this async and replace the body with a Claude API call:
//   - Pass scene.text (narrative context), choiceText (what the player chose),
//     and statNames (["wit","charm","luck","excitement","nerve"]) to the API
//   - Parse the response and return the same delta shape
//   - In useGameState.js: add `async` to selectChoice + `await` before this call
//
// INPUT CONTRACT (must stay the same in Phase 4):
//   { scene, choiceText, choiceIndex, statNames }
//   - scene:       current scene object (has .text and .statChanges)
//   - choiceText:  string of what the player chose
//   - choiceIndex: 0 | 1 | undefined  (undefined = custom text input)
//   - statNames:   string[] e.g. ["wit","charm","luck","excitement","nerve"]
//
// OUTPUT CONTRACT (must stay the same in Phase 4):
//   Plain object with stat deltas — only include non-zero keys.
//   e.g. { excitement: 10, nerve: 5 }
//   Missing keys are treated as 0 by applyDeltas in useGameState.js.
// ============================================================

// Applied when the player uses the custom text input (no choiceIndex).
// Balanced spread so free-form choices don't strongly push any ending.
const CUSTOM_INPUT_SPREAD = { wit: 3, charm: 3, luck: 3, excitement: 3, nerve: 3 };

export function resolveStatChanges({ scene, choiceIndex }) {
  if (choiceIndex === undefined || choiceIndex === null) {
    return { ...CUSTOM_INPUT_SPREAD };
  }

  const changes = scene.statChanges?.[choiceIndex];
  return changes ? { ...changes } : {};
}

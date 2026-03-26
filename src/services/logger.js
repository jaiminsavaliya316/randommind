// ============================================================
// Session Logger
// Accumulates API call data in memory during a playthrough.
// Call downloadLogs() at game end to save a timestamped JSON file.
// ============================================================

const LOGGING_ENABLED = import.meta.env.VITE_ENABLE_LOGGING === "true";

let session = null;

export function startSession() {
  if (!LOGGING_ENABLED) return;
  session = {
    sessionStart: new Date().toISOString(),
    calls: [],
  };
}

// Call before making the API request
export function logRequest(step, choiceText, systemPrompt, userPrompt) {
  if (!LOGGING_ENABLED || !session) return;
  session.calls.push({
    step,
    choiceText,
    timestamp: new Date().toISOString(),
    request: { systemPrompt, userPrompt },
    response: null,
    error: null,
  });
}

// Call after successfully parsing the API response
export function logResponse(step, raw, parsed) {
  if (!LOGGING_ENABLED || !session) return;
  const entry = [...session.calls].reverse().find((c) => c.step === step);
  if (entry) entry.response = { raw, parsed };
}

// Call when the API call or JSON parse fails
export function logError(step, errorMessage) {
  if (!LOGGING_ENABLED || !session) return;
  const entry = [...session.calls].reverse().find((c) => c.step === step);
  if (entry) entry.error = errorMessage;
}

// Triggers a browser download of the full session as a JSON file
export function downloadLogs() {
  if (!LOGGING_ENABLED || !session) return;

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19); // "2026-03-26T14-30-05" → trim to seconds

  const filename = `randommind-${timestamp}.json`;
  const blob = new Blob([JSON.stringify(session, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

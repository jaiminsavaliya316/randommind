# RandomMind – React Prototype Build Plan

## Architecture Overview

```
src/
├── App.jsx                  ← Router: Home vs Game
├── data/
│   └── theCave.js           ← Story disc: start scene, endings, config
├── components/
│   ├── HomeScreen.jsx       ← Game library grid
│   ├── GameScreen.jsx       ← Main gameplay container
│   ├── StoryText.jsx        ← Renders current scene narrative
│   ├── ThoughtClouds.jsx    ← 3 choice clouds (2 AI + 1 custom input)
│   ├── StatBar.jsx          ← W C L C N icons in header
│   ├── LoadingScreen.jsx    ← "Loading..." AI generation state
│   └── EndingScreen.jsx     ← Final ending display + personality recap
├── hooks/
│   └── useGameState.js      ← Core state machine (stats, step, history)
└── services/
    └── aiService.js         ← Claude API calls for scene generation
```

## Game State Shape

```js
{
  currentDisc: "the-cave",       // which story disc is loaded
  step: 0,                       // 0 = start, 1–6 = AI middle, 7 = ending
  stats: {
    wit: 50, charm: 50, luck: 50, curiosity: 50, nerve: 50
  },
  choiceHistory: [],             // array of { step, choiceText, statChanges }
  currentScene: {                // what's on screen right now
    text: "...",
    choices: ["Stay hidden and wait", "Try to mimic the sound"]
  },
  isLoading: false,              // show loading screen when true
  gamePhase: "home"              // "home" | "playing" | "ending"
}
---

## Build Phases

### Phase 1: Home Screen + Navigation
**Goal:** Match Figma Screen 1 — game library grid, clicking a card starts the game.

Tasks:
- Set up React project (Vite + React)
- Build HomeScreen with 6 card grid (only "The Cave" is clickable)
- Implement App-level routing between "home" and "playing" states
- Style to match dark theme from wireframes
- Placeholder thumbnails for non-Cave games

**Done when:** You can see the home grid → click "The Cave" → transition happens.

---

### Phase 2: Core Gameplay UI (Hardcoded)
**Goal:** Match Figma Screens 2, 3, 4 — the full gameplay loop with fake/hardcoded story data.

Tasks:
- Build GameScreen layout: header (title + stat icons), story text area, thought clouds
- Build ThoughtClouds component: 2 pre-set choices + 1 expandable custom input cloud
- Build expanding cloud interaction (Screen 4 → Screen 3 transition)
- Build LoadingScreen shown between steps
- Build StatBar with W/C/L/C/N circles (display only, no real tracking yet)
- Wire up hardcoded scene progression: click choice → loading → next hardcoded scene
- Build EndingScreen for step 7

**Done when:** Full click-through from start → 6 hardcoded middle scenes → ending, with the correct UI states at each step.

---

### Phase 3: State Engine + Stats
**Goal:** Make stats actually work — choices affect W/C/L/C/N, ending is selected by stats.

Tasks:
- Build useGameState hook managing stats, step count, and choice history
- Define stat impact rules (each choice shifts 1–3 stats by ±5 to ±15)
- StatBar now reflects live values (consider hover/click to show numbers)
- Ending selection logic: at step 7, pick ending based on highest stat
- Tie-breaking rule for stats (e.g., prioritize the stat that changed most recently)

**Done when:** Stats visibly change as you play, and different choice paths lead to different endings.

---

### Phase 4: AI Scene Generation
**Goal:** Replace hardcoded middle scenes with Claude API calls.

Tasks:
- Build aiService.js with Claude API integration
- Design the scene generation prompt:
  - System: story disc config (tone, setting, stat definitions)
  - User: choice history + current stats + step number + "generate next scene"
  - Response format: JSON with scene text + 2 choice options + stat adjustments
- Handle the custom input cloud (third choice) — pass player's typed text to AI
- Add error handling and fallback (if API fails, show retry or use fallback scene)
- Loading screen shows during API call

**Done when:** Middle scenes (steps 1–6) are AI-generated, start and endings remain hardcoded.

---

### Phase 5: Polish + End-to-End Flow
**Goal:** Seamless experience from home screen through game completion.

Tasks:
- Smooth transitions between all screens
- Typewriter/fade-in effect for story text
- Personality recap on ending screen (which stats were highest, play style summary)
- "Play Again" and "Back to Library" buttons on ending screen
- Mobile responsiveness
- Edge case handling (empty custom input, rapid clicking, etc.)

**Done when:** Someone can pick up the app, play The Cave start to finish, and it feels complete.

---

## Key Design Decisions to Preserve

| Decision | Reason (from UX research) |
|---|---|
| Thought clouds, not buttons | Choices feel like internal thoughts, not menu picks |
| No character figures | Avoids visual novel clichés, keeps focus on text |
| No boxed text areas | Prevents chatbot associations |
| Third cloud = custom input | Player agency; expands on tap (Screen 3 state) |
| Stats hidden by default | Single-letter icons (W/C/L/C/N); detail on interaction |
| "Type your thoughts" placeholder | Clarifies the third cloud's purpose (from user testing) |
| White cloud for custom input | Distinguishes it from pre-set choice clouds |
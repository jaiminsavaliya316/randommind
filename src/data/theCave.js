// ============================================================
// Story Disc: The Cave
// ============================================================

export const THE_CAVE = {
  startScene: {
    text: "The trail was supposed to be a shortcut — twenty minutes through the woods and you'd be back at the campsite before dark. But that was an hour ago. Now the trees have thickened into something older, the kind of forest that doesn't appear on hiking apps. Your flashlight catches something ahead: a gap in the rock face, barely wide enough to squeeze through. From deep inside, a faint hum pulses — not mechanical, not natural. Something in between.\n\nYour phone has no signal. The sun is almost gone. And that hum... it's getting louder.",
    choices: [
      "Squeeze through the gap into the cave",
      "Stay outside and try to find another way back"
    ]
  },
  endings: {
    diplomat:  { minStat: "charm", threshold: 70 },
    scholar:   { minStat: "curiosity", threshold: 70 },
    survivor:  { minStat: "nerve", threshold: 70 },
    trickster: { minStat: "wit", threshold: 70 }
  },
  config: {
    tone: "goofy alien mystery-thriller, non-violent",
    setting: "forest cave with quirky alien researchers",
    totalSteps: 8,
  },
};

// All available discs (home screen grid)
export const DISCS = [
  { id: "the-cave",        title: "The Cave",        description: "Play the mystery thriller alien game",        playable: true  },
  { id: "adventure-quest",  title: "Adventure Quest",  description: "Embark on an epic journey full of challenges.", playable: false },
  { id: "puzzle-mania",     title: "Puzzle Mania",     description: "Challenge your mind with fun puzzles.",        playable: false },
  { id: "football-frenzy",  title: "Football Frenzy",  description: "Join the excitement of the football world.",   playable: false },
  { id: "chess-master",     title: "Chess Master",     description: "Test your strategy skills in this classic game.", playable: false },
  { id: "city-builder",     title: "City Builder",     description: "Create and manage your own city.",             playable: false },
];
import { THE_CAVE } from "./theCave";

// Game library metadata — one entry per disc shown on the home screen
export const DISCS = [
  { id: "the-cave",        title: "The Cave",        description: "Play the mystery thriller alien game",           playable: true  },
  { id: "adventure-quest", title: "Adventure Quest", description: "Embark on an epic journey full of challenges.",  playable: false },
  { id: "puzzle-mania",    title: "Puzzle Mania",    description: "Challenge your mind with fun puzzles.",          playable: false },
  { id: "football-frenzy", title: "Football Frenzy", description: "Join the excitement of the football world.",     playable: false },
  { id: "chess-master",    title: "Chess Master",    description: "Test your strategy skills in this classic game.", playable: false },
  { id: "city-builder",    title: "City Builder",    description: "Create and manage your own city.",               playable: false },
];

// Maps disc id → story data module
// To add a new game: import its story and add one entry here
export const STORY_MAP = {
  "the-cave": THE_CAVE,
};
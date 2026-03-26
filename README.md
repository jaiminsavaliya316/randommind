# RandomMind

An AI-powered interactive narrative game where your choices shape the story and your personality. Built with React + Vite, using the NVIDIA NIM API for scene generation.

---

## Project Structure

```
randommind/
├── public/                      ← Static assets
├── src/
│   ├── App.jsx                  ← Router: Home vs Game vs Ending
│   ├── main.jsx                 ← React entry point
│   ├── styles/
│   │   └── styles.css           ← Global styles (dark theme)
│   ├── data/
│   │   ├── discs.js             ← Game library metadata (all cards)
│   │   └── theCave.js           ← Story disc: scenes, choices, endings, config
│   ├── components/
│   │   ├── HomeScreen.jsx       ← Game library grid
│   │   ├── GameScreen.jsx       ← Main gameplay container
│   │   ├── ThoughtCloud.jsx     ← Choice clouds (2 pre-set + 1 custom input)
│   │   ├── StatIcon.jsx         ← W/C/L/E/N stat icon with fill bar
│   │   ├── LoadingScreen.jsx    ← Shown during AI generation
│   │   ├── EndingScreen.jsx     ← Final ending display + personality recap
│   │   ├── GameCard.jsx         ← Home screen game card
│   │   └── Thumbnail.jsx        ← Game card thumbnail image
│   ├── hooks/
│   │   └── useGameState.js      ← Core state machine (stats, step, history)
│   └── services/
│       └── statResolver.js      ← Resolves stat changes from choices
├── .env                         ← API credentials (never commit this)
├── .gitignore
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An NVIDIA NIM API key (see below)

### Install & Run

```bash
# Clone the repo
git clone <repo-url>
cd randommind

# Install dependencies
npm install

# Create your environment file
cp .env.example .env   # or create .env manually (see below)

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables

Create a `.env` file in the project root with the following:

```env
VITE_NVIDIA_API_KEY=nvapi-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_NVIDIA_API_BASE_URL=https://integrate.api.nvidia.com/v1
VITE_NVIDIA_MODEL_NAME=nvidia/nemotron-mini-4b-instruct
```

> **Never commit your `.env` file.** It is listed in `.gitignore` by default.

---

## Getting a Free NVIDIA API Key

RandomMind uses the [NVIDIA NIM](https://build.nvidia.com) platform to access AI models for free.

### Steps

1. **Go to [build.nvidia.com](https://build.nvidia.com)**

2. **Sign up / Log in**
   - Click **Sign In** (top right)
   - Create a free account with your email, or sign in with Google/GitHub

3. **Find a model**
   - Browse the model catalog or search for `nemotron-mini-4b-instruct`
   - Click on the model to open its page

4. **Generate an API key**
   - Click **Get API Key** (top right of the model page)
   - You may be prompted to create an **Organization** — this is free
   - Click **Generate Key**
   - Copy the key (it starts with `nvapi-`)

5. **Note your model name**
   - The model ID is shown on the page (e.g., `nvidia/nemotron-mini-4b-instruct`)
   - Use this as the value for `VITE_NVIDIA_MODEL_NAME` in your `.env`

6. **Paste into your `.env`**
   ```env
   VITE_NVIDIA_API_KEY=nvapi-your-key-here
   VITE_NVIDIA_API_BASE_URL=https://integrate.api.nvidia.com/v1
   VITE_NVIDIA_MODEL_NAME=nvidia/nemotron-mini-4b-instruct
   ```

### Free Tier Limits

NVIDIA NIM offers a **free credit tier** for developers. You get a set number of free API calls per model — sufficient for development and testing. No credit card required to get started.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Game Stats

Each choice in the game affects your character's stats:

| Icon | Stat | Description |
|---|---|---|
| **W** | Wit | Intelligence and cleverness |
| **C** | Charm | Persuasion and social skill |
| **L** | Luck | Fortune and chance |
| **E** | Excitement | Boldness and enthusiasm |
| **N** | Nerve | Courage under pressure |

Your dominant stats at the end determine which ending you receive.

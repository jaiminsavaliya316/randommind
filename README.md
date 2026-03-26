# RandomMind


An AI-powered interactive narrative game where your choices shape the story and your personality. Built with React + Vite, using the NVIDIA NIM API for scene generation, Claude Code and it's Agents


 PS. This app is using Small Language Model so it might hallucinate a little bit.


 If you want to know more please reachout: jaiminsavaliya317@gmail.com

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

| Variable | Required | Description |
|---|---|---|
| `VITE_NVIDIA_API_KEY` | Yes | Your NVIDIA NIM API key |
| `VITE_NVIDIA_API_BASE_URL` | Yes | NVIDIA NIM base URL (don't change this) |
| `VITE_NVIDIA_MODEL_NAME` | Yes | Model ID from build.nvidia.com |

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

---

## Claude Agent Workflows

This project uses [Claude Code](https://claude.ai/code) as a developer agent for certain tasks. These are run manually by the developer — they are not part of the app itself.

### Writing Tests

The agent can generate unit and integration tests for any service or hook. To request tests, describe what you want covered:

```
Write tests for src/services/logger.js — cover startSession, logRequest, logResponse, logError, and downloadLogs. Mock the DOM for the download trigger.
```

### Git Change Summary

Before committing, the agent can summarize what changed across all modified files and explain the reasoning:

```
Summarize the git changes since the last commit. What was changed and why?
```

### Commit Messages

The agent can review staged changes and draft a conventional commit message:

```
Review my staged changes and suggest a commit message.
```

These workflows are run inside Claude Code (CLI or VS Code extension) with access to the full repository context.



---

## License
![License: All Rights Reserved](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)

Copyright (c) 2026 Jaimin Savaliya. All Rights Reserved.

Unauthorized copying, distribution, or use of this software, in whole or in part, is strictly prohibited without the express written permission of the author.
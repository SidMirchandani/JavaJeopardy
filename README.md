# Java Jeopardy

A browser-based Jeopardy-style review game for **AP Computer Science A (Java)**. Host a class session with a 6×6 board, code snippets, team scoring, and Daily Doubles—no backend required.

**Contributors:** Siddharth M, Anish M, Aarav M, Rakshan S, Ashwin K

## Features

- **36 clues** across six AP CSA topics: Objects & Methods, Selection & Iteration, Classes, Array & Files, ArrayList & Wrappers, and Searching/Sorting/Recursion
- **Interactive board** — click a cell to open the clue modal with Java code and a question prompt (Markdown supported)
- **Team scoreboard** — three teams with editable names and manual score entry
- **Daily Double** — right-click any cell to mark it as a Daily Double
- **Board state** — mark clues correct or wrong; used cells are visually dimmed and tracked until the board is complete
- **Built-in data validation** — optional “Show checks” panel verifies category structure (6 categories × 6 clues, values 100–600)

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | [React](https://react.dev/) 18 |
| Build | [Vite](https://vitejs.dev/) 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) (CDN) |
| Prompts | [react-markdown](https://github.com/remarkjs/react-markdown) |
| Deploy | [Vercel](https://vercel.com/) (`vercel.json` included) |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

### Install and run locally

```bash
git clone https://github.com/SidMirchandani/JavaJeopardy.git
cd JavaJeopardy
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview   # optional: serve the production build locally
```

Output is written to `dist/`.

## Hosting on Vercel

The repo is configured for Vercel out of the box:

- **Build command:** `npm run build`
- **Output directory:** `dist`

Connect the GitHub repository in the Vercel dashboard, or deploy with the [Vercel CLI](https://vercel.com/docs/cli).

## How to play (host guide)

1. **Open the site** on a projector or shared screen.
2. **Rename teams** in the score bar at the bottom and enter starting scores (default 0).
3. **Pick a clue** by clicking a dollar amount on the board.
4. **Read the code and prompt** in the modal; discuss with the class before revealing the answer.
5. **Show answer** when ready, then use **Mark correct** or **Mark wrong** to record the outcome and close the modal.
6. **Update scores** manually in the team inputs after each clue.
7. **Daily Double:** right-click a cell before it is played to flag it; announce the wager in class.
8. **Reset board** or **Reset scores** from the header buttons when starting a new round.

Press **Escape** or **Close** to dismiss the clue modal without marking the cell.

## Project structure

```
EECSJeopardy/
├── JavaJeopardySite.jsx   # Game board, clues, and UI (main app)
├── src/
│   └── main.jsx           # React entry point
├── public/
│   └── EECSLogo.png       # Favicon / touch icon
├── index.html             # Shell, fonts, Tailwind config
├── vite.config.js
├── vercel.json
└── package.json
```

## Customizing questions

All categories and clues live in the `game` object at the top of `JavaJeopardySite.jsx`. Each category needs:

- `key` — single letter shown on the board (e.g. `"A"`)
- `title` — column header
- `clues` — array of six objects with:
  - `value` — 100, 200, 300, 400, 500, or 600
  - `code` — Java snippet or context (shown in the modal)
  - `question` — prompt (Markdown allowed)
  - `answer` — expected response

Use **Show checks** in the app to confirm the board structure after edits.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |

## License

This project is for educational use. Add a license file here if you plan to distribute or reuse it beyond the classroom.

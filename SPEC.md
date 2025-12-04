# GameStuck - MVP Project Spec

## Overview
A web app where users upload game screenshots and get:
1. Game identification
2. Specific area/level/boss identification
3. Relevant YouTube walkthrough links

Think "Shazam for gaming" - helping stuck players find exactly where they are and get unstuck.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Next.js 14 (App Router) | Fast to build, good DX |
| Styling | Tailwind CSS | Rapid prototyping |
| Backend | Next.js API Routes | Keep it simple, single deploy |
| AI | Claude API (claude-sonnet-4-20250514) | Vision + reasoning |
| Video Search | YouTube Data API v3 | Find walkthroughs |
| Hosting | Vercel | Free tier, instant deploys |

---

## Core User Flow

```
[Upload Screenshot]
       ↓
[Claude Vision analyzes image]
       ↓
[Returns: Game, Area, Context]
       ↓
[YouTube API searches for walkthrough]
       ↓
[Display results with clickable links]
```

---

## Supported Games (MVP - 8 titles)

Start with these - they have distinct visuals and tons of walkthrough content:

1. **Elden Ring** - Souls-like, people get stuck constantly
2. **Zelda: Tears of the Kingdom** - Puzzle-heavy, iconic visuals
3. **God of War Ragnarok** - Clear areas, popular
4. **Hollow Knight** - Metroidvania, people get lost
5. **Hades / Hades 2** - Roguelike, distinctive art
6. **Dark Souls 3** - Classic "I'm stuck" game
7. **Minecraft** - Most searched game, building help
8. **Sekiro** - Brutal difficulty, boss help needed

---

## File Structure

```
/gamestuck
├── app/
│   ├── page.tsx              # Main upload page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Tailwind + custom styles
│   └── api/
│       └── analyze/
│           └── route.ts      # POST endpoint for image analysis
├── components/
│   ├── ImageUpload.tsx       # Drag-drop upload component
│   ├── ResultCard.tsx        # Display game + walkthrough
│   └── LoadingState.tsx      # Analysis in progress
├── lib/
│   ├── claude.ts             # Claude API wrapper
│   ├── youtube.ts            # YouTube search wrapper
│   └── prompts.ts            # System prompts
├── public/
│   └── placeholder.png       # Upload placeholder
├── .env.local                # API keys
├── package.json
└── README.md
```

---

## API Endpoint: `/api/analyze`

### Request
```typescript
POST /api/analyze
Content-Type: multipart/form-data

{
  image: File (png, jpg, webp)
}
```

### Response
```typescript
{
  success: boolean,
  game: {
    title: string,           // "Elden Ring"
    confidence: "high" | "medium" | "low"
  },
  location: {
    area: string,            // "Raya Lucaria Academy"
    specifics: string,       // "Red Wolf of Radagon boss arena"
    context: string          // "This is a mandatory boss..."
  },
  walkthroughs: [
    {
      title: string,
      url: string,
      channel: string,
      thumbnail: string
    }
  ],
  stuckHelp: string          // "Try rolling through his combo..."
}
```

---

## Claude Prompt (lib/prompts.ts)

```typescript
export const GAME_ANALYSIS_PROMPT = `You are a gaming expert assistant. Analyze this screenshot and identify:

1. **Game Title**: What game is this? Be specific (e.g., "Elden Ring" not "a Souls game")

2. **Location**:
   - Area/Region name
   - Specific location (boss room, dungeon section, etc.)
   - Any recognizable landmarks

3. **Context**: What's happening in this screenshot?
   - Is this a boss fight? Which boss?
   - Is this a puzzle? What kind?
   - Is this exploration? What might they be looking for?

4. **Stuck Analysis**: Why might someone be stuck here?
   - Common challenges at this point
   - What they might be missing

5. **Search Keywords**: Provide 2-3 YouTube search queries that would find helpful walkthroughs for this exact situation.

Respond in JSON format:
{
  "game": { "title": string, "confidence": "high"|"medium"|"low" },
  "location": { "area": string, "specifics": string },
  "context": string,
  "stuckReason": string,
  "searchQueries": string[]
}

If you cannot identify the game, set confidence to "low" and explain why in the context field.`;
```

---

## YouTube Search (lib/youtube.ts)

```typescript
import { google } from 'googleapis';

const youtube = google.youtube('v3');

export async function searchWalkthroughs(queries: string[]) {
  const results = await Promise.all(
    queries.map(query =>
      youtube.search.list({
        key: process.env.YOUTUBE_API_KEY,
        part: ['snippet'],
        q: query + ' walkthrough',
        type: ['video'],
        maxResults: 3,
        relevanceLanguage: 'en'
      })
    )
  );

  // Dedupe and return top 5
  return dedupeResults(results.flat());
}
```

---

## UI Design Direction

**Aesthetic**: Dark, gaming-focused, slightly cyberpunk
- Dark background (#0a0a0a) with accent colors
- Neon-ish highlights (cyan #00f0ff or gaming green #00ff88)
- Monospace font for game data (JetBrains Mono)
- Clean sans-serif for UI (Outfit or similar)

**Key Components**:

### Upload Zone
- Large drag-drop area
- Paste from clipboard support (Ctrl+V)
- Preview before submit
- File size limit: 10MB

### Results Display
- Game title with confidence badge
- Location breakdown (expandable)
- Walkthrough cards with thumbnails
- "Quick tip" section with the stuckHelp text

### States
- Empty: Upload prompt
- Loading: Pulsing animation + "Analyzing..."
- Success: Full results
- Error: Friendly error + retry button
- Low confidence: "Not sure about this one" + manual search option

---

## Environment Variables

```env
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
YOUTUBE_API_KEY=AIza...
```

---

## MVP Constraints

1. **No auth** - Keep it simple, public tool
2. **No storage** - Don't save images or results
3. **Rate limiting** - Basic IP-based limiting (10 req/min)
4. **Single image** - No batch upload for MVP

---

## Future Features (Post-MVP)

- Browser extension for instant screenshot analysis
- Game-specific wikis integration (fandom, IGN)
- Community-curated walkthrough database
- Discord bot version
- Mobile app with camera capture

---

## Getting Started

```bash
# Clone and install
git clone <repo>
cd gamestuck
npm install

# Add API keys to .env.local

# Run dev server
npm run dev
```

---

## Prompts for Claude Code

Use these to build incrementally:

1. "Set up the Next.js project with Tailwind and the file structure above"

2. "Create the image upload component with drag-drop and paste support"

3. "Build the /api/analyze endpoint that sends images to Claude"

4. "Add YouTube search integration"

5. "Create the results display component"

6. "Add loading states and error handling"

7. "Style everything with the dark gaming aesthetic"

---

## Success Metrics

- Correctly identifies game: >90% for supported titles
- Correctly identifies area: >70%
- Provides useful walkthrough: >80%
- Time to result: <5 seconds

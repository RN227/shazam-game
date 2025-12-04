# GameStuck Helper

An AI-powered game assistance tool that helps gamers identify games from screenshots and find relevant walkthroughs using Claude AI and YouTube.

## Features

- 🎮 **AI Game Identification**: Upload a screenshot and let Claude AI identify the game
- 🔍 **Context Analysis**: Get detailed context about what's happening in your game
- 💡 **Smart Suggestions**: Receive specific tips and advice based on the screenshot
- 🎥 **Walkthrough Discovery**: Automatically find relevant YouTube walkthroughs
- 🎨 **Beautiful UI**: Modern, responsive interface built with Next.js 14 and Tailwind CSS
- 🌙 **Dark Mode**: Full dark mode support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (Vision)
- **Video Search**: YouTube Data API v3

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An Anthropic API key ([Get one here](https://console.anthropic.com/))
- A YouTube Data API v3 key (optional, [Get one here](https://console.cloud.google.com/))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shazam-game
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add your API keys:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/shazam-game
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
│   └── placeholder.svg       # Upload placeholder
└── .env.local                # API keys (not in git)
```

## Usage

1. **Upload a Screenshot**: Drag and drop or click to upload a game screenshot
2. **AI Analysis**: Claude AI analyzes the image to identify the game and context
3. **Get Results**: View the identified game, context, and personalized suggestions
4. **Watch Walkthrough**: Click the recommended YouTube video to get help

## API Endpoints

### POST /api/analyze

Analyzes a game screenshot and returns game information and walkthrough suggestions.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with 'image' file

**Response:**
```json
{
  "success": true,
  "gameName": "Game Title",
  "context": "Description of what's happening",
  "suggestions": ["Tip 1", "Tip 2", "Tip 3"],
  "walkthrough": {
    "title": "Video Title",
    "videoId": "youtube-video-id",
    "thumbnail": "thumbnail-url",
    "channelTitle": "Channel Name"
  }
}
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic Claude API key |
| `YOUTUBE_API_KEY` | No | YouTube Data API v3 key (for walkthrough search) |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Anthropic Claude](https://www.anthropic.com/)
- Video search via [YouTube Data API](https://developers.google.com/youtube/v3)

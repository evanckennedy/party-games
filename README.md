# Party Games

Party Games is a mobile-first collection of social games designed for groups sharing one phone.

## Games

- **Imposter**: Secret-word social deduction with Classic and Undercover modes.
- **Scenes**: A stream of funny improv prompts for the group.
- **Trivia**: Curated questions with category and difficulty choices.
- **Tier List**: Preset or custom topics that groups rank together.

Everything runs locally in the browser. There are no accounts, online multiplayer features, databases, or scoring systems.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
npm run lint
npm run build
npm run start
```

## Project Structure

```text
app/
	components/       Shared UI and game screens
	data/             Game content and question banks
	globals.css       App-wide styles
	layout.tsx        Metadata, fonts, and providers
	page.tsx          Game state and screen transitions
```

Trivia questions are organized by category and difficulty under `app/data/trivia/questions/` so the question bank can grow without creating one large file.

# Party Games

Party Games is a mobile-first collection of social games designed for groups sharing one phone.

## Games

- **Imposter**: Secret-word social deduction with Classic and Undercover modes.
- **Quick Wit**: Fast improv prompts for one-liners, ridiculous excuses, and quick performances.
- **Trivia**: Curated questions with category and difficulty choices.
- **Tier List**: Preset or custom topics that groups rank together.
- **Would You Rather?**: Funny, social dilemmas for the group to debate.
- **Most Likely To**: Group prompts to point at someone and debate the pick.
- **Yes, And**: Improv scene starters for building a story together.
- **Guess the Riddle**: Curated riddles with difficulty choices and answer reveals.
- **Spelling Bee**: Curated words with definitions, examples, and etymologies for group spelling.
- **Who Am I?**: Guess a famous person or fictional character by asking yes-or-no questions.
- **Charades**: Act out a curated prompt while the group guesses, with a 60-second timer.
- **Hot Take**: Discuss curated provocative statements and share your honest opinions.
- **Logic**: Solve curated reasoning challenges together, with optional hints and explanations.
- **Blind Rankings**: Rank five unseen-in-advance items one at a time across curated categories.
- **Let's Talk**: Curated conversation questions across six categories, with random selection and no repeats until a pool is exhausted.
- **Debate**: Randomly assigned opposing positions, timed rounds, and audience-decided results.

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

## App Icons

Place the shortcut icons in these locations with these dimensions:

```text
public/
	apple-touch-icon.png       180x180
	icons/
		party-games-192.png      192x192
		party-games-512.png      512x512
```

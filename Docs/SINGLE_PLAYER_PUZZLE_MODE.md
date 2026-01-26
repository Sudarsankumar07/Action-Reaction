# Letter Box Mode: Word Connect Puzzle

## Overview

Letter Box Mode is a single-player puzzle where players form words from a fixed set of letters (the "letter box"). The goal is to find as many valid words as possible and uncover a set of target/hidden words. The mode supports timed and relaxed play, daily challenges, and progressive difficulty.

## Core Gameplay

- Round starts with a configurable set of letters (commonly 7). Optionally one central letter is required in every word.
- Player forms words by tapping or dragging letters. Words must meet minimum length (e.g., >=3) and be valid per the app dictionary.
- Immediate validation: correct (accepted), duplicate (ignored/neutral), invalid (rejected).
- Each round includes target/hidden words; revealing all targets completes the round.
- Two variants:
  - Timed: score within a set time limit.
  - Relaxed: unlimited time to find all possible words.

## UI / Screens

- Round View
  - Letter box (center + surrounding tiles) at top.
  - Current entry area showing selected letters with backspace/delete.
  - Submit button and swipe-to-submit gesture.
  - Progress area displaying target word placeholders (revealed on discovery).
  - Score, timer (if timed), hint button, and shuffle button.
- Round Complete
  - Summary: score, targets found, missed words list, best word highlighted.
  - Actions: Replay, Next Round, Share.
- Mode Menu
  - Mode toggles (Timed / Relaxed / Daily), difficulty selector, leaderboards, achievements.

## Scoring

- Base points: scale by word length (example: 3-letter = 1, 4-letter = 2, 5-letter = 3, etc.).
- Bonuses:
  - Pangram (uses all letters): large bonus.
  - Streaks: consecutive valid submissions without hint increases multiplier.
- Persist high scores using existing `highScoreService`.

## Progression & Levels

- Daily Puzzle: single seeded puzzle per day with global leaderboard.
- Campaign: sequential rounds with growing difficulty (rarer letters, longer targets).
- Unlockables: tile skins, themes, and hint credit rewards.

## Hints & Monetization

- Hints available: reveal a letter, reveal a target word, or show length of a target.
- Hints cost in-game hint credits or are obtained via rewarded ads.
- Limit hints per round; allow purchases for more hints.

## Dictionary & Validation

- Use existing `src/data/words.js` as primary dictionary; extend for Tamil and English.
- Add a `puzzleService.validateWord(word)` method to centralize validation and uniqueness checks.
- Support localization via `locales/en.json` and `locales/ta.json`.

## Analytics & Events

- Track events: `puzzle_round_start`, `word_submitted`, `hint_used`, `round_complete`, `daily_puzzle_played`.
- Metrics to capture: words found, time taken, hints used, pangrams found.

## Accessibility

- Large-tile mode and high-contrast theme (use `theme/index.js`).
- Screen-reader labels for letter tiles and controls.
- Keyboard support for desktop/testing.

## Integration Points

- Screens: Add `src/screens/PuzzleScreen.js` modeled on `GameScreen.js`.
- Components: Add `src/components/LetterBox.js` and `src/components/WordEntry.js`.
- Services: Add `src/services/puzzleService.js` for generation, validation, and analytics hooks.
- State: Reuse `contexts/LanguageContext.js` and existing persistence patterns for local caching.

## Data Requirements

- Generator must ensure a minimum number of target words exist for each puzzle.
- Optionally precompute daily puzzles and cache them in local storage.
- Extend `src/data/words.js` with difficulty tags and language entries where necessary.

## Assets

- Tile sprites/animations for correct/invalid submissions and pangram confetti.
- Reuse existing assets where possible and add new tile skins as unlockables.

## Testing

- Unit tests for `puzzleService` (generator guarantees and validation).
- Integration tests for `PuzzleScreen` interactions similar to `GameScreen.test.js`.
- Add tests under `__tests__/unit/services/` and integration tests under `__tests__/integration/`.

## Implementation Tasks (Estimated)

1. Implement `src/services/puzzleService.js` (generator + validator + analytics hooks).
2. Create `src/components/LetterBox.js` and `src/components/WordEntry.js`.
3. Create `src/screens/PuzzleScreen.js` and wire navigation to the main menu.
4. Integrate scoring with `highScoreService` and persistence.
5. Add localization strings to `locales/en.json` and `locales/ta.json`.
6. Add unit and integration tests.

---

This design document provides the core gameplay rules, UI layout, scoring, integration notes, and implementation tasks required to add Letter Box Mode to the app.

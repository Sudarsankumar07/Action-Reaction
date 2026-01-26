# Charades — Online Multiplayer Mode

## Overview

Add an online multiplayer variant to the existing offline Charades game. Players can create or join rooms; in each round one player is the Guesser (does not see the word) while the others (Actors) see the word and act. The Guesser identifies who acted out the word; if correct, that Guesser (or the Actor, depending on scoring rules) earns points.

## Goals

- Enable real-time play for 2–8 players per room.
- Keep latency low and state consistent across clients.
- Reuse app patterns for localization, analytics, and persistence.

## Core Gameplay & Roles

- Roles per round:
  - Guesser: views camera/stream or actor motions but not the target word; chooses who performed the act.
  - Actors: see the target word and perform gestures/mimes to convey it.
  - Host (optional): room creator with ability to start rounds and manage settings.
- Flow:
 1. Room created / joined.
 2. When round starts, server selects a Guesser (rotate or choose host-selected).
 3. Server picks a target word and assigns it to Actors (not to Guesser).
 4. Actors get a short prep timer; Actors perform (audio optional, mute allowed).
 5. Guesser makes a selection (which player is acting out the word) within a time window.
 6. Reveal: server indicates correct/incorrect, award points, reveal word.
 7. Rotate Guesser and repeat.

## Room & Match Types

- Quick Room: public/random matchmaking.
- Private Room: create with code / invite link.
- Tournament: sequence of rounds with cumulative scoring.

## UI / Screens

- Lobby Screen
  - Create / Join room, room code, player list, ready toggles, host controls.
- In-Room Gameplay
  - Main view: grid of player tiles with video/avatar, active timer, current Guesser highlighted.
  - Actor view: prominent word, prep timer, mute / ready buttons.
  - Guesser view: no word, selection UI (tap player tile or pick from list), hint button (consumes hint credit).
  - Round result overlay: shows correct actor, revealed word, points earned.
- Post-match Summary
  - Scores table, top performer highlight, rematch button, share results.

## Networking & Backend Options

Two main approaches depending on constraints:

- Firebase Realtime Database / Firestore + Cloud Functions (easier to integrate with existing Firebase in repo):
  - Use a small real-time sync model with presence, room docs, and per-room event queue.
  - Use security rules and Cloud Functions to authoritatively pick words, validate round transitions, and prevent tampering.

- WebSocket / Socket.IO server (Node):
  - Lower-latency, event-driven server for real-time messages: `join`, `start_round`, `assign_word`, `submit_guess`, `reveal`.
  - Server keeps authoritative game state in memory + optional backing store.

Recommendation: If the project already uses Firebase (check `google-services.json`), prefer Firebase Realtime Database or Firestore + Cloud Functions for faster delivery and simpler auth.

## Data Model (example)

- Room:
  - id, code, hostId, players[], state (lobby|playing|ended), settings
- Player:
  - id, name, avatarUrl, ready, score, connectionState
- Round:
  - roundId, guesserId, targetWordId, actors[], startAt, endAt, result

Keep server as source-of-truth for sensitive fields: `targetWordId`, `round.result` and scoring.

## Security & Anti-cheat

- Do not send `targetWord` to the Guesser client.
- Authoritative server or Cloud Function chooses target words and validates round completion.
- Use rate-limiting and simple heuristics to detect repeated suspicious behavior (e.g., repeated immediate correct guesses).

## Scoring & Rules

- Example scoring:
  - Correct Guesser: +5 points.
  - Correct Actor (if actor correctly selected by Guesser): +3 points.
  - Bonus for fast guess (time-based multiplier).
- Tie-breakers: highest cumulative score; final round tie-breaker mechanism (sudden-death).

## Hints & Moderation

- Hints: show first letter or word category (consumes hint credits or ads).
- Moderation: host can kick players; automatic removal on long disconnection; optional report player flow.

## Localization

- Localize UI strings with `locales/en.json` and `locales/ta.json`.
- Ensure word pools support both languages or mode-select language per room.

## Analytics & Events

- Track: `room_created`, `room_joined`, `round_started`, `guess_submitted`, `round_revealed`, `room_ended`.
- Metrics: average round time, guess accuracy rates, player retention in rooms.

## Integration Points (codebase)

- Screens: Add `src/screens/CharadesOnlineLobby.js`, `src/screens/CharadesOnlineRoom.js`.
- Components: `src/components/RoomPlayerTile.js`, `src/components/RoomControls.js`.
- Services: `src/services/charadesOnlineService.js` (wraps realtime API), `src/services/matchmakingService.js`.
- Data: reuse `src/data/words.js` or extend with difficulty / category tags.

## Assets

- Avatars and live video UI (use placeholders if camera not used).
- Sounds for round start/end, correct/incorrect.

## Testing

- Unit tests for `charadesOnlineService` (room lifecycle, message handling).
- Integration tests for room flows (create, join, start round, submit guess, reveal).

## Implementation Tasks (recommended order)

1. Decide backend approach: Firebase (Firestore + Cloud Functions) or Socket server.
2. Add service wrapper `src/services/charadesOnlineService.js` with mocked local fallback for offline testing.
3. Implement lobby and room screens: `CharadesOnlineLobby.js`, `CharadesOnlineRoom.js`.
4. Implement room UI components and wire player presence and ready toggles.
5. Implement server logic: pick words, assign roles, handle guesses, score, and broadcast state.
6. Add localization strings and analytics hooks.
7. Add unit and integration tests.

---

This file describes the online Charades mode: room lifecycle, roles, networking choices, security, and implementation tasks to integrate it into the app.

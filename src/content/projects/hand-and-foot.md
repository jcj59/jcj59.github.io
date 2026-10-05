---
title: Hand and Foot
summary: The family card game, played online with friends by room code — and a testbed for a self-play reinforcement-learning agent.
tagline: An online multiplayer card game and a platform for training a self-play reinforcement-learning agent
context: Personal project — TypeScript, React, Cloudflare Workers and Durable Objects
image: ../../assets/images/hand-and-foot.jpg
imageAlt: A game of Hand and Foot in progress, with players' melds, the stock and discard piles, and a hand of cards
links:
  - label: Play it
    href: https://hand-and-foot.hf-worker.workers.dev
  - label: View GitHub
    href: https://github.com/jcj59/hand-and-foot
order: 1
---

Hand and Foot is a rummy-style family card game. This version runs in the browser: open a table,
share the code, and play a four-round match with friends or computer players.

The rules engine is a pure, fully tested TypeScript package, and the server is authoritative — each
player only ever sees their own filtered view of the table. The whole game runs as a single
Cloudflare Worker, with each table a Durable Object that persists its action log, so a deploy never
ends a game in progress.

The longer-term goal is a reinforcement-learning agent, trained by self-play against the same
engine, that can beat human players.

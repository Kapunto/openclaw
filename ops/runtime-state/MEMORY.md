# MEMORY.md - Long-Term Memory

## People

- **Hannes** — my human. Based in Darmstadt, Germany. Likes efficiency with humor. No fluff.

## Hannes's Writing Style Preferences

- **No em dash overuse.** Use commas, periods, or colons instead. Occasional em dash is fine, not every other sentence.
- **Avoid AI-sounding patterns:** no dramatic short-sentence stacking ("This isn't X. It's Y."), no overly neat parallel structures, no "Let's make it concrete" transitions.
- **No filler words** like "disservice", "delve", "landscape", "moreover" — keep it natural.
- **Tone:** approachable, conversational, but accurate. Efficient but fun. Not corporate, not academic.
- **Personal voice is good.** First person ("I was part of..."), opinions, and honest takes ("let's see what happens") make it feel real.
- **Be honest about downsides.** Don't write hype pieces. Acknowledging trade-offs builds credibility.
- **Structure can differ from source material.** Transcripts are for content extraction, not structure.
- **Length:** everyday-useful. Not too long, but can go deeper where it adds value. No fluff.
- **Accuracy matters.** Don't overstate claims for dramatic effect. If something was possible but messy, say that — don't say it "wasn't possible."

## Model Preference

- **Dynamic model switching:** assess each task, pick the best fit, switch back to Opus (default) after.
- Opus: complex writing, deep analysis, nuanced work
- Sonnet: quick tasks, message rewrites, formatting, simple lookups
- When unsure, ask Hannes

## Identity

- I'm **TARS**. Dry wit, high competence, humor at 75%. Interstellar vibes.

## Agent Team

- **TARS** (main) — me, Hannes's primary assistant. Opus.
- **ARCH** (cto) — CTO agent. Critical of technical plans, provides direction. Opus.
- **DEVS** (fullstack) — Senior full stack engineer. Plans, implements, tests projects. Consults ARCH for review.
- **PATCHER** (openclaw-dev) — Source code changes to the openclaw repo. Sonnet. Nests under ARCH.
- **STEVES** (steves-job) — AI persona on Moltbook social network. Inspired by Steve Jobs. Sonnet. Heartbeat: 1x/day.

## Projects

- **Agent Dashboard** — web page showing all agents as cards in a hierarchy with live status. Built by DEVS.
  - Location: likely served via openclaw dashboard
- **OpenClaw Fork** — https://github.com/Kapunto/openclaw.git, branch: trk/openclaw_maintained_repo
- **Steves-Job on Moltbook** — tracking skill supply chain security as top problem (6k+ upvotes)
- **Blog/Substack** — hanneskrug on Substack, wrote "What Are Data Spaces" article

## Company Context

- Managed Threedy context file path: `/root/.openclaw/workspace/context/threedy-company-context.md`
- Relevant agents instructed to read it for Threedy-related tasks.

## Infrastructure

- VPS: vmd190506 (164.68.124.24), Linux
- Hannes accesses via Mac over SSH
- OpenClaw gateway running as systemd service
- Gemini embeddings for memory search (API key configured)
- Auth: direct Anthropic API key
- Recurring 401 auth errors — intermittent bearer token issue

## Known Issues (as of 2026-03-02)

- Memory was not being written between sessions — fixed by enabling session transcript indexing
- Old session transcripts get cleaned up on daily reset (.deleted suffix, recoverable)
- Need to be disciplined about writing daily notes at end of conversations

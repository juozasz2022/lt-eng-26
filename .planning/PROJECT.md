# LtEng_26

## What This Is

LtEng_26 is a premium English language learning platform specifically designed for highly educated Lithuanians (ages 50-60+). It features an immersive "Synthetic Classroom" with a cinematic theater mode, providing a sophisticated and focus-driven environment for advanced professional language acquisition.

## Core Value

High-retention language acquisition through interactive "Cinematic Theater" simulations that respect the intelligence and specific accessibility needs of experienced professionals.

## Requirements

### Validated

- ✓ **MATRIX-01**: 3x3 conjugation matrix for tense and sentence structure practice. — *Phase 0 (Existing)*
- ✓ **VOCAB-01**: Visual vocabulary system with image-word associations. — *Phase 0 (Existing)*
- ✓ **AUTH-01**: Basic user identification and progress tracking. — *Phase 0 (Existing)*
- ✓ **EVENT-01**: Granular behavioral event tracking (View/Click events). — *Phase 0 (Existing)*

### Active

- [ ] **SETTINGS-01**: Mobile/Desktop profile presets for one-click UI optimization.
- [ ] **SETTINGS-02**: Advanced text scaling (Very Small to Very Big) and TTS speed control (Very Very Low to Normal).
- [ ] **THEATER-01**: "Synthetic Classroom" with Cinematic Focus (dynamic camera zooms and active speaker highlighting).
- [ ] **THEATER-02**: Student-centric character interactions within the simulation.
- [ ] **CONTENT-01**: Integrated Content Studio for creating stories, dynamic graphics, and video-based lessons.
- [ ] **TEST-01**: Dual-mode testing system for system behavior verification and student knowledge assessment.
- [ ] **DOCS-01**: Offline "Study Guide" generation system (PDF/DOCX) for material portability.

### Out of Scope

- **Real-time Multiplayer**: Focus is on the simulated social classroom (Petrov/Jonas/Alisa model) rather than live peer-to-peer chat.
- **Low-End Mobile Support**: Initial focus is on the "Premium Experience" for PCs, Laptops, and high-performance Tablets.

## Context

Target users are university-educated professionals (magisters, doctors of science) who value precision, typographic clarity, and deep content. The platform evolves from the "D. Petrovo" methodology, emphasizing the "Construction" phase of language learning.

## Constraints

- **Accessibility**: UI targets age 50-60+ physiological needs (legibility, touch targets) without looking simplified or "senior."
- **Tech Stack**: React 18 (Vite), Node.js (Express), Prisma (SQLite), Framer Motion.
- **Speech**: Heavily reliant on Web Speech API for interactive feedback.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Cinematic Focus | Enhances immersive "student" feeling vs literal stage view | — Pending |
| Profile Presets | Simplifies accessibility for non-power users while allowing slider overrides | — Pending |
| Server-Side PDF | High typographic control for professional study guides | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-14 after initialization*

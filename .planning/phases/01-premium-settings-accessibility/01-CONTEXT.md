# Phase 01: Premium Settings & Accessibility - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning
**Core Vision:** Sophisticated, adaptive UI for 50-60+ professionals that balances "one-click" simplicity with deep user control.

<domain>
## Phase Boundary

This phase delivers the foundational accessibility and customization engine for the platform. It focuses on the Settings system, device-specific layout adaptations, and global audio interaction behaviors.

</domain>

<decisions>
## Implementation Decisions

### Preset Profiles (SET-01)
- **Profile Presets**: Provide three core presets: *Desktop Standard*, *High Visibility*, and *Focus Mode*.
- **Slider Interaction**: Presets set logical defaults for all sliders. Manual adjustments are permitted.
- **Visual Feedback**: If a slider is moved from its preset value, a "Modified" badge appears next to it.
- **High Visibility Mode**: Automatically triggers a "High Contrast" color palette (stark blacks and whites) in addition to scaling text and icons.

### Typography & Density (SET-02)
- **Scaling Levels**: Support 6 levels: Very Small, Small, Medium, Standard, Big, Very Big.
- **Legibility Density**: When "Very Big" is active, the UI must hide non-critical secondary info (e.g., grammatical tense labels, background decorative patterns, metadata) to maximize text clarity.

### Audio Interaction (SET-03, SET-04)
- **Global Scope**: "Pause on Hover" and "Repeat Segment" are implemented as global behaviors across all interactive modules (Matrix, Vocabulary, Theater).
- **Speed Toggles**: 4 levels of TTS speed (Very Very Low, Very Low, Low, Normal).

### State Persistence ("Cinema Pause")
- **Automatic Bookmarking**: The system must save the exact current state (Lesson ID, character index, dialogue progress) automatically whenever the user pauses or closes the application.
- **Resume Splash**: Upon returning, the user is presented with a premium "Resume Lesson" splash screen (cinematic style) allowing them to pick up exactly where they left off.

### Device Layouts (SET-05)
- **PC (Large Screens)**: Implement a "Comfortable Scan" layout with generous margins to prevent text from spanning too wide, maintaining optimal line lengths for reading.
- **Laptop (Standard Screens)**: prioritize "Scroll-Free" interaction. The 3x3 matrix and core lesson controls must be visible simultaneously without vertical scrolling.

</decisions>

<canonical_refs>
## Canonical References

### Phase Definition
- [.planning/ROADMAP.md](file:///d:/2026/bandau_di/ntbklm_antigravity/mokausi_kalbas_26/LtEng_26/.planning/ROADMAP.md) — Phase 1 Goals.
- [.planning/REQUIREMENTS.md](file:///d:/2026/bandau_di/ntbklm_antigravity/mokausi_kalbas_26/LtEng_26/.planning/REQUIREMENTS.md) — SET-01 to SET-05 Acceptance Criteria.

### Technical Patterns
- [.planning/codebase/CONVENTIONS.md](file:///d:/2026/bandau_di/ntbklm_antigravity/mokausi_kalbas_26/LtEng_26/.planning/codebase/CONVENTIONS.md) — SettingsContext and LocalStorage patterns.

</canonical_refs>

<specifics>
## Specific Ideas
- **Modified Badge**: Small, elegant dot or label next to sliders that depart from the selected preset.
- **Splash Screen**: Use Framer Motion for a "fade-in" cinematic resume screen with the lesson title and an "Action" icon.

</specifics>

<deferred>
## Deferred Ideas
- **Mobile/Phone Layout**: Explicitly out of scope for Phase 1; focus remains on PC and Laptops.
</deferred>

---
*Phase: 01-premium-settings-accessibility*
*Context gathered: 2026-04-14*

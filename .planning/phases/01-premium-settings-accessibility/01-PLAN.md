# Plan: Phase 01 - Premium Settings & Accessibility

Implement the sophisticated settings system, cinematic pause functionality, and responsive accessibility layers for LtEng_26.

## Requirements Covered
- **SET-01**: Profile Presets & Overrides
- **SET-02**: Typography Scaling & Hiding logic
- **SET-03/04**: 4-level TTS Speed, Global Pause on Hover, Repeat Segment
- **SET-05**: PC Large (Scan) vs Laptop (Scroll-Free) layouts
- **NEW**: Cinema Pause (Auto-bookmarking & Resume Splash)

## Proposed Changes

### Wave 1: Core State & Profile Logic
- Expand `SettingsContext.jsx` to support presets and new global behaviors.

#### [MODIFY] [SettingsContext.jsx](file:///d:/2026/bandau_di/ntbklm_antigravity/mokausi_kalbas_26/LtEng_26/lt-eng-app/src/contexts/SettingsContext.jsx)
- Add state variables: `profile` (string), `highContrast` (boolean), `pauseOnHover` (boolean), `repeatSegment` (boolean), `lastSession` (JSON).
- Implement `applyProfile(profileName)` function that sets defaults based on `PROFILES` constant.
- Implement logic to detect if a setting has been modified from the current profile's default.

### Wave 2: Settings UI Overhaul
- Update `SettingsModal.jsx` to accommodate the new preset system and visual feedback.

#### [MODIFY] [SettingsModal.jsx](file:///d:/2026/bandau_di/ntbklm_antigravity/mokausi_kalbas_26/LtEng_26/lt-eng-app/src/components/SettingsModal.jsx)
- Add "Nustatymų Profiliai" section at the top (Standard, High Visibility, Focus).
- Implement "Modified" badges (small orange dots or labels) for sliders that deviate from the preset.
- Expand TTS Speed icons to 4 levels (Very Very Low to Normal).
- Add toggles for "Sustoti užvedus" (Pause on Hover) and "Pakartoti segmentą" (Repeat Segment).

### Wave 3: Accessibility & Responsive Layers
- Implement CSS logic for High Contrast and "Comfortable Scan" layouts.

#### [MODIFY] [index.css](file:///d:/2026/bandau_di/ntbklm_antigravity/mokausi_kalbas_26/LtEng_26/lt-eng-app/src/index.css)
- Define `.high-contrast` utility classes that override standard colors with stark #000 and #FFF.
- Implement `pc_large` layout constraints (e.g., `max-width: 1400px; margin: 0 auto;`) for "Comfortable Scan."

#### [MODIFY] [App.jsx](file:///d:/2026/bandau_di/ntbklm_antigravity/mokausi_kalbas_26/LtEng_26/lt-eng-app/src/App.jsx)
- Apply `high-contrast` class to `document.documentElement` when state is active.
- Implement element-hiding logic for "Very Big" text mode (injecting a `data-hide-secondary` attribute).

### Wave 4: Cinema Pause & Session Persistence
- Implement the "Stop & Restart" requirement with a cinematic resume experience.

#### [NEW] [useLessonSession.js](file:///d:/2026/bandau_di/ntbklm_antigravity/mokausi_kalbas_26/LtEng_26/lt-eng-app/src/hooks/useLessonSession.js)
- Hook that listens for lesson transitions and auto-saves the current index to the DB/LocalStorage.

#### [MODIFY] [LessonView.jsx](file:///d:/2026/bandau_di/ntbklm_antigravity/mokausi_kalbas_26/LtEng_26/lt-eng-app/src/components/LessonView.jsx)
- Integrate session bookmarking.
- Add the "Resume Lesson" movie-style splash screen that triggers when a previous session is detected.

## Verification Plan

### Automated Tests
- `npm test`: Verify `SettingsContext` applies profiles correctly and identifies "Modified" state.

### Manual Verification
1. Open Settings -> Select "High Visibility" -> Check if contrast shifts and text scales.
2. Override a slider -> Verify "Modified" badge appears.
3. Start a lesson -> Pause/Close -> Re-open -> Verify "Resume Lesson" splash appears.
4. Scale to "Very Big" -> Verify secondary labels (like tense names) disappear.
5. Check layout on a 15"+ screen (Comfortable Scan) vs a Laptop (Scroll-Free Matrix).

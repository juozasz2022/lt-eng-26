# Coding Conventions

## Naming Conventions
- **React Components:** PascalCase (e.g., `MatrixSimulator.jsx`, `LessonView.jsx`).
- **Files/Directories:** kebab-case or PascalCase for components, camelCase for utilities.
- **Variables/Functions:** camelCase (e.g., `handleSelectLesson`, `setView`).
- **Contexts:** PascalCase + Context suffix (`AuthContext.jsx`, `SettingsContext.jsx`).

## Component Structure & Logic
- **Functional Style:** All React components use functional style with hooks (`useState`, `useEffect`).
- **Hooks Management:**
  - `useEffect` is widely used for synchronizing settings with the server.
  - Custom contexts provide a unified interface for Auth and Settings logic.
- **Props:** Use descriptive prop names and Destructuring.
- **Conditional Rendering:** Extensively used for view management in `App.jsx` and for feature toggles.

## UI & Styling
- **Utility-First CSS:** The project strictly follows Tailwind CSS patterns.
- **Complex Layouts:** Grid and Flexbox are used for 3x3 matrices (`grid-cols-3`) and dashboard layouts.
- **Consistent Constraints:** Tailwind spacing and color tokens are used to maintain a cohesive visual language (e.g., `eng-blue`, `eng-red` custom colors).
- **Transitions:** `framer-motion` is the standard for entry/exit animations and modal states.

## State Persistence
- **Two-Tier Storage:**
  1. **LocalStorage:** For immediate persistence across browser reloads.
  2. **Relational Database:** For centralized settings storage and cross-device synchronization.
- **Event-Driven:** Behavioral data is logged via `trackEvent` triggered at major UI transition points.

## Backend Patterns
- **Middleware:** Express middleware is used for request parsing, CORS, and role-based access control (`requireRole`).
- **Asynchronous Logic:** All database and API operations use `async / await` for clarity and error management.

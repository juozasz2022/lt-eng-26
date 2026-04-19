# Directory Structure

## Root Level
- `.agent/`: GSD workflow skills, agents, and local configuration.
- `.planning/`: Project management and technical documentation (GSD).
- `lt-eng-app/`: Frontend React application.
- `lt-eng-server/`: Backend Node.js server.
- `lt-eng-docs/`: Feature-specific documentation files.
- `pokalbiai/`: **[Focus]** Archive of project discussions, history, and resources.
- `Petrov_eng_nedziaga/`: **[Ignored]** External resources.

## Frontend (`lt-eng-app/`)
- `src/components/`: Reusable UI components.
  - `MatrixSimulator.jsx`: Core learning simulation.
  - `SyntheticClassroom.jsx`: Dynamic learning environment.
  - `VocabularyView.jsx`: Dictionary and word list.
  - `Dashboard.jsx`: Main navigation hub.
- `src/contexts/`: Global state management (`AuthContext`, `SettingsContext`).
- `src/data/`: Static content and lesson definitions (`lessonsContent.js`).
- `src/utils/`: Helper functions and API client.

## Backend (`lt-eng-server/`)
- `prisma/`: Database schema and migration tracking.
- `uploads/`: Media storage directory.
- `server.js`: Application entry point and route definitions.
- `seed.js`: Database initialization script.
- `dev.db`: SQLite database file.

## Project Documentation (`pokalbiai/` & `lt-eng-docs/`)
- `pokalbiai/`: contains chronological history of the project evolution and design decisions.
- `lt-eng-docs/`: Detailed guides for specific modules (Accessibility, Vocabulary, Dashboard).

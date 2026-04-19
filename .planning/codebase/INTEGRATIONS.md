# External Integrations

## Database (Prisma & SQLite)
- **SQLite:** Local relational database file (`dev.db`).
- **ORM:** Prisma is used to manage schema migrations and data access.
- **Models:**
    - `User`: Standard user data and roles (`ADMIN`, `EDITOR`, `USER`).
    - `Event`: Tracks fine-grained user actions (VIEW, CLICK, etc.).
    - `ProjectSettings`: Key-value JSON blob for user preferences.
    - `GlobalVocabulary`: Source words and translations for the learning modules.
    - `UserVocabulary`: Tracks learning status for individual words.

## Internal API Endpoints
The frontend communicates with the Express backend via a custom `apiClient`. Key endpoints include:
- `POST /api/auth/login`: Handles user session initialization.
- `POST /api/events`: Logs behavioral data.
- `GET /api/material` & `POST /api/material`: Manages lesson materials (Editor role required for POST).
- `GET /api/vocabulary` & `POST /api/vocabulary`: Manages the global word database.
- `POST /api/settings` & `GET /api/settings`: Synchronizes user accessibility and device preferences.

## File Storage & Media
- **Local Uploads:** Media files are handled by `multer` and stored in `lt-eng-server/uploads/`.
- **References:** The database stores `imageUrl` strings pointing to the local assets or external Pixabay sources.

## Web APIs
- **Speech Recognition:** Leverages the browser's Web Speech API, with standard Lithuania/English language support.
- **LocalStorage:** Used for persistent device-specific settings (e.g., `lt_eng_speech_rate`, `hintMode`) before synchronization with the server.

# Architecture

## System Overview
The `LtEng_26` platform is built on a modern Client-Server architecture, separating concerns between a highly interactive frontend and a lightweight, data-persistent backend.

## Layered Architecture

### 1. Presentation Layer (React Frontend)
- **Framework:** React 18 (Vite).
- **Navigation:** State-based view switching (`App.jsx`) and React Router for more complex routing.
- **State Management:**
  - **AuthContext:** Manages user authentication, session state, and event tracking.
  - **SettingsContext:** Synchronizes local UI settings with the backend.
- **UI Architecture:** Component-based, utilizing Framer Motion for premium transitions and Tailwind CSS for responsive design.

### 2. Service Layer (API Client)
- **Location:** `lt-eng-app/src/utils/apiClient.js`
- **Role:** Bridges the frontend and backend using fetch-based asynchronous calls.

### 3. Logic Layer (Express Backend)
- **Framework:** Express.js.
- **Role:** Handles HTTP requests, manages file uploads via Multer, and coordinates database operations.
- **Key Files:** `lt-eng-server/server.js` (Route definitions and middleware).

### 4. Data Layer (Prisma & SQLite)
- **ORM:** Prisma.
- **Database:** SQLite (local file-based storage).
- **Persistence:** High-level models for users, settings, vocabulary, and events.

## Data Flow
1. **User Action:** User interacts with a component (e.g., `MatrixSimulator.jsx`).
2. **Event Tracking:** `AuthContext` triggers an event log via the backend.
3. **State Update:** `SettingsContext` updates local state and pushes changes to the server.
4. **Persistence:** Backend receives the request and updates the SQLite database through Prisma.
5. **UI Feedback:** Result is returned to the frontend and reflected in the UI (e.g., a "Saved" notification).

## Media Handling
- **Uploads:** Handled via the `/api/upload` endpoint using Multer.
- **Storage:** Saved to `lt-eng-server/uploads/` and referenced by URL in the database.

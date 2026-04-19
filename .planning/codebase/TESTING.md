# Testing & Quality Assurance

## Automated Testing (Current State)
- **Unit/Integration Tracking:** No formal automated testing libraries (like Vitest or Jest) are currently active in the core source tree.
- **Dependency Status:** While the environment supports modern testing frameworks, the project currently relies on manual verification.

## Manual Verification Flow
- **Interactive Modules:** For features like `MatrixSimulator` and `SyntheticClassroom`, testing involves a manual walkthrough of the learning phases (Listening, Repetition, Construction).
- **Role-Based Access:** The backend implementation of `requireRole('EDITOR')` is verified by attempting to access protected routes (`POST /api/material`) with different user profiles.
- **Responsive Design:** Manual visual regression testing is performed across different device viewports (Desktop, Tablet, Mobile) as specified in the UI requirements.

## Observability & Behavioral Tracking
- **Event Logging:** The primary source of "live" verification is the Event tracking system.
  - **Endpoint:** `POST /api/events`
  - **Schema:** Tracks `userId`, `type` (e.g., VIEW, CLICK), and `payload`.
  - **Usage:** Provides a historical trail of user interactions, used to verify feature discovery and usage patterns.
- **Server Logs:** The Node.js server prints status messages to the console for API calls and database connections.

## Database Verification
- **Prisma Studio:** Used to manually inspect and verify data integrity in the `dev.db` SQLite database.
- **Seeding:** The `seed.js` script allows for resetting the database to a known clean state for repeatable manual tests.

## Recommendations
- **Regression Tests:** Introduce smoke tests for the core lesson navigation flow.
- **API Guardrails:** Add unit tests for the `requireRole` middleware to ensure security policies are strictly enforced.

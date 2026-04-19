# Technical Concerns & Debt

## Architecture & Scalability
- **View Management Bloat:** The current `if/else` state-based view switcher in `App.jsx` handles major navigation (DASHBOARD, LESSON, MATRIX, VOCABULARY). As more specialized modules are added, this entry point will become increasingly difficult to maintain. **Recommendation:** Transition to dynamic routing with `react-router-dom`.
- **Content-Code Coupling:** Teaching materials and lesson sequences are partially hardcoded in `lessonsContent.js`. This creates a dependency on developers for content updates. **Recommendation:** Fully migrate instructional content to the database or an external CMS.

## Reliability & Security
- **Automated Testing Gap:** The absolute lack of automated tests (unit, integration, or E2E) makes the project highly susceptible to silent regressions as the code complexity increases.
- **Role-Based Access Control (RBAC):** While basic role checks exist on the backend (`requireRole`), the frontend does not yet strictly enforce these UI states, leading to potential unauthorized access to editor functions if API routes are hit directly.
- **Privacy (PII):** The database stores user emails and roles in plaintext. Consideration for encryption and robust data access policies is needed as the user base expands.

## Database & Persistence
- **SQLite Single Point of Failure:** While excellent for current development, SQLite's file-based locking mechanism may become a bottleneck for concurrent EDITOR and LEARNER activity. **Recommendation:** Plan for PostgreSQL migration if scaling beyond a pilot user group.
- **Sync Logic:** The dual persistence strategy (LocalStorage + Database) needs robust conflict resolution logic for offline scenarios.

## Technical Debt & Maintenance
- **Internationalization (i18n):** Many UI labels and instructional phrases are hardcoded in Lithuanian. For the platform to scale to other language pairs, a formal i18n framework should be implemented.
- **Error Boundaries:** The lack of graceful error recovery in the React UI means a single component failure could crash the entire view.
- **Media Optimization:** Direct loading of images without explicit optimization or lazy-loading strategies could impact performance on slower connections.

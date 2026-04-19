# Technology Stack

## Core Technologies
- **Frontend Framework:** React (v18.3.1)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, PostCSS
- **Runtime:** Node.js (Backend)
- **Database ORM:** Prisma
- **Database:** SQLite (`dev.db` in `lt-eng-server`)

## Primary Dependencies

### Frontend (`lt-eng-app`)
- `framer-motion`: For premium UI animations and transitions.
- `lucide-react`: Icon set.
- `react-router-dom`: SPA routing management.
- `speech-recognition-polyfill`: Ensures voice recognition stability across browsers.
- `clsx` & `tailwind-merge`: Utility for dynamic class management.

### Backend (`lt-eng-server`)
- `express`: Web server framework.
- `prisma`: Database modeling and type-safe queries.
- `multer`: Middleware for handling multipart/form-data (file uploads).
- `cors`: Cross-Origin Resource Sharing.
- `dotenv`: Environment variable management.

## Environment & Configuration
- **Backend Entry Point:** `lt-eng-server/server.js`
- **Frontend Entry Point:** `lt-eng-app/src/main.jsx`
- **Prisma Schema:** `lt-eng-server/prisma/schema.prisma`
- **Uploads Directory:** `lt-eng-server/uploads/`
- **Environment Variables:** Configured via `.env` files in both app and server directories.

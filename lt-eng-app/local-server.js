import app from './api/index.js';

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`\n🚀 Local API server running at http://localhost:${PORT}`);
  console.log(`👉 Proxied from Vite (port 5173) via /api\n`);
  console.log(`Database connected via Prisma (PostgreSQL)`);
});

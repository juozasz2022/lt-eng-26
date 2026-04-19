import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.env.PORT || 5001;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ----------------------------------
// AUTH / RBAC ENDPOINTS
// ----------------------------------

// Simple Email Login
app.post('/api/auth/login', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    let user = await prisma.user.findUnique({
      where: { email },
      include: { settings: true }
    });

    if (!user) {
      // Create default learner if not exists
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
          roles: JSON.stringify(['LEARNER'])
        },
        include: { settings: true }
      });
    }

    // Parse roles back to array
    const roles = JSON.parse(user.roles);
    res.json({ ...user, roles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Auth failed' });
  }
});

// Middleware to check specific role
const requireRole = (role) => async (req, res, next) => {
  const userEmail = req.headers['x-user-email'];
  if (!userEmail) return res.status(401).json({ error: 'Unauthorized' });

  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) return res.status(401).json({ error: 'User not found' });

  const roles = JSON.parse(user.roles);
  if (!roles.includes(role) && !roles.includes('CREATOR')) {
    return res.status(403).json({ error: `Forbidden: Needs ${role} role` });
  }
  next();
};

// ----------------------------------
// TRACKING / EVENTS ENDPOINT
// ----------------------------------

app.post('/api/events', async (req, res) => {
  const { userId, eventType, elementId, path, duration, metadata } = req.body;
  try {
    const event = await prisma.userEvent.create({
      data: {
        userId,
        eventType,
        elementId,
        path,
        duration,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to track event' });
  }
});

// ----------------------------------
// CONTENT & VERSIONING
// ----------------------------------

// Get all materials
app.get('/api/material', async (req, res) => {
  try {
    const materials = await prisma.educationalMaterial.findMany();
    res.json(materials.map(m => ({
      ...m,
      contentPayload: JSON.parse(m.contentPayload)
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

// Update material with automatic versioning
app.post('/api/material', requireRole('EDITOR'), async (req, res) => {
  const { id, title, type, contentPayload, editorId } = req.body;
  
  try {
    // 1. Get current version for backup
    const current = await prisma.educationalMaterial.findUnique({ where: { id } });
    if (current) {
      await prisma.contentVersion.create({
        data: {
          entityType: 'Lesson',
          entityId: id,
          payload: current.contentPayload,
          creatorId: editorId
        }
      });
    }

    // 2. Update current
    const updated = await prisma.educationalMaterial.upsert({
      where: { id },
      update: { title, contentPayload: JSON.stringify(contentPayload) },
      create: { id, title, type, contentPayload: JSON.stringify(contentPayload) }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// Vocabulary with versioning
app.get('/api/vocabulary', async (req, res) => {
  try {
    const vocab = await prisma.globalVocabulary.findMany({
      include: { images: true }
    });
    res.json(vocab);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.post('/api/vocabulary', requireRole('EDITOR'), async (req, res) => {
  const { id, word, translation, phonetic, type, lesson, editorId } = req.body;
  try {
    const current = id ? await prisma.globalVocabulary.findUnique({ where: { id } }) : null;
    if (current) {
      await prisma.contentVersion.create({
        data: {
          entityType: 'Vocabulary',
          entityId: id,
          payload: JSON.stringify(current),
          creatorId: editorId
        }
      });
    }

    const result = await prisma.globalVocabulary.upsert({
      where: { id: id || uuidv4() },
      update: { word, translation, phonetic, type, lesson },
      create: { word, translation, phonetic, type, lesson }
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

// ----------------------------------
// LEGACY / USER STATS (Prisma migration)
// ----------------------------------

app.post('/api/history', async (req, res) => {
  const { userId, actionType, entityId, successRate, notes } = req.body;
  try {
    const history = await prisma.history.create({
      data: { userId, actionType, entityId, successRate, notes }
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.post('/api/settings', async (req, res) => {
  const { userId, key, value } = req.body;
  try {
    const setting = await prisma.setting.upsert({
      where: { id: `${userId || 'global'}_${key}` }, // Unique ID approach
      update: { value: JSON.stringify(value) },
      create: { 
        id: `${userId || 'global'}_${key}`,
        userId, 
        key, 
        value: JSON.stringify(value) 
      }
    });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.get('/api/settings', async (req, res) => {
  const { userId } = req.query;
  try {
    const settings = await prisma.setting.findMany({
      where: { OR: [{ userId }, { userId: null }] }
    });
    res.json(settings.map(s => ({ ...s, value: JSON.parse(s.value) })));
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.listen(port, () => {
  console.log(`LtEng_26 Prisma Server running on port: ${port}`);
});

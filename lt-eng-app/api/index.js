import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ----------------------------------
// AUTH / RBAC ENDPOINTS
// ----------------------------------

app.post('/api/auth/login', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    let user = await prisma.user.findUnique({
      where: { email },
      include: { settings: true }
    });

    // Role configuration based on specific emails
    const getRolesForEmail = (email) => {
      // Core Team
      if (email === 'juozasz2022@gmail.com') return ['LEARNER', 'CREATOR', 'EDITOR'];
      if (email === 'juozasz2024@gmail.com') return ['LEARNER', 'EDITOR'];
      if (email === 'juozasz2025@gmail.com') return ['LEARNER'];

      // Testing Team - Editors
      const editors = [
        'ri.balkeviciene@gmail.com',
        '12milie.nata@gmail.com',
        'niunejan@gmail.com',
        'ovidijusg@gmail.com',
        'gabrieliux211@gmail.com'
      ];
      
      if (editors.includes(email)) return ['LEARNER', 'EDITOR'];
      
      return ['LEARNER']; // Default student role
    };

    const assignedRoles = getRolesForEmail(email);

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
          roles: JSON.stringify(assignedRoles)
        },
        include: { settings: true }
      });
    } else {
      // Synchronize roles with the new mapping on every login
      await prisma.user.update({
        where: { id: user.id },
        data: { roles: JSON.stringify(assignedRoles) }
      });
      user.roles = JSON.stringify(assignedRoles);
    }

    const roles = JSON.parse(user.roles);
    res.json({ ...user, roles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Auth failed' });
  }
});

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
  
  const parsedUserId = parseInt(userId);
  if (!userId || isNaN(parsedUserId)) {
    return res.status(200).json({ status: 'skipped', reason: 'invalid_user_id' });
  }

  try {
    // Verify user exists to avoid P2003 foreign key constraint error (e.g. from stale localStorage)
    const userExists = await prisma.user.findUnique({
      where: { id: parsedUserId }
    });

    if (!userExists) {
      return res.status(200).json({ status: 'skipped', reason: 'user_not_found' });
    }

    const event = await prisma.userEvent.create({
      data: {
        userId: parsedUserId,
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

app.post('/api/material', requireRole('EDITOR'), async (req, res) => {
  const { id, title, type, contentPayload, editorId } = req.body;
  try {
    const stringId = String(id);
    const current = await prisma.educationalMaterial.findUnique({ where: { id: stringId } });
    if (current) {
      await prisma.contentVersion.create({
        data: {
          entityType: 'Lesson',
          entityId: stringId,
          payload: current.contentPayload,
          creatorId: editorId
        }
      });
    }
    const updated = await prisma.educationalMaterial.upsert({
      where: { id: stringId },
      update: { title, contentPayload: JSON.stringify(contentPayload) },
      create: { id: stringId, title, type: type || 'lesson', contentPayload: JSON.stringify(contentPayload) }
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});

app.delete('/api/material/:id', requireRole('EDITOR'), async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.educationalMaterial.delete({ where: { id: String(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.post('/api/material/seed', requireRole('CREATOR'), async (req, res) => {
  const { lessons } = req.body;
  try {
    const results = [];
    for (const lesson of lessons) {
      const { id, theory, image } = lesson;
      const result = await prisma.educationalMaterial.upsert({
        where: { id: String(id) },
        update: { 
          title: theory.title, 
          contentPayload: JSON.stringify({ ...theory, image }) 
        },
        create: { 
          id: String(id), 
          type: 'lesson', 
          title: theory.title, 
          contentPayload: JSON.stringify({ ...theory, image }) 
        }
      });
      results.push(result);
    }
    res.json({ count: results.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Seed failed' });
  }
});

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
      where: { id: `${userId || 'global'}_${key}` },
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

// ----------------------------------
// ANALYTICS & QA ENDPOINTS
// ----------------------------------

app.get('/api/analytics/lesson-stats', requireRole('CREATOR'), async (req, res) => {
  try {
    const stats = await prisma.history.groupBy({
      by: ['entityId'],
      _avg: { successRate: true },
      _count: { id: true },
      where: { actionType: 'PRONUNCIATION_TEST' }
    });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Stats failed' });
  }
});

app.get('/api/analytics/recent-activity', requireRole('CREATOR'), async (req, res) => {
  try {
    const activity = await prisma.history.findMany({
      take: 50,
      orderBy: { timestamp: 'desc' },
      include: { user: { select: { name: true, email: true } } }
    });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: 'Activity failed' });
  }
});

app.get('/api/analytics/user-progress', requireRole('CREATOR'), async (req, res) => {
  try {
    const progress = await prisma.history.findMany({
      where: { actionType: 'LESSON_COMPLETION' },
      orderBy: { timestamp: 'desc' },
      include: { user: { select: { name: true } } }
    });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Progress failed' });
  }
});

export default app;

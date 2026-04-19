import { DatabaseSync } from 'node:sqlite';
import { lessonsContent } from '../lt-eng-app/src/data/lessonsContent.js';
import { vocabularyData } from '../lt-eng-app/src/data/vocabularyData.js';

const db = new DatabaseSync('./dev.db');

console.log("Starting DB seeding for LtEng_26...");

// Ensure EducationalMaterials exists
db.exec(`
  CREATE TABLE IF NOT EXISTS EducationalMaterials (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    contentPayload TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS GlobalVocabulary (
    id TEXT PRIMARY KEY,
    word TEXT NOT NULL,
    translation TEXT NOT NULL,
    type TEXT NOT NULL,
    lesson INTEGER NOT NULL
  );
`);

// LESSONS
const insertLesson = db.prepare('INSERT OR REPLACE INTO EducationalMaterials (id, type, title, contentPayload) VALUES (?, ?, ?, ?)');

for (const lesson of lessonsContent) {
  const type = 'Petrov';
  const id = `lesson_${lesson.id}`;
  insertLesson.run(id, type, lesson.theory.title, JSON.stringify(lesson));
  console.log(`Inserted/Updated lesson: ${id}`);
}

// VOCABULARY
const insertVocab = db.prepare('INSERT OR REPLACE INTO GlobalVocabulary (id, word, translation, type, lesson) VALUES (?, ?, ?, ?, ?)');

for (let i = 0; i < vocabularyData.length; i++) {
  const word = vocabularyData[i];
  const id = `word_${word.lesson}_${i}`;
  insertVocab.run(id, word.word, word.translation, word.type, word.lesson);
}
console.log(`Inserted ${vocabularyData.length} words.`);

console.log("Seeding completed successfully!");
db.close();

import { PrismaClient } from '@prisma/client'
import { lessonsContent } from '../../lt-eng-app/src/data/lessonsContent.js'
import { vocabularyData } from '../../lt-eng-app/src/data/vocabularyData.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding initial RBAC user...')
  
  const mainUser = await prisma.user.upsert({
    where: { email: 'juozasz2022@gmail.com' },
    update: {
      roles: JSON.stringify(['CREATOR', 'ADMIN', 'TESTER', 'EDITOR', 'LEARNER']),
      name: 'Juozas (Lead Creator)'
    },
    create: {
      email: 'juozasz2022@gmail.com',
      name: 'Juozas (Lead Creator)',
      roles: JSON.stringify(['CREATOR', 'ADMIN', 'TESTER', 'EDITOR', 'LEARNER'])
    }
  })
  
  console.log(`Main user created/updated: ${mainUser.email}`)

  console.log('Seeding lessons...')
  for (const lesson of lessonsContent) {
    await prisma.educationalMaterial.upsert({
      where: { id: `lesson_${lesson.id}` },
      update: {
        title: lesson.theory.title,
        contentPayload: JSON.stringify(lesson)
      },
      create: {
        id: `lesson_${lesson.id}`,
        type: 'Petrov',
        title: lesson.theory.title,
        contentPayload: JSON.stringify(lesson)
      }
    })
  }

  console.log('Seeding vocabulary...')
  for (const [index, word] of vocabularyData.entries()) {
    // Basic unique ID for words
    const wordId = `word_${word.lesson}_${index}`
    await prisma.globalVocabulary.upsert({
      where: { id: wordId },
      update: {
        word: word.word,
        translation: word.translation,
        phonetic: word.phonetic,
        type: word.type,
        lesson: word.lesson
      },
      create: {
        id: wordId,
        word: word.word,
        translation: word.translation,
        phonetic: word.phonetic,
        type: word.type,
        lesson: word.lesson
      }
    })
  }

  console.log('Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

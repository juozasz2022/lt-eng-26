/**
 * Dynamic Simulation Generator for Synthetic Classroom (Phase 2)
 * Creates a high-immersion sequence with randomized events, personalized greetings,
 * and character-specific behaviors.
 */

export const generateSequence = (lesson, characters) => {
  const steps = [];
  const students = Object.keys(characters).filter(id => id !== 'teacher');
  
  // Extract phrases
  const sourcePhrases = [
    ...(lesson.theory.dialogue || []).map(d => ({ text: d.text, translation: d.translation })),
    ...(lesson.theory.tprsStory || []).map(s => ({ text: s.text, translation: s.translation })),
    ...(lesson.theory.pasakojimai || []).map(p => {
      // Handle the case where pasakojimai might be an array of steps
      if (Array.isArray(p)) {
        return p.map(step => ({ text: step.text, translation: step.translation }));
      }
      return { text: p.text, translation: p.translation };
    }).flat()
  ].filter(p => !p.text.startsWith('- Hello'));

  if (sourcePhrases.length === 0) {
    sourcePhrases.push({ text: "I work here every day.", translation: "Aš čia dirbu kiekvieną dieną." });
  }

  const rounds = 14; // Slightly more rounds for Phase 2
  
  // 1. Personalized Intro
  steps.push({
    speaker: 'teacher',
    text: `Good morning everyone! Especially you, Juozas. Ready for ${lesson.theory.title}?`,
    translation: `Labas rytas visiems! Ypatingai tave, Juozai. Ar pasiruošę pajausti ${lesson.theory.title}?`
  });

  steps.push({
    speaker: 'alisa',
    text: "Always ready, Petrov. Juozas, I hope you studied hard!",
    translation: "Visada pasiruošusi. Juozai, tikiuosi, kad daug mokeisi!"
  });

  for (let i = 0; i < rounds; i++) {
    // Inject a Random Event every few rounds
    if (i > 0 && i % 4 === 0) {
      const eventType = Math.random() < 0.5 ? 'jonas_confusion' : 'petrov_insight';
      
      if (eventType === 'jonas_confusion') {
        steps.push({
          speaker: 'jonas',
          text: "Wait, Petrov... could you repeat the last part? It was too fast.",
          translation: "Palaukit, Petrovai... gal galėtumėt pakartoti? Buvo per greita."
        });
        steps.push({
          speaker: 'teacher',
          text: "Of course, Jonas. Patience is the key. Listen closely again.",
          translation: "Žinoma, Jonai. Kantrybė yra raktas. Pasiklausyk atidžiai dar kartą."
        });
      } else {
        steps.push({
          speaker: 'teacher',
          text: "Notice how the grammar flows naturally when you don't overthink it.",
          translation: "Atkreipkite dėmesį, kaip gramatika teka natūraliai, kai apie ją per daug nemąstote."
        });
      }
    }

    const phrase = sourcePhrases[Math.floor(Math.random() * sourcePhrases.length)];
    const studentId = students[Math.floor(Math.random() * students.length)];
    const student = characters[studentId];
    
    // Teacher Prompt
    steps.push({
      speaker: 'teacher',
      text: `${student.name}, how do we say: "${phrase.translation}"?`,
      translation: `${student.name}, kaip pasakysime: "${phrase.translation}"?`
    });

    if (studentId === 'juozas') {
      steps.push({
        speaker: 'juozas',
        text: phrase.text,
        translation: phrase.translation,
        isInteractiveVoice: true,
        targetText: phrase.text
      });
      
      // Success reaction
      steps.push({
        speaker: 'alisa',
        text: "Spot on, Juozas! Your accent is very clear.",
        translation: "Tiksliai, Juozai! Tavo akcentas labai aiškus."
      });
    } else {
      const hasError = studentId === 'jonas' && Math.random() < 0.6;
      let text = phrase.text;
      
      if (hasError) {
        text = text.replace(/th/gi, 'z').replace(/w/gi, 'v').replace(/r/gi, 'rr');
      }

      steps.push({
        speaker: studentId,
        text: text,
        translation: phrase.translation,
        error: hasError
      });

      if (hasError) {
        steps.push({
          speaker: 'teacher',
          text: "Almost, Jonas. Juozas, can you help him? Please repeat.",
          translation: "Beveik, Jonai. Juozai, ar gali jam padėti? Prašau pakartok."
        });
        steps.push({
          speaker: 'juozas',
          text: phrase.text,
          translation: "Padėk Jonui ištardamas teisingai.",
          isInteractiveVoice: true,
          targetText: phrase.text
        });
      }
    }
  }

  // Final Outro
  steps.push({
    speaker: 'teacher',
    text: "Excellent work today. Juozas, keep this momentum. Class dismissed!",
    translation: "Puikus darbas šiandien. Juozai, išlaikyk šį pagreitį. Pamoka baigta!"
  });

  return {
    id: 'theater_' + Date.now(),
    steps: steps
  };
};

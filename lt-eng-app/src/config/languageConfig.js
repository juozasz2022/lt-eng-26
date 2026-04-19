/**
 * Centralized Language & UI configuration for portability.
 * To port to another language (e.g., LT-ITAL), simply update this object.
 */
export const languageConfig = {
  // Locale Settings
  sourceLang: 'lt',
  targetLang: 'en-US',
  targetLangName: 'English',
  
  // Voice Codes (for Speech Synthesis & Recognition)
  voices: {
    male: 'en-US-Standard-B',
    female: 'en-US-Standard-C'
  },
  recognitionLocale: 'en-US',

  // UI Strings - General
  ui: {
    home: 'Pagrindinis',
    vocabulary: 'Žodynas',
    backToDashboard: 'GRĮŽTI Į PRADŽIĄ',
    settings: 'NUSTATYMAI',
    studio: 'STUDIO',
    loading: 'KRAUNAMA...',
    error: 'KLAIDA',
    save: 'IŠSAUGOTI',
    cancel: 'ATŠAUKTI',
    delete: 'TRINTI',
    edit: 'REDAGUOTI',
    sync: 'SINCHRONIZUOTI',
    logout: 'Atsijungti'
  },

  // UI Strings - Lesson View
  lesson: {
    theoryTab: 'Teorija',
    dialogueTab: 'Dialogas',
    storyTab: 'Pasakojimas',
    assessmentTab: 'Testukas',
    checkMic: 'Patikrinti Mikrofoną',
    listening: 'Klausausi...',
    excellent: 'PUIKIAI!',
    keepTrying: 'BANDYK DAR KARTĄ',
    oarsUp: 'PASISTENK!',
    summary: 'Svarbiausi akcentai',
    storyIntro: 'Pasakojimas',
    comprehensionCheck: 'Pasitikrinimas',
    resumeLesson: 'Tęsti Pamoką?',
    progressSaved: 'Sistema išsaugojo jūsų progresą',
    lessonsHeader: 'PAMOKOS'
  },

  // UI Strings - Assessment
  assessment: {
    title: 'Žinių patikrinimas',
    completed: 'Pamoka Baigta!',
    result: 'Tavo rezultatas:',
    correctAnswers: 'Teisingi atsakymai',
    continueToCourse: 'Tęsti į Kursą',
    basedOnStory: 'Pagal istoriją',
    grammarQuestion: 'Kuriuo laiku kalbant apie ateitį visada naudojame „will“?',
    yes: 'Taip',
    no: 'Ne',
    onlyInQuestions: 'Tik klausimuose'
  },

  // UI Strings - Studio
  studioUI: {
    title: 'Content Studio',
    subtitle: 'Valdykite pamokas, mediją ir simuliacijas.',
    newLesson: '+ Nauja Pamoka',
    syncStatic: 'Sinchr. statines pamokas',
    qaAnalytics: 'QA Analitika',
    editContent: 'Redaguoti Turinį'
  },

  // UI Strings - Dashboard
  dashboard: {
    methodTitle: 'Dmitrij Petrov 16 pamokų metodas',
    matrixTitle: '3x3 MATRICA',
    matrixSubtitle: 'Automatizuokite veiksmažodžius per kelias minutes.',
    startTraining: 'PRADĖTI TRENIRUOTĘ'
  },

  // UI Strings - Vocabulary
  vocabulary: {
    title: 'Žodynas',
    startTheater: 'PALEISTI TEATRĄ',
    verifyPronunciation: 'Patikrinti tarimą',
    initializing: 'Inicijuojama įranga...',
    listenToCorrect: 'Išklausykite taisyklingą tarimą...',
    learned: 'IŠMOKTA'
  }
};

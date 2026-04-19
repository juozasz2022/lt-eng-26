import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { languageConfig } from '../config/languageConfig';

const AssessmentModule = ({ lesson, onComplete }) => {
  const { user, trackEvent } = useAuth();
  const [step, setStep] = useState(0);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  // Derive questions from lesson content
  const questions = [
    // 1. Comprehension (from Story)
    ...lesson.theory.tprsStory.slice(0, 2).map(s => ({
      type: 'quiz',
      question: `${languageConfig.assessment.basedOnStory}: ${s.check.question}`,
      choices: s.check.choices,
      answer: s.check.answer,
      context: s.text
    })),
    // 2. Translation/Grammar (derived from dialogue or theory)
    {
      type: 'quiz',
      question: languageConfig.assessment.grammarQuestion,
      choices: [languageConfig.assessment.yes, languageConfig.assessment.no, languageConfig.assessment.onlyInQuestions],
      answer: languageConfig.assessment.yes,
      context: lesson.title
    }
  ];

  const handleAnswer = (choice) => {
    const isCorrect = choice === questions[step].answer;
    const newResults = [...results, { step, isCorrect, choice }];
    setResults(newResults);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      finalize(newResults);
    }
  };

  const finalize = async (finalResults) => {
    setFinished(true);
    const correctCount = finalResults.filter(r => r.isCorrect).length;
    const score = Math.round((correctCount / questions.length) * 100);

    trackEvent('COMPLETE_ASSESSMENT', lesson.id, { score });

    // Save to DB
    try {
      await fetch('http://localhost:5001/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          actionType: 'LESSON_COMPLETION',
          entityId: String(lesson.id),
          successRate: score,
          notes: `Answers: ${finalResults.map(r => r.isCorrect ? '✓' : '✗').join(', ')}`
        })
      });
    } catch (err) {
      console.error('Failed to save assessment', err);
    }
  };

  if (finished) {
    const score = Math.round((results.filter(r => r.isCorrect).length / questions.length) * 100);
    return (
      <div className="p-12 text-center animate-in zoom-in-50 duration-500">
        <div className="w-32 h-32 bg-eng-blue text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-200">
          <span className="text-5xl">{score >= 70 ? '🏆' : '📚'}</span>
        </div>
        <h2 className="text-4xl font-black tracking-tighter mb-2">{languageConfig.assessment.completed}</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">{languageConfig.assessment.result} {score}%</p>
        
        <div className="max-w-xs mx-auto space-y-4">
           <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center px-6">
              <span className="font-bold text-slate-500">{languageConfig.assessment.correctAnswers}</span>
              <span className="font-black text-eng-blue">{results.filter(r => r.isCorrect).length} / {questions.length}</span>
           </div>
           
           <button 
             onClick={onComplete}
             className="w-full py-5 bg-eng-blue text-white font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs"
           >
             {languageConfig.assessment.continueToCourse}
           </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[step];

  return (
    <div className="p-8 md:p-12 animate-in slide-in-from-right-8 duration-500">
      <div className="flex justify-between items-center mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">{languageConfig.assessment.title}: {step + 1} / {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i <= step ? 'bg-eng-blue' : 'bg-slate-100'}`}></div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <p className="text-slate-400 font-bold italic mb-4 opacity-60">"{currentQ.context}"</p>
        <h3 className="text-3xl font-black tracking-tight text-slate-900 mb-12 leading-tight">
          {currentQ.question}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.choices.map((choice, i) => (
            <button 
              key={i}
              onClick={() => handleAnswer(choice)}
              className="p-6 bg-white border-2 border-slate-100 rounded-3xl text-lg font-black text-slate-700 hover:border-eng-blue hover:text-eng-blue hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 text-center"
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentModule;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MODES = [
  { label: 'Roast Me', value: 'roast', emoji: '🔥' },
  { label: 'Motivate Me', value: 'motivate', emoji: '💪' },
  { label: 'Explain Gently', value: 'gentle', emoji: '🫶' },
];

const QUESTIONS = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 2,
    type: 'mcq',
  },
  {
    question: 'The sky is green. True or False?',
    options: ['True', 'False'],
    answer: 1,
    type: 'tf',
  },
  {
    question: 'React is a ___ library.',
    options: ['Database', 'UI', 'Game', 'OS'],
    answer: 1,
    type: 'mcq',
  },
];

const FEEDBACK = {
  roast: [
    "Did you even read the question?",
    "Oof. My circuits are cringing.",
    "I've seen potatoes do better.",
    "You call that an answer?",
    "Try again, quiz warrior!",
  ],
  motivate: [
    "You got this! Next one will be better!",
    "Keep going, you're learning!",
    "Every mistake is a step forward!",
    "Don't give up now!",
    "You're on the right track!",
  ],
  gentle: [
    "Almost there! Let's try the next one.",
    "Not quite, but you're doing great!",
    "No worries, you'll get the next one!",
    "Keep it up, gentle genius!",
    "Learning is a journey!",
  ],
};

function getRandomFeedback(mode) {
  const arr = FEEDBACK[mode] || FEEDBACK.gentle;
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function QuizPage() {
  const [mode, setMode] = useState('roast');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const question = QUESTIONS[current];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === question.answer;
    if (correct) setScore((s) => s + 1);
    setFeedbackMsg(
      correct
        ? mode === 'roast'
          ? 'Okay, you got lucky.'
          : mode === 'motivate'
          ? 'Nice! You nailed it!'
          : 'Correct! Well done!'
        : getRandomFeedback(mode)
    );
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      setSelected(null);
      if (current + 1 < QUESTIONS.length) {
        setCurrent((c) => c + 1);
      } else {
        setFinished(true);
      }
    }, 1600);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
    setFinished(false);
    setFeedbackMsg('');
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-start py-8 px-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl p-8 rounded-2xl shadow-2xl glass bg-black/70 backdrop-blur-md mt-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Quiz Battle 🧠
          </h2>
          <Link to="/dashboard" className="btn btn-sm btn-outline btn-accent">Dashboard</Link>
        </div>
        {/* Mode Selector */}
        <div className="flex gap-2 mb-6 justify-center">
          {MODES.map((m) => (
            <button
              key={m.value}
              className={`btn btn-sm md:btn-md btn-outline ${mode === m.value ? 'btn-active btn-primary' : ''}`}
              onClick={() => setMode(m.value)}
            >
              <span className="mr-1">{m.emoji}</span> {m.label}
            </button>
          ))}
        </div>
        {/* Progress Bar */}
        <div className="mb-4">
          <progress className="progress progress-primary w-full h-3" value={current + (finished ? 1 : 0)} max={QUESTIONS.length}></progress>
          <div className="text-right text-xs text-gray-400 mt-1">
            {finished ? QUESTIONS.length : current + 1} / {QUESTIONS.length}
          </div>
        </div>
        {/* Quiz Content */}
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="mb-4"
            >
              <div className="card bg-base-100 shadow-lg p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
                  {question.question}
                </h3>
                <div className="flex flex-col gap-3">
                  {question.options.map((opt, idx) => (
                    <button
                      key={opt}
                      className={`btn btn-block btn-outline ${selected === idx ? (idx === question.answer ? 'btn-success' : 'btn-error') : ''}`}
                      onClick={() => handleSelect(idx)}
                      disabled={selected !== null}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 text-center"
                  >
                    <div className="alert alert-info animate-pulse font-semibold">
                      {feedbackMsg}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="finished"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="card bg-base-100 shadow-lg p-6 mb-4">
                <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                <p className="mb-2">Your score: <span className="text-primary font-bold">{score} / {QUESTIONS.length}</span></p>
                <p className="mb-2">{score === QUESTIONS.length ? 'You are a Quiz God! 🏆' : score > 0 ? 'Not bad, not bad...' : 'Better luck next time!'}</p>
                <button className="btn btn-accent mt-2" onClick={handleRestart}>Try Again</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 
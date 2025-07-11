import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const QUOTES = [
  'I’ve seen turtles type faster.',
  'To be or not to be, that is the question.',
  'React is not a framework, change my mind.',
  'The quick brown fox jumps over the lazy dog.',
  'Quiz Potato is my spirit animal.',
  'Speed Typer Supreme in the house!',
];

const FEEDBACK = [
  (wpm, acc) => wpm > 80 ? 'Are you a robot? That was FAST!' : '',
  (wpm, acc) => wpm > 50 ? 'Blazing speed! 🚀' : '',
  (wpm, acc) => wpm < 20 ? 'I’ve seen turtles type faster.' : '',
  (wpm, acc) => acc === 100 ? 'Perfect accuracy! 🏆' : '',
  (wpm, acc) => acc < 80 ? 'Typos galore! Try again?' : '',
  (wpm, acc) => wpm > 0 && acc > 0 ? 'Keep practicing, you’re getting there!' : '',
];

function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

function getFeedback(wpm, acc) {
  return FEEDBACK.map(fn => fn(wpm, acc)).filter(Boolean)[0] || 'Nice try!';
}

export default function TypingTrainerPage() {
  const [quote, setQuote] = useState(getRandomQuote());
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
    }
    if (input === quote) {
      setEndTime(Date.now());
      setFinished(true);
      inputRef.current.blur();
    }
  }, [input, quote, startTime]);

  useEffect(() => {
    if (finished && startTime && endTime) {
      const timeTaken = (endTime - startTime) / 1000 / 60; // in minutes
      const words = quote.split(' ').length;
      setWpm(Math.round(words / timeTaken));
      let correct = 0;
      for (let i = 0; i < quote.length; i++) {
        if (input[i] === quote[i]) correct++;
      }
      setAccuracy(Math.round((correct / quote.length) * 100));
    }
  }, [finished, startTime, endTime, input, quote]);

  const handleRestart = () => {
    setQuote(getRandomQuote());
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setFinished(false);
    setWpm(0);
    setAccuracy(0);
    setTimeout(() => inputRef.current.focus(), 200);
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
            Typing Trainer ⌨️
          </h2>
          <Link to="/dashboard" className="btn btn-sm btn-outline btn-accent">Dashboard</Link>
        </div>
        <div className="mb-6">
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="card-title mb-2 text-center">Type this:</h3>
            <p className="text-lg text-center text-primary font-mono select-none break-words">
              {quote}
            </p>
          </div>
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <input
            ref={inputRef}
            type="text"
            className="input input-bordered w-full bg-base-100 text-base-content text-lg font-mono mb-4"
            placeholder="Start typing..."
            value={input}
            onChange={e => {
              if (!finished) setInput(e.target.value);
            }}
            disabled={finished}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        {/* Progress Bar */}
        <div className="mb-4">
          <progress
            className="progress progress-primary w-full h-3"
            value={Math.min(input.length, quote.length)}
            max={quote.length}
          ></progress>
          <div className="text-right text-xs text-gray-400 mt-1">
            {input.length} / {quote.length} chars
          </div>
        </div>
        {/* Results & Feedback */}
        <AnimatePresence>
          {finished && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="card bg-base-100 shadow-lg p-6 mb-4">
                <h3 className="text-xl font-bold mb-2">Results</h3>
                <p className="mb-1">WPM: <span className="text-primary font-bold">{wpm}</span></p>
                <p className="mb-1">Accuracy: <span className="text-primary font-bold">{accuracy}%</span></p>
                <div className="alert alert-info animate-pulse font-semibold mt-2">
                  {getFeedback(wpm, accuracy)}
                </div>
                <button className="btn btn-accent mt-4" onClick={handleRestart}>Try Again</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 
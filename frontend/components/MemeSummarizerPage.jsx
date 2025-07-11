import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const TABS = [
  { label: 'Normal', value: 'normal', emoji: '📝' },
  { label: 'Meme/Gen-Z', value: 'meme', emoji: '😂' },
  { label: 'Poetic', value: 'poetic', emoji: '🎤' },
];

function getMockSummaries(text) {
  if (!text)
    return {
      normal: '',
      meme: '',
      poetic: '',
    };
  return {
    normal: `Summary: ${text.slice(0, 60)}... (in plain English)`,
    meme: `Gen-Z Meme: "${text.slice(0, 20)}... bruh 💀🔥"`,
    poetic: `Poetic: Roses are red, violets are blue,\n${text.slice(0, 30)}... just for you!`,
  };
}

export default function MemeSummarizerPage() {
  const [input, setInput] = useState('');
  const [tab, setTab] = useState('normal');
  const [summaries, setSummaries] = useState(getMockSummaries(''));
  const [loading, setLoading] = useState(false);

  const handleSummarize = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSummaries(getMockSummaries(input));
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-start py-8 px-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl glass bg-black/70 backdrop-blur-md mt-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            AI Meme Summarizer 😂
          </h2>
          <Link to="/dashboard" className="btn btn-sm btn-outline btn-accent">Dashboard</Link>
        </div>
        <form onSubmit={handleSummarize} className="mb-6">
          <textarea
            className="textarea textarea-bordered w-full min-h-[100px] bg-base-100 text-base-content"
            placeholder="Paste your boring paragraph or textbook content here..."
            value={input}
            onChange={e => setInput(e.target.value)}
            required
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn btn-primary mt-3 w-full"
            disabled={loading || !input.trim()}
          >
            {loading ? 'Summarizing... hold tight!' : 'Summarize'}
          </motion.button>
        </form>
        {/* Tabs */}
        <div className="tabs tabs-boxed flex justify-center mb-4">
          {TABS.map((t) => (
            <a
              key={t.value}
              className={`tab text-lg ${tab === t.value ? 'tab-active text-accent' : ''}`}
              onClick={() => setTab(t.value)}
            >
              <span className="mr-1">{t.emoji}</span> {t.label}
            </a>
          ))}
        </div>
        {/* Summary Cards */}
        <div className="min-h-[120px]">
          <AnimatePresence mode="wait">
            {tab === 'normal' && (
              <motion.div
                key="normal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card bg-base-100 shadow-lg p-6"
              >
                <h3 className="card-title mb-2">Normal Summary</h3>
                <p className="text-base text-gray-200 whitespace-pre-line">{summaries.normal || 'Paste some text and hit Summarize!'}</p>
              </motion.div>
            )}
            {tab === 'meme' && (
              <motion.div
                key="meme"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card bg-base-100 shadow-lg p-6"
              >
                <h3 className="card-title mb-2">Meme/Gen-Z Version</h3>
                <p className="text-base text-gray-200 whitespace-pre-line">{summaries.meme || 'Paste some text and hit Summarize!'}</p>
              </motion.div>
            )}
            {tab === 'poetic' && (
              <motion.div
                key="poetic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card bg-base-100 shadow-lg p-6"
              >
                <h3 className="card-title mb-2">Poetic Version</h3>
                <p className="text-base text-gray-200 whitespace-pre-line">{summaries.poetic || 'Paste some text and hit Summarize!'}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
} 
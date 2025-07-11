import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardNavbar } from './Navbar';

const nicknames = [
  'Quiz Potato',
  'Speed Typer Supreme',
  'The Meme Machine',
  'Miss Type-O',
  'Quiz Sultan',
  'Captain Chaos',
  'The Brainstormer',
  'Dr. Sarcasm',
  'The Quiz Whiz',
  'Typo King/Queen',
];

export default function DashboardPage() {
  // Simulate user info (replace with real user data later)
  const user = { email: 'user@email.com' };
  // Pick a random nickname for fun
  const nickname = useMemo(() => nicknames[Math.floor(Math.random() * nicknames.length)], []);

  const quickLinks = [
    { to: '/quiz', label: 'Quiz Battle', emoji: '🧠', color: 'primary' },
    { to: '/typing-trainer', label: 'Typing Trainer', emoji: '⌨️', color: 'secondary' },
    { to: '/meme-summarizer', label: 'Meme Summary', emoji: '😂', color: 'accent' },
    { to: '/leaderboard', label: 'Leaderboard', emoji: '🏆', color: 'info' },
    { to: '/settings', label: 'Settings', emoji: '⚙️', color: 'neutral' },
  ];

  // Placeholder progress data
  const progress = [
    { label: 'Quiz Battle', value: 70, color: 'primary' },
    { label: 'Typing Trainer', value: 45, color: 'secondary' },
    { label: 'Meme Summary', value: 90, color: 'accent' },
  ];

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-start px-2 pb-8">
      <DashboardNavbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl glass bg-black/70 backdrop-blur-md mt-8 mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Welcome, <span className="text-accent">{user.email.split('@')[0]}</span>!
        </h2>
        <p className="text-center text-lg md:text-xl text-gray-300 mb-4">
          Your AI nickname: <span className="font-bold text-primary animate-pulse">{nickname}</span>
        </p>
        {/* Progress Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-center text-gray-200">Your Progress</h3>
          <div className="flex flex-col gap-4">
            {progress.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-base text-gray-300">{item.label}</span>
                  <span className={`text-${item.color} font-bold`}>{item.value}%</span>
                </div>
                <progress className={`progress progress-${item.color} w-full h-3`} value={item.value} max="100"></progress>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {quickLinks.map(link => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="w-40"
            >
              <Link to={link.to} className={`card card-compact bg-base-100 shadow-lg border-2 border-${link.color} hover:border-accent transition-colors duration-200`}>
                <div className="card-body items-center text-center">
                  <span className="text-4xl mb-2">{link.emoji}</span>
                  <h3 className="card-title text-lg font-semibold">{link.label}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

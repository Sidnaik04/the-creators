import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const USERS = [
  { name: 'Alice', nickname: 'Quiz Sultan', emoji: '👑', quiz: 95, typing: 80 },
  { name: 'Bob', nickname: 'Miss Type-O', emoji: '🤓', quiz: 88, typing: 92 },
  { name: 'Charlie', nickname: 'Speed Typer Supreme', emoji: '⚡', quiz: 70, typing: 99 },
  { name: 'Dana', nickname: 'The Meme Machine', emoji: '😂', quiz: 85, typing: 75 },
  { name: 'Eve', nickname: 'Captain Chaos', emoji: '🦸‍♂️', quiz: 60, typing: 60 },
];

function getBadge(rank) {
  if (rank === 0) return <span className="badge badge-warning text-lg mr-2">🥇</span>;
  if (rank === 1) return <span className="badge badge-neutral text-lg mr-2">🥈</span>;
  if (rank === 2) return <span className="badge badge-accent text-lg mr-2">🥉</span>;
  return <span className="badge badge-outline text-lg mr-2">🏅</span>;
}

export default function LeaderboardPage() {
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
            Leaderboard 🏆
          </h2>
          <Link to="/dashboard" className="btn btn-sm btn-outline btn-accent">Dashboard</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full bg-base-100 rounded-xl shadow-lg">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Quiz Score</th>
                <th>Typing Score</th>
              </tr>
            </thead>
            <tbody>
              {USERS.sort((a, b) => b.quiz + b.typing - (a.quiz + a.typing)).map((user, idx) => (
                <motion.tr
                  key={user.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="hover:bg-base-300 transition-colors"
                >
                  <td className="font-bold text-lg">{getBadge(idx)}{idx + 1}</td>
                  <td>
                    <span className="text-xl mr-2">{user.emoji}</span>
                    <span className="font-semibold text-primary">{user.nickname}</span>
                    <div className="text-xs text-gray-400">{user.name}</div>
                  </td>
                  <td className="text-center font-mono text-lg">{user.quiz}</td>
                  <td className="text-center font-mono text-lg">{user.typing}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
} 
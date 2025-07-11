import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SettingsPage() {
  // Mock user data
  const [name, setName] = useState('Quiz Potato');
  const [email, setEmail] = useState('user@email.com');
  const [mode, setMode] = useState('roast');
  const [deleting, setDeleting] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess('Profile updated! (Not really, this is a mock)');
    setTimeout(() => setSuccess(''), 1500);
  };

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setSuccess('Account deleted! (Not really, this is a mock)');
      setTimeout(() => setSuccess(''), 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-start py-8 px-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg p-8 rounded-2xl shadow-2xl glass bg-black/70 backdrop-blur-md mt-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Settings & Profile ⚙️
          </h2>
          <Link to="/dashboard" className="btn btn-sm btn-outline btn-accent">Dashboard</Link>
        </div>
        <form onSubmit={handleSave} className="flex flex-col gap-4 mb-6">
          <label className="form-control w-full">
            <span className="label-text mb-1">Name</span>
            <input
              type="text"
              className="input input-bordered w-full bg-base-100 text-base-content"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1">Email</span>
            <input
              type="email"
              className="input input-bordered w-full bg-base-100 text-base-content"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <div className="flex flex-col gap-2 mt-2">
            <span className="label-text mb-1">Default Feedback Mode</span>
            <div className="flex gap-3">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="radio"
                  name="mode"
                  className="radio radio-primary"
                  checked={mode === 'roast'}
                  onChange={() => setMode('roast')}
                />
                Roast Me 🔥
              </label>
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="radio"
                  name="mode"
                  className="radio radio-secondary"
                  checked={mode === 'motivate'}
                  onChange={() => setMode('motivate')}
                />
                Motivate Me 💪
              </label>
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="radio"
                  name="mode"
                  className="radio radio-accent"
                  checked={mode === 'gentle'}
                  onChange={() => setMode('gentle')}
                />
                Explain Gently 🫶
              </label>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn btn-primary mt-4"
          >
            Save Changes
          </motion.button>
        </form>
        {/* Danger Zone */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-error mb-2">Danger Zone</h3>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-error w-full"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting... 🗑️' : 'Delete Account'}
          </motion.button>
        </div>
        {success && <div className="alert alert-success mt-6 text-center animate-pulse">{success}</div>}
      </motion.div>
    </div>
  );
} 
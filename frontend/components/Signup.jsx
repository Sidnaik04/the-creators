import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { supabase } from '../supabaseClient'; // Uncomment and configure when Supabase is ready

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password || !confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match!");
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    // Simulate Supabase signup
    setTimeout(() => {
      setLoading(false);
      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1200);
    }, 1500);
    // Uncomment below for real Supabase integration
    // const { error } = await supabase.auth.signUp({ email, password });
    // if (error) setError(error.message);
    // else {
    //   setSuccess('Account created! Redirecting...');
    //   setTimeout(() => navigate('/dashboard'), 1200);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl glass bg-black/70 backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Create your account
        </h2>
        <p className="text-center text-gray-400 mb-6">Join the chaos. It’s free!</p>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="email"
            className="input input-bordered w-full bg-base-100 text-base-content"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input input-bordered w-full bg-base-100 text-base-content"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className={`input input-bordered w-full bg-base-100 text-base-content ${confirm && confirm !== password ? 'input-error' : ''}`}
            placeholder="Confirm Password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          {confirm && confirm !== password && (
            <span className="text-error text-sm">Passwords do not match.</span>
          )}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn btn-primary w-full mt-2"
            disabled={loading}
          >
            {loading ? 'Creating your account... don’t mess it up!' : 'Sign Up'}
          </motion.button>
        </form>
        {error && <div className="alert alert-error mt-4 py-2 text-center">{error}</div>}
        {success && <div className="alert alert-success mt-4 py-2 text-center animate-pulse">{success}</div>}
        <div className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="link link-accent">Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}

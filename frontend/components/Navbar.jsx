import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/quiz', label: 'Quiz Battle' },
  { to: '/typing-trainer', label: 'Typing Trainer' },
  { to: '/meme-summarizer', label: 'Meme Summarizer' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/settings', label: 'Settings' },
];

export function DashboardNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12 }}
      className="navbar sticky top-0 z-40 w-full bg-base-100/80 backdrop-blur-md shadow-md text-base-content"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Brand/Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-primary-content">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Dashboard</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-2">
          {navLinks.map(link => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={link.to}
                className={`btn btn-ghost rounded-btn px-4 text-md transition-colors duration-200 ${location.pathname === link.to ? 'btn-active text-accent' : ''}`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-base-100/95 backdrop-blur-md px-4 pb-4 pt-2 flex flex-col gap-2 shadow-lg"
          >
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`btn btn-ghost w-full text-left text-md ${location.pathname === link.to ? 'btn-active text-accent' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Keep the original Navbar as default export for non-dashboard pages
const mainNavLinks = [
  { to: '/', label: 'Home' },
  ...navLinks.slice(1), // skip dashboard for main nav
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12 }}
      className="navbar fixed z-50 top-0 left-0 w-full bg-black/70 backdrop-blur-md shadow-lg text-base-content"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Brand/Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-primary-content">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">The Creators</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-2">
          {mainNavLinks.map(link => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={link.to}
                className={`btn btn-ghost rounded-btn px-4 text-md transition-colors duration-200 ${location.pathname === link.to ? 'btn-active text-accent' : ''}`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <Link to="/login" className="btn btn-primary ml-2">Sign In</Link>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/90 backdrop-blur-md px-4 pb-4 pt-2 flex flex-col gap-2 shadow-lg"
          >
            {mainNavLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`btn btn-ghost w-full text-left text-md ${location.pathname === link.to ? 'btn-active text-accent' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/login" className="btn btn-primary w-full mt-2" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

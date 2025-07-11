import React from 'react';
import Navbar from './Navbar';
import Scroll from './Scroll';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function GetStarted() {
  return (
    <div className="bg-base-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hero min-h-[70vh] w-full flex flex-col justify-center items-center bg-cover bg-center relative"
          style={{
            backgroundImage:
              'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-0" />
          <div className="hero-content text-center text-neutral-content z-10 flex flex-col items-center">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
              className="mb-4 text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
            >
              Welcome to The Creators
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mb-8 text-lg md:text-2xl font-medium text-gray-200"
            >
              Where learning meets memes, speed, and a little bit of chaos.
            </motion.p>
            <div className="flex gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup" className="btn btn-primary btn-lg shadow-xl">
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              </motion.div>
            </div>
          </div>
        </motion.div>
        {/* Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full"
        >
          <Scroll />
        </motion.div>
      </div>
    </div>
  );
}

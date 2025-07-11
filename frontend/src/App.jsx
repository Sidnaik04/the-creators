import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GetStarted from '../components/GetStarted';
import SignupPage from '../components/Signup';
import LoginPage from '../components/Signin';
import DashboardPage from '../components/Dashboard';
import QuizPage from '../components/QuizPage';
import TypingTrainerPage from '../components/TypingTrainerPage';
import MemeSummarizerPage from '../components/MemeSummarizerPage';
import LeaderboardPage from '../components/LeaderboardPage';
import SettingsPage from '../components/SettingsPage';
import OopsPage from '../components/OopsPage';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <GetStarted />
    },
    {
      path: '/signup',
      element: <SignupPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/dashboard',
      element: <DashboardPage />
    },
    {
      path: '/quiz',
      element: <QuizPage />
    },
    {
      path: '/typing-trainer',
      element: <TypingTrainerPage />
    },
    {
      path: '/meme-summarizer',
      element: <MemeSummarizerPage />
    },
    {
      path: '/leaderboard',
      element: <LeaderboardPage />
    },
    {
      path: '/settings',
      element: <SettingsPage />
    },
    {
      path: '*',
      element: <OopsPage />
    }
  ]);

  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  )
}

export default App

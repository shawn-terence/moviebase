import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Login from './components/Login';
import Home from './pages/Home';
import Header from './components/Header';
import Profile from './pages/Profile';
export const BASE_URL = 'https://api-deploy-wham.onrender.com';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        
        <Route path="/home/:userId" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </Router>
  );

};
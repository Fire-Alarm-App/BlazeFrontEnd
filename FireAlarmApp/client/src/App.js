import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/HomePage/Home';
import Footer from './components/pages/Footer/Footer';
import { AuthPane } from './components/AuthPane'; // Ensure correct import path
import './App.css';

function App() {
  const [isAuthPaneOpen, setIsAuthPaneOpen] = useState(false);

  useEffect(() => {
    const channel = new BroadcastChannel('sw-messages');
    channel.onmessage = (event) => {
      const { action } = event.data;
      if (action === 'showAuthPane') {
        setIsAuthPaneOpen(true);
      }
    };

    return () => channel.close();
  }, []);

  return (
    <Router>
      <Navbar />
      {/* You can conditionally render AuthPane based on isAuthPaneOpen */}
      <AuthPane isOpen={isAuthPaneOpen} setIsOpen={setIsAuthPaneOpen} />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* other routes can be added here */}
      </Routes>
      <Footer /> {/* This places the Footer outside the Routes but still within the Router */}
    </Router>
  );
}

export default App;

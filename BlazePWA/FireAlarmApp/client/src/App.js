import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/HomePage/Home';
import Footer from './components/pages/Footer/Footer';
import { AuthPane } from './components/AuthPane';
import SignUp from './components/pages/SignUp/SignUp';
import './App.css';

// New component to use useLocation hook
function AppContent() {
  const location = useLocation();
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

  // Determine if the navbar and footer should be hidden based on the current path
  const hideNavbarAndFooter = location.pathname === '/sign-up';

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <AuthPane isOpen={isAuthPaneOpen} setIsOpen={setIsAuthPaneOpen} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        {/* other routes can be added here */}
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

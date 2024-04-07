import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/HomePage/Home';
import Footer from './components/pages/Footer/Footer';
import { AuthPane } from './components/AuthPane';
import SignUp from './components/pages/SignUp/SignUp';
import Admin from './components/pages/AdminPage/Admin';
import './App.css';
import { ProtectedRoute } from './components/ProtectedRoute'; 

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

  const hideNavbarAndFooter = location.pathname === '/';

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <AuthPane isOpen={isAuthPaneOpen} setIsOpen={setIsAuthPaneOpen} />
      <Routes>
        <Route path='/' element={<SignUp />} />
        {/* Use the ProtectedRoute for the /home path */}
        <Route path='/home' element={<ProtectedRoute element={<Home />} />} />
        <Route path='/dashboard' element={<ProtectedRoute element={<Admin/>} />} />
        <Route path='/products' element={<ProtectedRoute element={<Home />} />} />
        {/* Add more protected routes in a similar manner */}
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
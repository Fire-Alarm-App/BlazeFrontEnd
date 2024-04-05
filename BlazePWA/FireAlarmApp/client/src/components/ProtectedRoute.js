import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      // Redirect to '/' if there is no token
      return <Navigate to="/" replace />;
    }
  
    // If a token is found, proceed to render the protected component
    return React.cloneElement(element, rest);
  };

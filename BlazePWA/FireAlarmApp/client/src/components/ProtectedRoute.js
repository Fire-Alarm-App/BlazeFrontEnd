import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
        // Redirect to '/' if there is no token
        return <Navigate to="/" replace/>;
    }

    // Validate token to ensure it hasn't expired
    fetch("http://localhost:4000/authenticate", {
        method: "POST",
        headers: {
            "Authorization": token
        }
    }).then((response) => {
        if (!response.ok) {  // Invalid token
            localStorage.removeItem("token");
            return <Navigate to="/" replace />;
        }
    }).catch((err) => {
        // Error occurred
        throw new Error("Authentication failed");
    });
    return React.cloneElement(element, rest);
};

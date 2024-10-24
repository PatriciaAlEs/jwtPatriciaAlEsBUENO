import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem("accessToken");

    // Verifica si hay un token!!!!!!!!!!!!!
    
    if (!token) {
        console.log("No hay token, redirigiendo al inicio de sesión.");
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;

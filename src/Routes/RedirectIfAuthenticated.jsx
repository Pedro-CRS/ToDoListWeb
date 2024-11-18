// RedirectIfAuthenticated.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./Auth.js";

const RedirectIfAuthenticated = ({ children }) => {
	if (isAuthenticated()) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default RedirectIfAuthenticated;
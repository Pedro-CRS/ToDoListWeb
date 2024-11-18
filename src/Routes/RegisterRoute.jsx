import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RegisterRoute = ({ children }) => {
	const location = useLocation();

	if (location.state?.fromLogin !== true) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default RegisterRoute;
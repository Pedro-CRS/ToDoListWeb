import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

		if (token) {
			api.get("/auth/validate-token").then((response) => {
				const { userId, userName } = response.data;
				setUser({ id: userId, name: userName });

				sessionStorage.setItem("user", JSON.stringify({ id: userId, name: userName }));
			}).catch(() => {
				localStorage.removeItem("authToken");
				sessionStorage.removeItem("authToken");
				sessionStorage.removeItem("user");
				setUser(null);
			});
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/general.css";

import ProtectedRoute from "./Routes/ProtectedRoute";
import RegisterRoute from "./Routes/RegisterRoute";
import RedirectIfAuthenticated from "./Routes/RedirectIfAuthenticated";

import Login from "./Pages/Login/SignIn.jsx";
import Register from "./Pages/Login/SignUp.jsx";
import HomePage from "./Pages/Home/Home.jsx";
import { AuthProvider } from "./Pages/AuthContext.jsx";

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/ToDoListWeb" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />

					<Route path="/login" element={<RedirectIfAuthenticated> <Login /> </RedirectIfAuthenticated>} />

					<Route path="/register" element={<RedirectIfAuthenticated> <RegisterRoute> <Register /> </RegisterRoute> </RedirectIfAuthenticated>} />
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
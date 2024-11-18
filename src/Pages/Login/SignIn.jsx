import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUpRedirect = (event) => {
		event.preventDefault();

		navigate("/register", { state: { fromLogin: true } });
	};

	const handleLoginRedirect = (event) => {
		if (email !== "admin" || password !== "admin") {
			alert("Invalid email or password");
		}
		else {
			localStorage.setItem("authToken", true);
			navigate("/");
		}
	}

	return (
		<div className="page">
			<form className="login-box">
				<h1 className="title">Welcome to CheckIt</h1>
				<h2 className="subtitle">Please, insert your informations to access your tasks.</h2>

				<div className="w-100 padding-x">
					<h2 className="field-name">Email</h2>
					<input className="input-field" value={email} id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Insert your email" />
				</div>

				<div className="w-100 padding-x">
					<h2 className="field-name">Password</h2>
					<input className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Insert your password" type="password" />
				</div>

				<div className="w-100 keep-signed">
					<input id="remeberChk" className="checkbox" type="checkbox" />
					<label htmlFor="remeberChk" className="subtitle">Remember me</label>
				</div>

				<button className="sign-in" type="button" onClick={handleLoginRedirect}>Sign In</button>

				<h2 className="subtitle">Don't have an account? <a onClick={handleSignUpRedirect}>Sign Up</a></h2>
			</form>
		</div>
	);
};

export default Login;
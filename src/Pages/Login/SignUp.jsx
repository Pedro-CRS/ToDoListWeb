import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Register = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSignInRedirect = (event) => {
		event.preventDefault();

		navigate("/login");
	};

	const handleRegisterUser = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		else {
			navigate("/login");
			// Call API to register user
			// fetch("/api/register", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({
			// 		name: name,
			// 		email: email,
			// 		password: password
			// 	})
			// }).then((response) => response.json()).then((data) => console.log(data)).catch((error) => console.error(error));
		}
	}

	return (
		<div className="page">
			<form>
				<div className="login-box">
					<h1 className="title">Create Your Account</h1>
					<h2 className="subtitle">Please, fill in the fields below to register and start managing your tasks.</h2>

					<div className="w-100 padding-x">
						<h2 className="field-name">Name</h2>
						<input className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Insert your name" />
					</div>

					<div className="w-100 padding-x">
						<h2 className="field-name">Email</h2>
						<input className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Insert your email" />
					</div>

					<div className="w-100 padding-x">
						<h2 className="field-name">Password</h2>
						<input className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" type="password" />
					</div>

					<div className="w-100 padding-x">
						<h2 className="field-name">Confirm Password</h2>
						<input className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" type="password" />
					</div>

					<button className="sign-in" type="button" onClick={handleRegisterUser}>
						Sign Up
					</button>

					<h2 className="subtitle">
						Already have an account? <a onClick={handleSignInRedirect}>Sign In</a>
					</h2>
				</div>
			</form>
		</div>
	);
};

export default Register;
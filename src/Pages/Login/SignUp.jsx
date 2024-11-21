import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import stl from "../../Styles/Login.module.css";

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
		<div className={stl.page}>
			<form className={stl.loginBox}>
				<h1 className={stl.title}>Crie sua conta</h1>
				<h2 className={stl.subtitle}>Por favor, preencha os campos abaixo para registrar-se e comece gerenciar suas tarefas.</h2>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Nome</h2>
					<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Insira seu nome" />
				</div>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Email</h2>
					<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Insira seu email" />
				</div>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Senha</h2>
					<input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Insira a Senha" type="password" />
				</div>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Confirmar Senha</h2>
					<input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar senha" type="password" />
				</div>

				<button className={stl.signIn} type="button" onClick={handleRegisterUser}>
					Cadastrar-se
				</button>

				<h2 className={stl.subtitle}>Já tenha uma conta? <a onClick={handleSignInRedirect}>Entrar</a></h2>
			</form>
		</div>
	);
};

export default Register;
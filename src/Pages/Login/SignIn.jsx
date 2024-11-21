import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import stl from "../../Styles/Login.module.css";

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
		<div className={stl.page}>
			<form className={stl.loginBox}>
				<h1 className={stl.title}>Bem vindo ao CheckIt</h1>
				<h2 className={stl.subtitle}>Por favor, insira suas credenciais para acessar suas tarefas.</h2>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Email</h2>
					<input value={email} id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Insira seu email" />
				</div>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Senha</h2>
					<input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Insira sua senha" type="password" />
				</div>

				<div className={`w-100 ${stl.keepSigned}`}>
					<input id="remeberChk" className={stl.checkbox} type="checkbox" />
					<label htmlFor="remeberChk" className={stl.subtitle}>Continuar conectado</label>
				</div>

				<button className={stl.signIn} type="button" onClick={handleLoginRedirect}>Entrar</button>

				<h2 className={stl.subtitle}>Ainda não tem cadastro? <a onClick={handleSignUpRedirect}>Registre-se</a></h2>
			</form>
		</div>
	);
};

export default Login;
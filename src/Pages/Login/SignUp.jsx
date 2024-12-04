import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import stl from "../../Styles/Login.module.css";
import { registerUser } from "../../api/api";

const Register = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState({
		name: false, email: false, password: false, confirmPassword: false, errorMsg: false
	});

	const handleSignInRedirect = (event) => {
		event.preventDefault();

		navigate("/login");
	};

	const handleRegisterUser = async (e) => {
		let canvelRequest = false;

		setValidationErrors((prev) => ({ ...prev, name: false, email: false, password: false, confirmPassword: false, errorMsg: false, emailMsg: false }));

		if (name.trim() === "") {
			setValidationErrors((prev) => ({ ...prev, name: true }));
			canvelRequest = true;
		}

		if (email.trim() === "") {
			setValidationErrors((prev) => ({ ...prev, email: true }));
			canvelRequest = true;
		}
		else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/.test(email) == false)) {
			setValidationErrors((prev) => ({ ...prev, email: true, emailMsg: true }));
			canvelRequest = true;
		}

		if (password.trim() === "") {
			setValidationErrors((prev) => ({ ...prev, password: true }));
			canvelRequest = true;
		}

		if (confirmPassword.trim() === "") {
			setValidationErrors((prev) => ({ ...prev, confirmPassword: true }));
			canvelRequest = true;
		}

		if (confirmPassword !== password) {
			setValidationErrors((prev) => ({ ...prev, password: true, confirmPassword: true, errorMsg: true }));
			canvelRequest = true;
		}

		if (!canvelRequest) {
			const userData = { name: name, email: email, password: password };

			try {
				await registerUser(userData);
				navigate("/login");
			} catch (error) {
				alert(error.response.data.error);
			}
		}
	};

	return (
		<div className={stl.page}>
			<form className={stl.loginBox}>
				<h1 className={stl.title}>Crie sua conta</h1>
				<h2 className={stl.subtitle}>Por favor, preencha os campos abaixo para registrar-se e comece gerenciar suas tarefas.</h2>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Nome</h2>
					<input value={name} className={`${validationErrors.name ? "is-invalid" : ""}`} onChange={(e) => setName(e.target.value)} placeholder="Insira seu nome" />
				</div>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Email</h2>
					<input value={email} className={`${validationErrors.email ? "is-invalid" : ""}`} onChange={(e) => setEmail(e.target.value)} placeholder="Insira seu email" autoComplete="off" />
					<span className={`text-error ${validationErrors.emailMsg ? "" : "hidden"}`}>Digite um email válido.</span>
				</div>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Senha</h2>
					<input value={password} className={`${validationErrors.password ? "is-invalid" : ""}`} onChange={(e) => setPassword(e.target.value)} placeholder="Insira a Senha" type="password" />
				</div>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Confirmar Senha</h2>
					<input value={confirmPassword} className={`${validationErrors.confirmPassword ? "is-invalid" : ""}`} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar senha" type="password" />
				</div>

				<p className={`text-error ${validationErrors.errorMsg ? "" : "hidden"}`}>As senhas digitadas não coincidem</p>

				<button className={stl.signIn} type="button" onClick={handleRegisterUser}>
					Cadastrar-se
				</button>

				<h2 className={stl.subtitle}>Já tenha uma conta? <a onClick={handleSignInRedirect}>Entrar</a></h2>
			</form>
		</div>
	);
};

export default Register;
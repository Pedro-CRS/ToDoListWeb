import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import stl from "../../Styles/Login.module.css";
import { loginUser } from "../../api/api";

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [validationErrors, setValidationErrors] = useState({ email: false, password: false });

	const handleSignUpRedirect = (event) => {
		event.preventDefault();

		navigate("/register", { state: { fromLogin: true } });
	};

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const handleLoginRedirect = async (e) => {
		let canvelRequest = false;

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

		if (!canvelRequest) {
			const userData = { email: email, password: password };

			try {
				var dataLogin = await loginUser(userData);

				if (isChecked)
					localStorage.setItem("authToken", dataLogin.data.token);
				else
					sessionStorage.setItem("authToken", dataLogin.data.token);

				navigate("/");
			} catch (error) {
				alert(error.response.data.error);
			}
		}
	}

	return (
		<div className={stl.page}>
			<form className={stl.loginBox}>
				<h1 className={stl.title}>Bem vindo ao CheckIt</h1>
				<h2 className={stl.subtitle}>Por favor, insira suas credenciais para acessar suas tarefas.</h2>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Email</h2>
					<input value={email} id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Insira seu email"
						className={`${validationErrors.email ? "is-invalid" : ""}`} />
					<span className={`text-error ${validationErrors.emailMsg ? "" : "hidden"}`}>Digite um email válido.</span>
				</div>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Senha</h2>
					<input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Insira sua senha" type="password"
						className={`${validationErrors.password ? "is-invalid" : ""}`} />
				</div>

				<div className={`w-100 ${stl.keepSigned}`}>
					<input id="remeberChk" className={stl.checkbox} type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
					<label htmlFor="remeberChk" className={stl.subtitle}>Continuar conectado</label>
				</div>

				<button className={stl.signIn} type="button" onClick={handleLoginRedirect}>Entrar</button>

				<h2 className={stl.subtitle}>Ainda não tem cadastro? <a onClick={handleSignUpRedirect}>Registre-se</a></h2>
			</form>
		</div>
	);
};

export default Login;
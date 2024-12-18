import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stl from "../../Styles/Login.module.css";
import { loginUser } from "../../api/api";
import { AuthContext } from "../AuthContext";

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [validationErrors, setValidationErrors] = useState({ email: false, password: false, errorMsg: false });
	const { setUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

	const handleSignUpRedirect = (event) => {
		event.preventDefault();

		navigate("/register", { state: { fromLogin: true } });
	};

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const handleLoginRedirect = async (e) => {
		setLoading(true);
		let canvelRequest = false;

		setValidationErrors((prev) => ({ ...prev, email: false, password: false, errorMsg: false }));

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
					localStorage.setItem("authToken", dataLogin.data?.token || null);
				else
					sessionStorage.setItem("authToken", dataLogin.data?.token || null);

				sessionStorage.setItem("user", JSON.stringify({ id: dataLogin.data?.userId, name: dataLogin.data?.userName }));

				setUser({ id: dataLogin.data?.userId, name: dataLogin.data?.userName });
				navigate("/");
			} catch (error) {
				setValidationErrors((prev) => ({ ...prev, errorMsg: true }));
			}
			finally {
				setLoading(false);
			}
		}
		else
			setLoading(false);
	}

	useEffect(() => {
		const rootElement = document.getElementById("root");

		if (loading)
			rootElement.classList.add("loader");
		else
			rootElement.classList.remove("loader");

		return () => rootElement.classList.remove("loader");
	}, [loading]);

	return (
		<div className={stl.page}>
			<form className={stl.loginBox} onSubmit={(e) => e.preventDefault()}>
				<h1 className={stl.title}>Bem vindo ao CheckIt</h1>
				<h2 className={stl.subtitle}>Por favor, insira suas credenciais para acessar suas tarefas.</h2>

				<div className={`w-100 ${stl.paddingX}`}>
					<h2 className={stl.fieldName}>Email</h2>
					<input value={email} id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Insira seu email"
						className={`${validationErrors.email ? "is-invalid" : ""}`} autoComplete="off" />
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

				<p className={`text-error ${validationErrors.errorMsg ? "" : "hidden"}`}>O email e/ou senha digitados estão incorretos.</p>

				<button className={stl.signIn} type="button" onClick={handleLoginRedirect}>Entrar</button>

				<h2 className={stl.subtitle}>Ainda não tem cadastro? <a onClick={handleSignUpRedirect}>Registre-se</a></h2>
			</form>
		</div>
	);
};

export default Login;
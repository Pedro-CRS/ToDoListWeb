import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/UserButton.module.css";
import profilePic from "../img/userIcon.png";

const DropdownMenu = (user) => {
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef(null);
	const [userLogged] = useState({ name: user.userName || "", photo: profilePic });

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleLogout = () => {
		localStorage.removeItem("authToken");

		sessionStorage.removeItem("authToken");
		sessionStorage.removeItem("userName");
		navigate("/login");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target))
				setIsOpen(false);
		};

		if (isOpen)
			document.addEventListener("mousedown", handleClickOutside);
		else
			document.removeEventListener("mousedown", handleClickOutside);

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	return (
		<div className={styles.dropUserContainer}>
			<img src={userLogged.photo} alt="user-avatar" className={styles.userPhoto} onClick={toggleDropdown} />

			{isOpen && (
				<div ref={menuRef} className={styles.dropUserMenu}>
					<div className={styles.dropUserItem}>
						<span className={styles.dropUserName}>Olá {userLogged.name}</span>
					</div>
					<button className={styles.dropUserItem} onClick={handleLogout}>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default DropdownMenu;

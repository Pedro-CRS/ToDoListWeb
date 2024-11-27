import React from "react";
import stl from "../../Styles/Home.module.css";

const CompletetToDo = ({ todo, onChange }) => {
	return (
		<input className={stl.roundedCheckbox} type="checkbox" title="Marcar como feito"
			onChange={(e) => onChange(e)} checked={todo.isCompleted} />
	);
};

export default CompletetToDo;
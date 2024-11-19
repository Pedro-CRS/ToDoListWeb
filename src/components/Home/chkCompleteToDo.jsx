import React from "react";
import stl from "../../Styles/Home.module.css";

const CompletetToDo = ({ todo, onChange }) => {
	return (
		<input className={stl.roundedCheckbox} type="checkbox" title="Marcar como feito"
			onChange={() => onChange(todo.id)} checked={todo.isCompleted} />
	);
};

export default CompletetToDo;
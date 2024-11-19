import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import stl from "../../Styles/Home.module.css";


const EditToDo = ({ todo, onClick }) => {
	return (
		<button className={stl.editBtn} title="Editar tarefa" onClick={() => onClick(todo)}>
			<FontAwesomeIcon icon={faPenToSquare} />
		</button>
	);
};

export default EditToDo;
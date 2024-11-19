import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const EditToDo = ({ todo, onClick }) => {
	return (
		<button className="edit-btn" title="Editar tarefa" onClick={() => onClick(todo)}>
			<FontAwesomeIcon icon={faPenToSquare} />
		</button>
	);
};

export default EditToDo;
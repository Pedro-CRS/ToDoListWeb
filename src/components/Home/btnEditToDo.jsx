import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const DeleteToDo = ({ todo, onClick }) => {
	return (
		<button className="edit-btn" title="Editar tarefa" onClick={() => onClick(todo.id)}>
			<FontAwesomeIcon icon={faPenToSquare} />
		</button>
	);
};

export default DeleteToDo;
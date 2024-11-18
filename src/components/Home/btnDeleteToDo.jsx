import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteToDo = ({ todo, onClick }) => {
	return (
		<button className="delete-btn" onClick={() => onClick(todo.id)}>
			<FontAwesomeIcon icon={faTrash} />
		</button>
	);
};

export default DeleteToDo;
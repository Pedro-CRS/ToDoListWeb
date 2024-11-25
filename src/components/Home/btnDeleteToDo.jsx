import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import stl from "../../Styles/Home.module.css";

const DeleteToDo = ({ todoId, onClick }) => {
	return (
		<button className={stl.deleteBtn} title="Excluir tarefa" onClick={() => onClick(todoId)}>
			<FontAwesomeIcon icon={faTrash} />
		</button>
	);
};

export default DeleteToDo;
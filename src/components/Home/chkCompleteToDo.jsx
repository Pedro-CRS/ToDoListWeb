import React from "react";

const CompletetToDo = ({ todo, onChange }) => {
	return (
		<input className="rounded-checkbox" type="checkbox"
			onChange={() => onChange(todo.id)} checked={todo.isCompleted} />
	);
};

export default CompletetToDo;
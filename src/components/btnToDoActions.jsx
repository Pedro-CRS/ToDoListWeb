import React from "react";

const ToDoActions = ({ onComplete, onRemove }) => {
	return (
		<div>
			<button className="complete" onClick={onComplete}>Completar</button>
			<button className="remove" onClick={onRemove}>X</button>
		</div>
	);
};

export default ToDoActions;
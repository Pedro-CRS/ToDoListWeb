import React from "react";
import ToDoActions from "./btnToDoActions";

const ToDo = ({ todo, onComplete, onRemove }) => {
	return (
		<div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
			<div className="content">
				<p>{todo.text}</p>
				<p className="category">({todo.category})</p>
			</div>

			<ToDoActions onComplete={() => onComplete(todo.id)} onRemove={() => onRemove(todo.id)} />
		</div >
	)
}

export default ToDo;
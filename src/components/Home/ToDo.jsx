import React from "react";
import CompleteToDo from "./chkCompleteToDo";
import EditToDo from "./btnEditToDo";
import DeleteToDo from "./btnDeleteToDo";

const ToDo = ({ todo, onComplete, onRemove }) => {
	return (
		<div key={todo.id} className={`task-item ${todo.isCompleted ? "done" : ""}`}>
			<div className="task-checkbox">
				<CompleteToDo todo={todo} onChange={onComplete} />
			</div>

			<div className="task-details">
				<label className="task-title">{todo.text}</label>

				<div className="item-category">
					<input className="rounded-checkbox" type="checkbox" disabled
						style={{ backgroundColor: todo.color, borderColor: todo.color, }} />
					<span className="task-category">{todo.category}</span>
				</div>
			</div>

			<div className="task-actions">
				<EditToDo todo={todo} />

				<DeleteToDo todo={todo} onClick={onRemove} />
			</div>
		</div>
	)
}

export default ToDo;
import React from "react";
import CompleteToDo from "./chkCompleteToDo";
import EditToDo from "./btnEditToDo";
import DeleteToDo from "./btnDeleteToDo";

const ToDo = ({ todo, onComplete, onRemove, onEdit }) => {
	return (
		<div key={todo.id} className={`task-item ${todo.isCompleted ? "done" : ""}`}>
			<div className="task-checkbox">
				<CompleteToDo todo={todo} onChange={onComplete} />
			</div>

			<div className={`task-details ${todo.isCompleted ? "disabled noSelect" : ""} `}>
				<label className="task-title">{todo.text}</label>

				<div className="item-category">
					<input className="rounded-checkbox" type="checkbox" disabled
						style={{ backgroundColor: todo.color, borderColor: todo.color, }} />
					<span className="task-category">{todo.category}</span>
				</div>
			</div>

			<div className={`task-actions ${todo.isCompleted ? "disabled noSelect" : ""} `}>
				<EditToDo todo={todo} onClick={onEdit} />

				<DeleteToDo todo={todo} onClick={onRemove} />
			</div>
		</div>
	)
}

export default ToDo;
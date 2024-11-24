import React from "react";
import CompleteToDo from "./chkCompleteToDo";
import EditToDo from "./btnEditToDo";
import DeleteToDo from "./btnDeleteToDo";
import stl from "../../Styles/Home.module.css";

const ToDo = ({ todo, onComplete, onRemove, onEdit }) => {
	return (
		<div key={todo.id} className={`${stl.taskItem} ${todo.isCompleted ? stl.done : ""}`}>
			<div className={stl.taskCheckbox} style={{ backgroundColor: todo.Category.color || "transparent" }}>
				<CompleteToDo todo={todo} onChange={onComplete} />
			</div>

			<div className={`${stl.taskDetails} ${todo.isCompleted ? "disabled noSelect" : ""} `}>
				<label className={stl.taskTitle}>{todo.title}</label>

				<div className={stl.itemCategory}>
					{/* <input className={stl.roundedCheckbox} type="checkbox" disabled
						style={{ backgroundColor: todo.color, borderColor: todo.color, }} /> */}
					<span className={stl.taskCategory}>{todo.Category.title || ""}</span>
				</div>
			</div>

			<div className={`${stl.taskActions} ${todo.isCompleted ? "disabled noSelect" : ""} `}>
				<EditToDo todo={todo} onClick={onEdit} />

				<DeleteToDo todo={todo} onClick={onRemove} />
			</div>
		</div>
	)
}

export default ToDo;
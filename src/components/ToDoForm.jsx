import React from "react";

const ToDoForm = () => {
	return (
		<div className="todo-form">
			<input type="text" placeholder="Enter a task"/>
			<select>
				<option value="">Selecione uma categoria</option>
				<option value="Trabalho">Trabalho</option>
				<option value="Pessoal">Pessoal</option>
				<option value="Estudos">Estudos</option>
			</select>
			<button type="submit">Criar tarefa</button>
		</div>
	)
}

export default ToDoForm
import { useState } from "react";

const ToDoForm = ({ addToDo }) => {
	const [value, setValue] = useState("");
	const [category, setCategory] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		var cancelSave = false;

		if (value.trim() === "") {
			document.getElementById("inputCreateTask").classList.add("is-invalid");
			cancelSave = true;
		}
		else
			document.getElementById("inputCreateTask").classList.remove("is-invalid");

		if (category.trim() === "") {
			document.getElementById("selectCategory").classList.add("is-invalid");
			cancelSave = true;
		}
		else
			document.getElementById("selectCategory").classList.remove("is-invalid");

		if (!cancelSave) {
			addToDo(value, category);

			setValue("");
			setCategory("");
		}
	}

	return (
		<div className="todo-form">
			<h2>Criar Tarefa</h2>

			<form onSubmit={handleSubmit}>
				<input id="inputCreateTask" type="text" placeholder="Enter a task" value={value} onChange={(e) => setValue(e.target.value)} />
				<select id="selectCategory" value={category} onChange={(e) => setCategory(e.target.value)}>
					<option value="">Selecione uma categoria</option>
					<option value="Trabalho">Trabalho</option>
					<option value="Pessoal">Pessoal</option>
					<option value="Estudos">Estudos</option>
				</select>
				<button type="submit">Criar tarefa</button>
			</form>
		</div>
	)
}

export default ToDoForm;
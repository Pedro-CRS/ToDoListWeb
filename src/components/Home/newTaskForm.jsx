import { useState } from "react";

const TaskForm = ({ addToDo }) => {
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
		<div className="new-task">
			<h2>Criar tarefa</h2>

			<form onSubmit={handleSubmit}>
				<input id="inputCreateTask" type="text" placeholder="Digite o título da nova tarefa" value={value} onChange={(e) => setValue(e.target.value)} />

				<select id="selectCategory" value={category} onChange={(e) => setCategory(e.target.value)}>
					<option value="">Selecione uma categoria</option>
					<option value="-1">Criar nova categoria</option>
					<option value="Trabalho">Trabalho</option>
					<option value="Pessoal">Pessoal</option>
					<option value="Estudos">Estudos</option>
				</select>

				<div className="create-div">
					<input className="hidden" id="inputCreateCategory" type="text" placeholder="Digite o título da nova categoria" />
					<button className="create-btn" type="submit">Criar tarefa</button>
				</div>
			</form>
		</div>
	)
}

export default TaskForm;
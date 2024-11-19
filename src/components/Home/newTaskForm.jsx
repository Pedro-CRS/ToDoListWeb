import { useState } from "react";

const TaskForm = ({ addToDo }) => {
	const [value, setValue] = useState("");
	const [category, setCategory] = useState("");
	const [newCategory, setNewCategory] = useState("");

	const [validationErrors, setValidationErrors] = useState({ task: false, category: false, newCategory: false });
	const [isCreatingCategory, setIsCreatingCategory] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		var cancelSave = false;

		if (value.trim() === "") {
			setValidationErrors((prev) => ({ ...prev, task: true }));
			cancelSave = true;
		}
		else
			setValidationErrors((prev) => ({ ...prev, task: false }));

		if (category.trim() === "") {
			setValidationErrors((prev) => ({ ...prev, category: true }));
			cancelSave = true;
		}
		else
			setValidationErrors((prev) => ({ ...prev, category: false }));

		if (newCategory.trim() === "" && category === "-1") {
			setValidationErrors((prev) => ({ ...prev, newCategory: true }));
			cancelSave = true;
		}
		else
			setValidationErrors((prev) => ({ ...prev, newCategory: false }));

		if (!cancelSave) {
			addToDo(value, category === "-1" ? newCategory : category, true);

			setValue("");
			setCategory("");
			setNewCategory("");
		}
	}

	const categoryOnChange = (selectedValue) => {
		setCategory(selectedValue);
		setNewCategory("");
		setValidationErrors((prev) => ({ ...prev, category: false, newCategory: false }));

		if (selectedValue === "-1")
			setIsCreatingCategory(true);
		else
			setIsCreatingCategory(false);
	};

	return (
		<div className="new-task">
			<h2>Criar tarefa</h2>

			<form onSubmit={handleSubmit}>
				<input id="inputCreateTask" type="text" placeholder="Digite o título da nova tarefa" value={value} onChange={(e) => setValue(e.target.value)}
					className={validationErrors.task ? "is-invalid" : ""} />

				<select id="selectCategory" value={category} onChange={(e) => categoryOnChange(e.target.value)} className={validationErrors.category ? "is-invalid" : ""}>
					<option value="" disabled>Selecione uma categoria</option>
					<option value="-1">Criar nova categoria</option>
					<option value="Trabalho">Trabalho</option>
					<option value="Pessoal">Pessoal</option>
					<option value="Estudos">Estudos</option>
				</select>

				<div className="create-div">
					{isCreatingCategory && (
						<input className={validationErrors.newCategory ? "is-invalid" : ""} id="newCategory" type="text" placeholder="Digite o título da nova categoria"
							value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
					)}
					<button className="create-btn" type="submit">Criar tarefa</button>
				</div>
			</form>
		</div>
	)
}

export default TaskForm;
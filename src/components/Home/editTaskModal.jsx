import { React, useState, useEffect } from "react";
import stl from "../../Styles/Modal.module.css";
import { loadCategories, createCategory, updateTask } from "../../api/api";

const ToDoModal = ({ task, onSave, onClose }) => {
	const [taskTitle, setTaskTitle] = useState("");
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState([]);
	const [newCategory, setNewCategory] = useState("");

	const [validationErrors, setValidationErrors] = useState({ task: false, category: false, newCategory: false });
	const [isCreatingCategory, setIsCreatingCategory] = useState(false);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await loadCategories();
				setCategories(data);
			} catch (error) {
				console.error("Erro ao carregar categorias", error);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		if (task) {
			setTaskTitle(task.title);
			setCategory(task.Category.id.toString() || "");
		}
	}, [task]);

	const categoryOnChange = (selectedValue) => {
		setCategory(selectedValue);
		setNewCategory("");
		setValidationErrors((prev) => ({ ...prev, category: false, newCategory: false }));

		if (selectedValue === "-1")
			setIsCreatingCategory(true);
		else
			setIsCreatingCategory(false);
	}

	const handleSaveEdit = async (e) => {
		e.preventDefault();

		let cancelSave = false;
		setValidationErrors((prev) => ({ ...prev, task: false, category: false, newCategory: false }));

		if (taskTitle.trim() === "") {
			setValidationErrors((prev) => ({ ...prev, task: true }));
			cancelSave = true;
		}

		if (category.trim() === "") {
			setValidationErrors((prev) => ({ ...prev, category: true }));
			cancelSave = true;
		}

		if (newCategory.trim() === "" && category === "-1") {
			setValidationErrors((prev) => ({ ...prev, newCategory: true }));
			cancelSave = true;
		}

		if (!cancelSave) {
			if (category === "-1" && newCategory) {
				try {
					const data = await createCategory({ title: newCategory });
					const createdCategory = data.data;

					setCategories((prev) => [...prev, data.data]);

					await updateTask(task.id, { title: taskTitle, category_id: parseInt(createdCategory.id) });

					if (onSave)
						onSave();

				} catch (error) {
					alert("Erro ao editar tarefa.", error);
				}
			}
			else {
				try {
					await updateTask(task.id, { title: taskTitle, category_id: parseInt(category) });

					if (onSave)
						onSave();

				} catch (error) {
					alert("Erro ao editar tarefa.", error);
				}
			}
		}
	}

	return (
		<div className={stl.modalOverlay}>
			<div className={stl.modal}>
				<h3>Editar Tarefa</h3>

				<form>
					<div>
						<label>Texto da Tarefa:</label>
						<input type="text" placeholder="Digite o título da tarefa" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}
							className={validationErrors.task ? "is-invalid" : ""} />
					</div>

					<div>
						<label>Categoria:</label>
						<select value={category} onChange={(e) => categoryOnChange(e.target.value)} className={validationErrors.category ? "is-invalid" : ""}>
							<option value="" disabled>Selecione uma categoria</option>
							<option value="-1">Criar nova categoria</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>{category.title}</option>
							))}
						</select>

						{isCreatingCategory && (
							<div className={`w-100 ${stl.newCategoryInputsDiv}`}>
								<input className={validationErrors.newCategory ? "is-invalid" : ""} id="newCategory" type="text"
									placeholder="Digite o título da nova categoria" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
							</div>
						)}
					</div>

					<button className={"btnSave"} type="button" onClick={handleSaveEdit}>Salvar</button>
					<button className={"btnCancel"} type="button" onClick={onClose}>Cancelar</button>
				</form>
			</div>
		</div>
	);
};

export default ToDoModal;

import React, { useEffect, useState, useRef } from "react";
import stl from "../../Styles/Home.module.css";
import stlModal from "../../Styles/Modal.module.css";
import { loadCategories, createCategory } from "../../api/api";

const TaskForm = ({ addToDo, onSave, onClose }) => {
	const [categoryTitle, setcategoryTitle] = useState("");
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		let cancelSave = false;
		setValidationErrors((prev) => ({ ...prev, task: false, category: false, newCategory: false }));

		if (categoryTitle.trim() === "") {
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
			if (newCategory) {
				try {
					const data = await createCategory({ title: newCategory });
					setCategories((prev) => [...prev, data.data]);
				} catch (error) {
					console.error("Erro ao criar categoria", error);
				}
			}
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
	}

	return (
		<div className={stlModal.modalOverlay}>
			<div className={stlModal.modal}>
				<div className={stl.newTask}>
					<h2>Criar tarefa</h2>

					<form onSubmit={handleSubmit}>
						<input id="inputCreateTask" type="text" placeholder="Digite o título da nova tarefa" value={categoryTitle} onChange={(e) => setcategoryTitle(e.target.value)}
							className={validationErrors.task ? "is-invalid" : ""} />

						<select id="selectCategory" value={category} onChange={(e) => categoryOnChange(e.target.value)} className={validationErrors.category ? "is-invalid" : ""}>
							<option value="" disabled>Selecione uma categoria</option>
							<option value="-1">Criar nova categoria</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>{category.title}</option>
							))}
						</select>

						{isCreatingCategory && (
							<div className={`w-100 ${stlModal.newCategoryInputsDiv}`}>
								<input className={validationErrors.newCategory ? "is-invalid" : ""} id="newCategory" type="text"
									placeholder="Digite o título da nova categoria" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
							</div>
						)}

						<div>
							<button className={stlModal.btnSave} type="submit" onClick={onSave}>Criar tarefa</button>
							<button className={stlModal.btnCancel} type="button" onClick={onClose}>Cancelar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default TaskForm;
import { React, useState, useEffect } from "react";
import stl from "../../Styles/Modal.module.css";

const ToDoModal = ({ task, onSave, onClose }) => {
	const [text, setText] = useState("");
	const [category, setCategory] = useState("");

	useEffect(() => {
		if (task) {
			setText(task.text);
			setCategory(task.category);
		}
	}, [task]);

	const handleSave = () => {
		if (text.trim() === "" || category === "") {
			alert("Preencha todos os campos!");
			return;
		}
		onSave({ ...task, text, category });
	};

	return (
		<div className={stl.modalOverlay}>
			<div className={stl.modal}>
				<h3>Editar Tarefa</h3>

				<form>
					<div>
						<label>Texto da Tarefa:</label>
						<input type="text" value={text} onChange={(e) => setText(e.target.value)} />
					</div>

					<div>
						<label>Categoria:</label>
						<select value={category} onChange={(e) => setCategory(e.target.value)}>
							<option value="Trabalho">Trabalho</option>
							<option value="Pessoal">Pessoal</option>
							<option value="Estudos">Estudos</option>
						</select>
					</div>

					<button className={stl.btnSave} type="button" onClick={handleSave}>Salvar</button>
					<button className={stl.btnCancel} type="button" onClick={onClose}>Cancelar</button>
				</form>
			</div>
		</div>
	);
};

export default ToDoModal;

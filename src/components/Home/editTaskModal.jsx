import { React, useState, useEffect } from "react";
import "./Modal.css";

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
		<div className="modal-overlay">
			<div className="modal">
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

					<button className="btnSave" type="button" onClick={handleSave}>Salvar</button>
					<button className="btnCancel" type="button" onClick={onClose}>Cancelar</button>
				</form>
			</div>
		</div>
	);
};

export default ToDoModal;

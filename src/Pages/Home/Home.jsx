import { useState, useEffect } from "react";
import stl from "../../Styles/Home.module.css";
import ToDo from "../../components/Home/ToDo";
import TaskForm from "../../components/Home/newTaskForm";
import FiltersBtns from "../../components/Home/btnsFilters";
import Modal from "../../components/Home/editTaskModal";
import { loadTasks } from "../../api/api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TodoPage = () => {
	const [todos, setTodos] = useState([]);

	const fetchTasks = async (closeModal) => {
		try {
			const data = await loadTasks();
			setTodos(data);

			if (closeModal)
				handleCloseModal();

		} catch (error) {
			console.error("Erro ao carregar tarefas.", error);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const [filter, setFilter] = useState("All");

	const addToDo = (text, category, createdNow) => {
		const newToDos = [
			// ...todos,
			{
				id: todos.length + 1,
				text: text,
				category: category,
				isCompleted: false,
				createdNow: createdNow
			}, ...todos
		];

		setTodos(newToDos);
	}

	const completeToDo = (id) => {
		const newToDos = [...todos];
		newToDos.map((todo) => todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo);

		setTodos(newToDos);
	}

	const removeToDo = (id) => {
		withReactContent(Swal).fire({
			heightAuto: false,
			title: "Deseja realmente deletar essa tarefa?",
			position: "center",
			icon: "warning",
			showConfirmButton: true,
			confirmButtonText: "Confirmar",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			allowOutsideClick: false,
			allowEscapeKey: false,
			// reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				const newToDos = [...todos];
				const filteredToDos = newToDos.filter((todo) => todo.id !== id ? todo : null);

				setTodos(filteredToDos);
			}
		});
	}

	const [currentTask, setCurrentTask] = useState(null);
	const [newTask, setNewTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditClick = (task) => {
		setCurrentTask(task);
		setIsModalOpen("edit");
	};

	const handleNewTaskClick = (task) => {
		setNewTask(task);
		setIsModalOpen("new");
	};

	const handleSaveEdit = (updatedTask) => {
		setTodos(todos.map((todo) => (todo.id === updatedTask.id ? updatedTask : todo)));
		setIsModalOpen(false);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={stl.todoContainer}>
			<main className={stl.mainContent}>
				<header>
					<h1>Todas as suas tarefas</h1>

					<FiltersBtns setFilter={setFilter} />
				</header>

				<div style={{ minHeight: "30px", margin: "1rem 0 0 0", textAlign: "end" }}>
					<button className={stl.createBtn} type="button" onClick={handleNewTaskClick}>Criar tarefa</button>
				</div>

				<div className={stl.tasksList}>
					{
						todos.filter((todo) =>
							filter === "All" ? true : filter === "Done" ? todo.isCompleted : !todo.isCompleted
						).map((todo) => (
							<ToDo key={todo.id} todo={todo} onComplete={completeToDo} onRemove={removeToDo} onEdit={handleEditClick} />
						))
					}
				</div>

				{isModalOpen === "edit" && currentTask && (<Modal task={currentTask} onSave={handleSaveEdit} onClose={handleCloseModal} />)}

				{isModalOpen === "new" && (<TaskForm addToDo={(param) => fetchTasks(param)} onClose={handleCloseModal} />)}
			</main>
		</div>
	);
};

export default TodoPage;
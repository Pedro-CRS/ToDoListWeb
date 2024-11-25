import { useState, useEffect } from "react";
import stl from "../../Styles/Home.module.css";
import ToDo from "../../components/Home/ToDo";
import TaskForm from "../../components/Home/newTaskForm";
import FiltersBtns from "../../components/Home/btnsFilters";
import Modal from "../../components/Home/editTaskModal";
import { loadTasks, deleteTask } from "../../api/api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TodoPage = () => {
	const [todos, setTodos] = useState([]);

	const fetchTasks = async (closeModal = true) => {
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
		fetchTasks(false);
	}, []);

	const [filter, setFilter] = useState("All");

	const completeToDo = (id) => {
		const newToDos = [...todos];
		newToDos.map((todo) => todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo);

		setTodos(newToDos);
	}

	const handleDeleteTask = (id) => {
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
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await deleteTask(id);
					fetchTasks();

					Swal.fire({
						title: "Tarefa excluída com sucesso!",
						icon: "success",
						heightAuto: false,
					});

				} catch (error) {
					Swal.fire({
						title: "Erro ao excluir a tarefa!",
						text: error.response?.data?.error || "Algo deu errado.",
						icon: "error",
						heightAuto: false,
					});
				}
			}
		});
	}

	const [currentTask, setCurrentTask] = useState(null);
	const [newTask, setNewTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditTask = (task) => {
		setCurrentTask(task);
		setIsModalOpen("edit");
	};

	const handleNewTaskClick = (task) => {
		setNewTask(task);
		setIsModalOpen("new");
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
							<ToDo key={todo.id} todo={todo} onComplete={completeToDo} onRemove={handleDeleteTask} onEdit={handleEditTask} />
						))
					}
				</div>

				{isModalOpen === "edit" && currentTask && (<Modal task={currentTask} onSave={fetchTasks} onClose={handleCloseModal} />)}

				{isModalOpen === "new" && (<TaskForm addToDo={fetchTasks} onClose={handleCloseModal} />)}
			</main>
		</div>
	);
};

export default TodoPage;
import { useState, useEffect, useContext } from "react";
import stl from "../../Styles/Home.module.css";
import ToDo from "../../components/Home/ToDo";
import TaskForm from "../../components/Home/newTaskForm";
import FiltersBtns from "../../components/Home/btnsFilters";
import Modal from "../../components/Home/editTaskModal";
import { loadTasks, deleteTask, updateTaskCompletion } from "../../api/api";
import UserButton from "../../components/UserButton";
import { AuthContext } from "../../Pages/AuthContext";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TodoPage = () => {
	const { user, logout } = useContext(AuthContext);
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchTasks = async (closeModal = true) => {
		setLoading(true);
		try {
			const data = await loadTasks(user.id);
			setTodos(data);

			if (closeModal)
				handleCloseModal();

		} catch (error) {
			alert("Erro ao carregar tarefas.");
		}
		finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user)
			fetchTasks(false);
	}, [user]);

	const [filter, setFilter] = useState("All");

	const completeToDo = async (id, completedStatus) => {
		setLoading(true);
		try {
			await updateTaskCompletion(id, completedStatus);

			setTodos((prevTasks) =>
				prevTasks.map((task) =>
					task.id === id ? { ...task, isCompleted: completedStatus } : task
				)
			);
		} catch (error) {
			alert("Ops! Ocorreu algum problema ao marcar a tarefa como completa, tente novamente, se o error persistir entre em contato com nossa equipe.");
		}
		finally {
			setLoading(false);
		}
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
			customClass: { confirmButton: "btnSave", cancelButton: "btnCancel" },
		}).then(async (result) => {
			if (result.isConfirmed) {
				setLoading(true);
				try {
					await deleteTask(id);

					await fetchTasks();

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
				finally {
					setLoading(false);
				}
			}
		});
	}

	const [currentTask, setCurrentTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditTask = (task) => {
		setCurrentTask(task);
		setIsModalOpen("edit");
	};

	const handleNewTaskClick = (task) => {
		setIsModalOpen("new");
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const rootElement = document.getElementById("root");

		if (loading)
			rootElement.classList.add("loader");
		else
			rootElement.classList.remove("loader");

		return () => rootElement.classList.remove("loader");
	}, [loading]);

	if (user === null)
		return <p>Carregando...</p>

	if (!user)
		return <p>Ocorreu algum error ao buscar seus dados...</p>;

	return (
		<div className={stl.todoContainer}>
			<main className={stl.mainContent}>
				<header>
					<h1>Todas as suas tarefas</h1>

					<UserButton userName={user?.name} />
				</header>

				<FiltersBtns setedFilter={filter} setFilter={setFilter} />

				<div style={{ minHeight: "30px", margin: "0.7rem 0 0 0", textAlign: "end" }}>
					<button className={stl.createBtn} type="button" onClick={handleNewTaskClick}>Criar tarefa</button>
				</div>

				<div className={stl.tasksList}>
					{
						todos.filter((todo) =>
							filter === "All" ? true : filter === "Done" ? todo.isCompleted : !todo.isCompleted
						).map((todo) => (
							<ToDo key={todo.id} todo={todo} onComplete={(e) => completeToDo(todo.id, e.target.checked)} onRemove={handleDeleteTask} onEdit={handleEditTask} />
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
import { useState } from "react";
import "./Home.css";

import ToDo from "../../components/Home/ToDo";
import TaskForm from "../../components/Home/newTaskForm";
import FiltersBtns from "../../components/Home/btnsFilters";

const TodoPage = () => {
	const [todos, setTodos] = useState([
		{
			id: 1,
			text: "Criar funcionalidade X no sistema",
			category: "Trabalho",
			isCompleted: false,
			color: "burlywood"
		},
		{
			id: 2,
			text: "Ir para academia",
			category: "Pessoal",
			isCompleted: false,
			color: "green"
		},
		{
			id: 3,
			text: "Estudar React",
			category: "Estudo",
			isCompleted: false,
			color: "pink"
		},
		{
			id: 4,
			text: "Criar funcionalidade X no sistema",
			category: "Trabalho",
			isCompleted: false,
			color: "burlywood"
		},
		{
			id: 5,
			text: "Ir para academia",
			category: "Pessoal",
			isCompleted: false,
			color: "green"
		},
		{
			id: 6,
			text: "Estudar React",
			category: "Estudo",
			isCompleted: false,
			color: "pink"
		},
		{
			id: 7,
			text: "Criar funcionalidade X no sistema",
			category: "Trabalho",
			isCompleted: false,
			color: "burlywood"
		},
		{
			id: 8,
			text: "Ir para academia",
			category: "Pessoal",
			isCompleted: false,
			color: "green"
		},
		{
			id: 9,
			text: "Estudar React",
			category: "Estudo",
			isCompleted: false,
			color: "pink"
		},
	]);

	const [filter, setFilter] = useState("All");

	const addToDo = (text, category) => {
		const newToDos = [
			...todos,
			{
				id: todos.length + 1,
				text: text,
				category: category,
				isCompleted: false,
			}
		];

		setTodos(newToDos);
	}

	const completeToDo = (id) => {
		const newToDos = [...todos];
		newToDos.map((todo) => todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo);

		setTodos(newToDos);
	}

	const removeToDo = (id) => {
		const newToDos = [...todos];
		const filteredToDos = newToDos.filter((todo) => todo.id !== id ? todo : null);

		setTodos(filteredToDos);
	}

	return (
		<div className="todo-container">
			<main className="main-content">
				<header>
					<h1>Todas as suas tarefas</h1>

					<FiltersBtns setFilter={setFilter} />
				</header>

				<div className="tasks-list">
					{
						todos.filter((todo) =>
							filter === "All" ? true : filter === "Done" ? todo.isCompleted : !todo.isCompleted
						).map((todo) => (
							<ToDo key={todo.id} todo={todo} onComplete={completeToDo} onRemove={removeToDo} />
						))
					}
				</div>

				<footer className="add-task-footer">
					<TaskForm addToDo={addToDo} />
				</footer>
			</main>
		</div>
	);
};

export default TodoPage;
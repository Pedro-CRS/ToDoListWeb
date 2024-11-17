import { useState } from "react";
import "./App.css";

import ToDoForm from "./components/ToDoForm";
import ToDo from "./components/ToDo";
import Search from "./components/search";
import Filter from "./components/Filter";

const App = () => {
	const [todos, setTodos] = useState([
		{
			id: 1,
			text: "Criar funcionalidade X no sistema",
			category: "Trabalho",
			isCompleted: false,
		},
		{
			id: 2,
			text: "Ir para academia",
			category: "Pessoal",
			isCompleted: false,
		},
		{
			id: 3,
			text: "Estudar React",
			category: "Estudo",
			isCompleted: false,
		},
	]);

	const [search, setSearch] = useState("");

	const [filter, setFilter] = useState("All");
	const [sort, setSort] = useState("Asc");

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
		<div className="app">
			<h1>Lista de Tarefas</h1>
			<Search search={search} setSearch={setSearch} />
			<Filter filter={filter} setFilter={setFilter} setSort={setSort} />

			<div className="todo-list">
				{
					todos.filter((todo) =>
						filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted
					).filter((todo) =>
						todo.text.toLowerCase().includes(search.toLowerCase()) ||
						todo.category.toLowerCase().includes(search.toLowerCase())
					).sort((a, b) =>
						sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
					).map((todo) => (
						<ToDo key={todo.id} todo={todo} onComplete={completeToDo} onRemove={removeToDo} />
					))
				}
			</div>
			<ToDoForm addToDo={addToDo} />
		</div>
	)
}

export default App;
import { useState } from "react";
import "./App.css";

import ToDoForm from "./components/ToDoForm";
import ToDo from "./components/ToDo";
import Search from "./components/search";

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
			<div className="todo-list">
				{
					todos.filter((todo) =>
						todo.text.toLowerCase().includes(search.toLowerCase()) ||
						todo.category.toLowerCase().includes(search.toLowerCase())
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
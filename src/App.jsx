import { useState } from "react";
import ToDoForm from "./components/ToDoForm";
import ToDo from "./components/ToDo";
import "./App.css";

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

	return (
		<div className="app">
			<h1>Lista de Tarefas</h1>
			<div className="todo-list">
				{todos.map((todo) => (
					<ToDo key={todo.id} todo={todo} />
				))}
			</div>
			<ToDoForm addToDo={addToDo} />
		</div>
	)
}

export default App;
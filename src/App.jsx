import { useState } from "react";
import ToDoForm from "./components/ToDoForm";
import ToDo from "./components/ToDo";
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

	return (
		<div className="app">
			<h1>Lista de Tarefas</h1>
			<div className="todo-list">
				{todos.map((todo) => (
					<ToDo todo={todo} />
				))}
			</div>
			<ToDoForm/>
		</div>
	)
}

export default App;
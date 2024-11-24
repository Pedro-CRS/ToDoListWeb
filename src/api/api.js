import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000",
});

export const registerUser = async (data) => {
	return api.post("/auth/register", data);
};

export const loginUser = async (data) => {
	return api.post("/auth/login", data);
};

export const loadCategories = async () => {
	try {
		const response = await api.get("/categories");
		return response.data;
	} catch (error) {
		console.error("Erro ao carregar categorias:", error);
		throw error;
	}
};

export const createCategory = async (data) => {
	return api.post("/categories", data);
};

export const loadTasks = async () => {
	try {
		const response = await api.get("/tasks");
		return response.data;
	} catch (error) {
		console.error("Erro ao carregar suas tarefas:", error);
		throw error;
	}
};

export const createTask = async (data) => {
	return api.post("/tasks", data);
};

export default api;
import axios from "axios";

const api = axios.create({
	baseURL: "https://todolistweb-backend.onrender.com",
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
	if (token)
		config.headers["Authorization"] = `Bearer ${token}`;

	return config;
}, (error) => {
	return Promise.reject(error);
});

api.interceptors.response.use((response) => response,
	(error) => {
		if (error.response?.status === 401 || error.response?.status === 403) {
			localStorage.removeItem("authToken");
			sessionStorage.removeItem("authToken");
			window.location.href = "/login";
		}

		return Promise.reject(error);
	}
);

export const registerUser = async (data) => {
	return api.post("/auth/register", data);
};

export const loginUser = async (data) => {
	return api.post("/auth/login", data);
};

export const loadCategories = async (userId) => {
	try {
		const response = await api.get(`/categories?user_id=${userId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao carregar categorias:", error);
		throw error;
	}
};

export const createCategory = async (data) => {
	return api.post("/categories", data);
};

export const loadTasks = async (userId) => {
	try {
		const response = await api.get(`/tasks?user_id=${userId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao carregar suas tarefas:", error);
		throw error;
	}
};

export const createTask = async (data) => {
	return api.post("/tasks", data);
};

export const deleteTask = async (id) => {
	return api.delete(`/tasks/${id}`);
};

export const getTaskById = async (id) => {
	return api.get(`/tasks/${id}`);
};

export const updateTask = async (id, data) => {
	return api.put(`/tasks/${id}`, data);
};

export const updateTaskCompletion = async (id, isCompleted) => {
	return api.patch(`/tasks/${id}/completed`, { isCompleted });
};

export default api;
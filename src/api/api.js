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

export default api;
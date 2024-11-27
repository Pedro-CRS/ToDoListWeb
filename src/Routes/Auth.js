export const isAuthenticated = () => {
	return localStorage.getItem("authToken") || sessionStorage.getItem("authToken"); 
};
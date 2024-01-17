import api from '../utils/api';

const authService = {
	async login(username, password) {
		const response = await api.post('/api/auth/login', { username, password });
		return response.data.token;
	},

	async register(username, password) {
		const response = await api.post('/api/auth/register', { username, password });
		return response.data.token;
	},
};

export default authService;

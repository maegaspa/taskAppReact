import api from '../utils/api';

const taskService = {
	async getAllTasks() {
		const response = await api.get('/api/tasks');
		return response.data;
	},

	async createTask(title, description, isFavorite = false, dueDate = null, token) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Accept' : 'application/json',
				'Authorization': token
			}
		};

		const response = await api.post('/api/tasks/tasks', { title, description, isFavorite, dueDate }, config);
		return response.data;
	},

	async getTaskById(taskId) {
		const response = await api.get(`/api/tasks/${taskId}`);
		return response.data;
	},

	async updateTask(taskId, title, description, isFavorite = false, dueDate = null) {
		const response = await api.put(`/api/tasks/${taskId}`, { title, description, isFavorite, dueDate });
		return response.data;
	},

	async deleteTask(taskId) {
		const response = await api.delete(`/api/tasks/${taskId}`);
		return response.data;
	},
};

export default taskService;

import axios from 'axios';

const taskService = {
	async getAllTasks() {
		const response = await axios.get('/api/tasks');
		return response.data;
	},

	async createTask(title, description, isFavorite = false, dueDate = null) {
		const response = await axios.post('/api/tasks', { title, description, isFavorite, dueDate });
		return response.data;
	},

	async getTaskById(taskId) {
		const response = await axios.get(`/api/tasks/${taskId}`);
		return response.data;
	},

	async updateTask(taskId, title, description, isFavorite = false, dueDate = null) {
		const response = await axios.put(`/api/tasks/${taskId}`, { title, description, isFavorite, dueDate });
		return response.data;
	},

	async deleteTask(taskId) {
		const response = await axios.delete(`/api/tasks/${taskId}`);
		return response.data;
	},
};

export default taskService;

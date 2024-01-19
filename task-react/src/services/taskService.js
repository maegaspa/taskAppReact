import axios from 'axios';

const taskService = {
	async getAllTasks() {
		const response = await axios.get('/api/tasks');
		return response.data;
	},

	async createTask(title, description) {
		const response = await axios.post('/api/tasks', { title, description });
		return response.data;
	},

	async getTaskById(taskId) {
		const response = await axios.get(`/api/tasks/${taskId}`);
		return response.data;
	},
};

export default taskService;

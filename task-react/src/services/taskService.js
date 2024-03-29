import api from '../utils/api';

const taskService = {
	async getAllTasksByCategory(token, categoryId) {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Accept' : 'application/json',
					'Authorization': token
				}
			};

			const response = await api.get(`/api/tasks/tasks/categories/${categoryId}`, config);
			return response.data;
		} catch (error) {
			throw new Error('Error fetching tasks: ' + error.message);
		}
	},

	async getAllTasks(token) {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Accept' : 'application/json',
					'Authorization': token
				}
			};

			const response = await api.get('/api/tasks/tasks', config);
			return response.data;
		} catch (error) {
			throw new Error('Error fetching tasks: ' + error.message);
		}
	},

	async createTask(token, title, description, categoryId  = undefined, isFavorite = false, dueDate = null) {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Accept' : 'application/json',
					'Authorization': token
				}
			};

			if (categoryId === false) {
				categoryId = undefined;
			}
			const response = await api.post('/api/tasks/tasks', { title, description, categoryId, isFavorite, dueDate }, config);
			return response.data;
		} catch (error) {
			throw new Error('Error creating task: ' + error.message);
		}
	},

	async getTaskById(token, taskId) {
		try {
			const config = {
				headers: {
					'Authorization': token
				}
			};

			const response = await api.get(`/api/tasks/tasks/${taskId}`, config);
			return response.data;
		} catch (error) {
			throw new Error('Error fetching task by ID: ' + error.message);
		}
	},

	async updateTask(token, taskId, title, description, categoryId = undefined, isFavorite = false, dueDate = null) {
		try {
			const config = {
				headers: {
					'Authorization': token
				}
			};

			if (categoryId === false) {
				categoryId = undefined;
			}
			const response = await api.put(`/api/tasks/tasks/${taskId}`, { title, description, categoryId, isFavorite, dueDate }, config);
			return response.data;
		} catch (error) {
			throw new Error('Error updating task: ' + error.message);
		}
	},

	async deleteTask(token, taskId) {
		try {
			const config = {
				headers: {
					'Authorization': token
				}
			};

			const response = await api.delete(`/api/tasks/tasks/${taskId}`, config);
			return response.data;
		} catch (error) {
			throw new Error('Error deleting task: ' + error.message);
		}
	},
};

export default taskService;

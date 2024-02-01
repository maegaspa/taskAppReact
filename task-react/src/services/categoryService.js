import api from '../utils/api';

const categoryService = {
	async getAllCategories(token) {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Accept' : 'application/json',
					'Authorization': token
				}
			};

			const response = await api.get('/api/categories/categories', config);
			return response.data;
		} catch (error) {
			throw new Error('Error fetching categories: ' + error.message);
		}
	},

	async createCategory(token, type, name, description, startDate = false, endDate = null, budget = 0) {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Accept' : 'application/json',
					'Authorization': token
				}
			};

			const response = await api.post('/api/categories/categories', { type, name, description, startDate, endDate, budget }, config);
			return response.data;
		} catch (error) {
			throw new Error('Error creating category: ' + error.message);
		}
	},

	async getCategoryById(token, categoryId) {
		try {
			const config = {
				headers: {
					'Authorization': token
				}
			};

			const response = await api.get(`/api/categories/categories/${categoryId}`, config);
			return response.data;
		} catch (error) {
			throw new Error('Error fetching category by ID: ' + error.message);
		}
	},

	async updateCategory(token, categoryId, type, name, description, startDate = false, endDate = null, budget) {
		try {
			const config = {
				headers: {
					'Authorization': token
				}
			};

			const response = await api.put(`/api/categories/categories/${categoryId}`, { type, name, description, startDate, endDate, budget }, config);
			return response.data;
		} catch (error) {
			throw new Error('Error updating category: ' + error.message);
		}
	},

	async deleteCategory(token, categoryId) {
		try {
			const config = {
				headers: {
					'Authorization': token
				}
			};

			const response = await api.delete(`/api/categories/categories/${categoryId}`, config);
			return response.data;
		} catch (error) {
			throw new Error('Error deleting category: ' + error.message);
		}
	},
};

export default categoryService;

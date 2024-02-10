import api from "../utils/api";

const userService = {
	async getUserProfile(token) {
		const config = {
			headers: {
				'Authorization': token
			}
		};

		const response = await api.get('/api/users/profile', config);
		return response.data;
	},

	async updateUserProfile(token, username, password, profilePicture) {
		try {
			const config = {
				headers: {
					'Authorization': token
				}
			};

			const response = await api.put(`/api/users/profile`, { username, password, profilePicture }, config);
			return response.data;
		} catch (error) {
			throw new Error('Error updating task: ' + error.message);
		}
	},

	async saveProfilePicture(token, profilePicture) {
		try {
			const config = {
				headers: {
					'Authorization': token
				}
			};

			const response = await api.post('/api/users/upload-profile-picture', {profilePicture}, config)
			return response.data;
		} catch (error) {
			throw new Error('Error saving pp: ' + error.message);
		}
	}
};

export default userService;

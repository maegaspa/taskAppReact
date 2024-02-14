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
			const file = profilePicture;
			const reader = new FileReader();
			const formData = new FormData();

			reader.onloadend = async () => {
				const buffer = reader.result;
				console.log(buffer);
				formData.append('name', profilePicture.name);
				formData.append('size', profilePicture.size);
				formData.append('type', profilePicture.type);
				formData.append('buffer', buffer);
				formData.append('username', username);
				formData.append('password', password);


				const config = {
					headers: {
						'Authorization': token,
						"Content-Type": "multipart/form-data"
					},
				};

				console.log('zinzin');
				console.log(formData);
				for (var key of formData.entries()) {
					console.log(key[0] + ', ' + key[1]);
				}
				console.log(profilePicture);
				// console.log(formData.file);
				// console.log(formData.test);

				const response = await api.post(`/api/users/profile`, formData, config);
				return response.data;
			};

			reader.readAsArrayBuffer(file);

		} catch (error) {
			throw new Error('Error updating task: ' + error.message);
		}
	},

};

export default userService;

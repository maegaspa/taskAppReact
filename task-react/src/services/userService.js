import axios from 'axios';

const userService = {
	async getUserProfile() {
		const response = await axios.get('/api/users/profile');
		return response.data;
	},
};

export default userService;

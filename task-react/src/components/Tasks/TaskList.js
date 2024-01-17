import React, { useState, useEffect } from 'react';
import taskService from '../../services/taskService';

const TaskList = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				// Call taskService.getAllTasks()
				// Set the tasks data to state
			} catch (error) {
				// Handle errors
			}
		};

		fetchTasks();
	}, []);

	return (
		<div>
			<h2>Task List</h2>
			{/* Display the list of tasks */}
		</div>
	);
};

export default TaskList;

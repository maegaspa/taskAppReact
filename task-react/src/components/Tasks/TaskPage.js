import React, { useState } from 'react';
import CategoryMenu from './CategoryMenu';
import TaskList from './TaskList';
import { Grid } from '@material-ui/core';


const TaskPage = () => {
	const [tasks, setTasks] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const handleCategorySelect = (categoryId) => {
		setSelectedCategory(categoryId);
	};

	return (
		<Grid container>
			<Grid item xs={3}> {}
				<CategoryMenu onCategorySelect={handleCategorySelect} />
			</Grid>
			<Grid item xs={9}> {}
				<TaskList selectedCategory={selectedCategory} tasks={tasks} />
			</Grid>
		</Grid>
	);
};

export default TaskPage;

import React, { useState, useEffect } from 'react';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDarkMode } from '../../context/DarkModeContext';
import taskService from '../../services/taskService';
import useStyles from '../../styles/styles';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import authService from "../../services/authService";
import Cookies from "js-cookie";
import {useAuthState} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const TaskList = () => {
	const classes = useStyles();
	const { darkMode, toggleDarkMode } = useDarkMode();
	const navigate = useNavigate ();
	const [tasks, setTasks] = useState([]);
	const { isAuthenticated } = useAuthState();

	useEffect(() => {
		if (!isAuthenticated) {
			// Redirect to login or handle unauthorized access
			// You can use a navigation library like react-router-dom to navigate
			console.log('User not authenticated. Redirecting to login.');
			// Example with react-router-dom:
			// history.push('/login');
			return;
		}
		const fetchTasks = async () => {
			try {
				// Call taskService.getAllTasks()
				// Set the tasks data to state
			} catch (error) {
				// Handle errors
			}
		};

		fetchTasks();
	}, [isAuthenticated]);

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? '#303030' : 'white';
		document.body.style.color = darkMode ? 'white' : 'black';
	}, [darkMode]);

	const handleAddTask = async () => {
		try {
			navigate('/tasks/create');
		} catch (error) {
			// Handle errors
		}
	};

	return (
		<>
			<div className={classes.switchContainer}>
				<FormControlLabel
					control={<Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />}
					label="Dark Mode"
				/>
			</div>
			<ThemeProvider theme={createTheme({ palette: { type: darkMode ? 'dark' : 'light' } })}>
				<div className={classes.root}>
					<Paper className={classes.paper} elevation={3}>
						<Typography variant="h5" gutterBottom>
							Task List
						</Typography>
						{tasks.map((task) => (
							<div key={task.id}>
								{/* Display task details here */}
							</div>
						))}
						<Button
							variant="contained"
							color="primary"
							fullWidth
							className={classes.button}
							onClick={handleAddTask}
						>
							Add Task
						</Button>
					</Paper>
				</div>
			</ThemeProvider>
		</>
	);
};
export default TaskList;

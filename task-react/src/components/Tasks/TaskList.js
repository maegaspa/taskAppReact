import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDarkMode } from '../../context/DarkModeContext';
import taskService from '../../services/taskService';
import categoryService from '../../services/categoryService';
import useStyles from '../../styles/styles';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
import {useAuthState} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextField from "@material-ui/core/TextField";


const TaskList = ({ selectedCategory }) => {
	const classes = useStyles();
	const { darkMode, toggleDarkMode } = useDarkMode();
	const navigate = useNavigate ();
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const { isAuthenticated } = useAuthState();
	const [selectedTask, setSelectedTask] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [toDisplayUsername, setToDisplayUsername] = useState('');
	const [prevSelectedCategory, setPrevSelectedCategory] = useState(null);


	useEffect(() => {
		if (!isAuthenticated) {
			console.error('User not authenticated. Redirecting to login.');
			navigate('/login');
			return;
		}
		const fetchTasks = async () => {
			try {
				const token = Cookies.get();
				const decodeToken = jwtDecode(token.token);
				setToDisplayUsername(decodeToken.username);
				const fetchedTasks = await taskService.getAllTasks(token.token);

				setTasks(fetchedTasks);
			} catch (error) {
				console.error('Error fetching tasks:', error);
			}
		};

		fetchTasks();
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? '#303030' : 'white';
		document.body.style.color = darkMode ? 'white' : 'black';
		setFilteredTasks(tasks);
	}, [darkMode, tasks]);

	useEffect(() => {
		if (searchTerm) {
			const filtered = tasks.filter(task =>
				task.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredTasks(filtered);
		} else {
			setFilteredTasks(tasks);
		}
	}, [searchTerm, tasks]);

	useEffect(() => {
		if (selectedCategory === 667) {
			fetchTasks();
			setPrevSelectedCategory(667);
		}
		else if (selectedCategory && selectedCategory !== prevSelectedCategory && selectedCategory !== 667) {
			getTasksByCategory(selectedCategory);
			setPrevSelectedCategory(selectedCategory);
		}
	}, [selectedCategory, prevSelectedCategory]);

	useEffect(() => {
		setPrevSelectedCategory(selectedCategory);
	}, [selectedCategory]);


	const getTasksByCategory = async (categoryId) => {
		try {
			const token = Cookies.get();
			const tasks = await taskService.getAllTasksByCategory(token.token, categoryId);
			setTasks(tasks);
		} catch (error) {
			console.error('Error fetching tasks by category:', error);
		}
	};

	const fetchTasks = async () => {
		try {
			const token = Cookies.get();
			const decodeToken = jwtDecode(token.token);
			setToDisplayUsername(decodeToken.username);
			const fetchedTasks = await taskService.getAllTasks(token.token);

			setTasks(fetchedTasks);
		} catch (error) {
			console.error('Error fetching tasks:', error);
		}
	};
	const handleAddTask =  () => {
		navigate('/tasks/create');
	};

	const handleSortByDate = () => {
		const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
		setFilteredTasks(sortedTasks);
		setTasks(sortedTasks);
	};

	const handleSortByTitle = () => {
		const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
		setFilteredTasks(sortedTasks);
		setTasks(sortedTasks);
	};

	const handleFilterFavorites = () => {
		const favorites = tasks.filter(task => task.isFavorite);
		setFilteredTasks(favorites);
	};

	const handleResetFilters = () => {
		setFilteredTasks(tasks);
	};

	const handleTaskClick = (task) => {
		setSelectedTask(task);
		navigate('/tasks/create', { state: { selectedTask: task }});
	};
	const handleDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const reorderedTasks = [...filteredTasks];
		const [removed] = reorderedTasks.splice(result.source.index, 1);
		reorderedTasks.splice(result.destination.index, 0, removed);

		setFilteredTasks(reorderedTasks);
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
				<Paper className={classes.paper} elevation={3} >
					<Typography variant="h5" gutterBottom>
						{`${toDisplayUsername}'s Tasks`}
					</Typography>
					<TextField
						label="Search Tasks"
						variant="outlined"
						margin="normal"
						fullWidth
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Button onClick={handleSortByDate}>Sort by Date</Button>
					<Button onClick={handleSortByTitle}>Sort by Title</Button>
					<Button onClick={handleFilterFavorites}>Show Favorites</Button>
					<Button onClick={handleResetFilters}>Reset Filters</Button>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId="droppable">
							{(provided) => (
								<List
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{filteredTasks.map((task, index) => (
										<Draggable key={task['_id']} draggableId={task['_id']} index={index}>
											{(provided) => (
												<ListItem
													onClick={() => handleTaskClick(task)}
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													className={`${classes.listItem} ${classes.truncateText}`}
												>
													<ListItemText primary={task.title} secondary={task.description} />
													{task.isFavorite && (
														<IconButton className={classes.favoriteIcon}>
															<StarIcon />
														</IconButton>
													)}
												</ListItem>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</List>
							)}
						</Droppable>
					</DragDropContext>
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
			</ThemeProvider>
		</>
	);
};
export default TaskList;

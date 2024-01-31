import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { useAuthState } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';
import useStyles from '../../styles/styles';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import taskService from '../../services/taskService';
import Cookies from 'js-cookie';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Fade from '@mui/material/Fade';
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';


const TaskForm = (props) => {
	const classes = useStyles();
	const [taskTitle, setTaskTitle] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [isFavorite, setIsFavorite] = useState(false);
	const [dueDate, setDueDate] = useState(null);
	const navigate = useNavigate ();
	const { darkMode, toggleDarkMode } = useDarkMode();
	const { isAuthenticated } = useAuthState();
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const location = useLocation();
	const propsData = location.state;

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? '#303030' : 'white';
		document.body.style.color = darkMode ? 'white' : 'black';
	}, [darkMode]);

	useEffect(() => {
		if (propsData && propsData.selectedTask) {
			const selectedTask = propsData.selectedTask;
			setTaskTitle(selectedTask.title);
			setTaskDescription(selectedTask.description);
			setIsFavorite(selectedTask.isFavorite);
			setDueDate(new dayjs(selectedTask.dueDate));
		}
	}, [propsData]);
	const handleCloseAlert = (type) => {
		if (type === 'error') {
			setErrorMessage('');
		} else if (type === 'success') {
			setSuccessMessage('');
		}
	};

	const handleCancel =  () => {
		navigate('/tasks');
	};
	const handleSaveTask = async () => {
		try {
			if (!taskTitle || !taskDescription) {
				setErrorMessage('Please fill in both the title and description fields.');
				setTimeout(() => {
					handleCloseAlert('error');
				}, 5000);
				return;
			}
			const token = Cookies.get();
			if (propsData) {
				const updateTask = await taskService.updateTask(token.token, propsData.selectedTask['_id'], taskTitle, taskDescription, isFavorite, dueDate);
				console.log('Task successfully saved:', updateTask);
			} else {
				const newTask = await taskService.createTask(token.token, taskTitle, taskDescription, isFavorite, dueDate);
				console.log('Task successfully created:', newTask);
			}

			setTaskTitle('');
			setTaskDescription('');
			setIsFavorite(false);
			setDueDate();
			setErrorMessage('')
			setSuccessMessage('Task saved successfully.');
			setTimeout(() => {
				handleCloseAlert('success');
			}, 5000);
		} catch (error) {
			console.error('Error saving task:', error);
		}
	};

	const handleFavoriteToggle = () => {
		setIsFavorite((prev) => !prev);
	};

	return (
		<>
			<div className={classes.switchContainer}>
				<FormControlLabel
					control={<Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />}
					label="Dark Mode"
				/>
			</div>
			<Fade in={errorMessage !== ''}>
				<Alert severity="error" className={classes.alert}>
					<AlertTitle>Error</AlertTitle>
					{errorMessage}
				</Alert>
			</Fade>
			<Fade in={successMessage !== ''}>
				<Alert severity="success" className={classes.alert}>
					<AlertTitle>Success</AlertTitle>
					{successMessage}
				</Alert>
			</Fade>
			<ThemeProvider theme={createTheme({ palette: { type: darkMode ? 'dark' : 'light' } })}>
				<div className={classes.root}>
					<Paper className={classes.paper} elevation={3}>
						<Typography variant="h5" gutterBottom>
							{isAuthenticated ? '' : 'Please Log in to Create Tasks'}
						</Typography>
						{isAuthenticated && (
							<form>
								<TextField
									label="Task Title *"
									variant="outlined"
									margin="normal"
									fullWidth
									value={taskTitle}
									onChange={(e) => setTaskTitle(e.target.value)}
								/>
								<TextField
									label="Task Description *"
									variant="outlined"
									margin="normal"
									fullWidth
									multiline
									minRows={4}
									value={taskDescription}
									onChange={(e) => setTaskDescription(e.target.value)}
								/>
								<div className={classes.rowParent} >
									<div className={classes.rowChild}>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DemoContainer components={['DateTimePicker']}>
												<DateTimePicker
													label="Deadline"
													defaultValue={dayjs()}
													value={dueDate}
													onChange={(date) => {
														const d = new Date(date);
														setDueDate(d)
													}}
													className={darkMode ? classes.datePickerDark : ""}
													PopperProps={{className: darkMode ? classes.datePickerPopperDark : '',}}/>
											</DemoContainer>
										</LocalizationProvider>
									</div>
									<div className={classes.rowChildStar}>
										<IconButton color={isFavorite ? 'secondary' : 'default'} onClick={handleFavoriteToggle}>
											<StarIcon />
										</IconButton>
									</div>
								</div>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									className={classes.button}
									onClick={handleSaveTask}
								>
									Save Task
								</Button>
								<Button
									variant="contained"
									color="default"
									fullWidth
									className={classes.button}
									onClick={handleCancel}
								>
									Cancel
								</Button>
							</form>
						)}
					</Paper>
				</div>
			</ThemeProvider>
		</>
	);
};

export default TaskForm;

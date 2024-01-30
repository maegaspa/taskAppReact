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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const TaskForm = () => {
	const classes = useStyles();
	const [taskTitle, setTaskTitle] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [isFavorite, setIsFavorite] = useState(false);


	const { darkMode, toggleDarkMode } = useDarkMode();
	const { isAuthenticated } = useAuthState();

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? '#303030' : 'white';
		document.body.style.color = darkMode ? 'white' : 'black';
	}, [darkMode]);

	const handleSaveTask = () => {
		// Logique pour sauvegarder la tâche
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
			<ThemeProvider theme={createTheme({ palette: { type: darkMode ? 'dark' : 'light' } })}>
				<div className={classes.root}>
					<Paper className={classes.paper} elevation={3}>
						<Typography variant="h5" gutterBottom>
							{isAuthenticated ? '' : 'Please Log in to Create Tasks'}
						</Typography>
						{isAuthenticated && (
							<form>
								<TextField
									label="Task Title"
									variant="outlined"
									margin="normal"
									fullWidth
									value={taskTitle}
									onChange={(e) => setTaskTitle(e.target.value)}
								/>
								<TextField
									label="Task Description"
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
											<DemoContainer components={['DatePicker']}>
												<DatePicker
													label="Deadline"
													defaultValue={dayjs()}
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
							</form>
						)}
					</Paper>
				</div>
			</ThemeProvider>
		</>
	);
};

export default TaskForm;

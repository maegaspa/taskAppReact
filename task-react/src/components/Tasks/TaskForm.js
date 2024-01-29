import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/system';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { useAuthState } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';
import useStyles from '../../styles/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider, DateField, TimeField } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const TaskForm = () => {
	const classes = useStyles();
	const [taskTitle, setTaskTitle] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [dueDate, setDueDate] = useState(null);
	const [isFavorite, setIsFavorite] = useState(false);

	const { darkMode, toggleDarkMode } = useDarkMode();
	const { isAuthenticated } = useAuthState();

	const [locale, setLocale] = useState('fr-FR'); // Remplacez 'fr-FR' par votre locale par défaut
	const locales = {
		'fr-FR': 'French',
	};

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? '#303030' : 'white';
		document.body.style.color = darkMode ? 'white' : 'black';
	}, [darkMode]);

	const handleSaveTask = () => {
		// Logique pour sauvegarder la tâche
	};

	const handleLocaleChange = (event, newLocale) => {
		if (newLocale != null) {
			setLocale(newLocale);
		}
	};

	return (
		<ThemeProvider theme={createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } })}>
			<div className={classes.root}>
				<div className={classes.switchContainer}>
					<FormControlLabel
						control={<Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />}
						label="Dark Mode"
					/>
				</div>
				<Paper className={classes.paper} elevation={3}>
					<Typography variant="h5" gutterBottom>
						{isAuthenticated ? 'Create a New Task' : 'Please Log in to Create Tasks'}
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
								rows={4}
								value={taskDescription}
								onChange={(e) => setTaskDescription(e.target.value)}
							/>
							<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locales[locale]}>
								<Stack spacing={3} sx={{ width: 300 }}>
									<ToggleButtonGroup
										value={locale}
										exclusive
										fullWidth
										onChange={handleLocaleChange}
									>
										{Object.keys(locales).map((localeItem) => (
											<ToggleButton key={localeItem} value={localeItem}>
												{locales[localeItem]}
											</ToggleButton>
										))}
									</ToggleButtonGroup>
									<DateField label="Due Date" value={dueDate} onChange={(date) => setDueDate(date)} />
								</Stack>
							</LocalizationProvider>
							<IconButton
								color={isFavorite ? 'secondary' : 'default'}
								onClick={() => setIsFavorite(!isFavorite)}
							>
								<StarIcon />
							</IconButton>
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
	);
};

export default TaskForm;

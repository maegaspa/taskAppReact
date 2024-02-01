import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDarkMode } from '../../context/DarkModeContext';
import useStyles from '../../styles/styles';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MenuItem } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import {useLocation, useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import categoryService from "../../services/categoryService";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {useAuthState} from "../../context/AuthContext";


const CategoryForm = (props) => {
	const classes = useStyles();
	const [categoryName, setCategoryName] = useState('');
	const navigate = useNavigate ();
	const [categoryType, setCategoryType] = useState('');
	const [categoryDescription, setCategoryDescription] = useState('');
	const [categoryStartDate, setCategoryStartDate] = useState(null);
	const [categoryEndDate, setCategoryEndDate] = useState(null);
	const [categoryBudget, setCategoryBudget] = useState('');
	const { darkMode, toggleDarkMode } = useDarkMode();
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const { isAuthenticated } = useAuthState();
	const location = useLocation();
	const propsData = location.state;

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? '#303030' : 'white';
		document.body.style.color = darkMode ? 'white' : 'black';
	}, [darkMode]);

	useEffect(() => {
		if (propsData && propsData.selectedCategory) {
			const selectedCategory = propsData.selectedCategory;
			setCategoryName(selectedCategory.title);
			setCategoryDescription(selectedCategory.description);
			setCategoryStartDate(new dayjs(selectedCategory.startDate));
			setCategoryEndDate(new dayjs(selectedCategory.endDate));
			setCategoryBudget(new dayjs(selectedCategory.budget));
		}
	}, [propsData]);
	const handleSaveCategory = async () => {
		try {
			if (!categoryType || !categoryName) {
				setErrorMessage('Please fill in both the type and name fields.');
				setTimeout(() => {
					handleCloseAlert('error');
				}, 5000);
				return;
			}
			const token = Cookies.get();
			if (propsData) {
				const updateCategory = await categoryService.updateCategory(token.token, propsData.selectedCategory['_id'], categoryType, categoryName, categoryDescription, categoryStartDate, categoryEndDate, categoryBudget);
				console.log('Category successfully saved:', updateCategory);
			} else {
				const newCategory = await categoryService.createCategory(token.token, categoryType, categoryName, categoryDescription, categoryStartDate, categoryEndDate, categoryBudget);
				console.log('Category successfully created:', newCategory);
			}

			setCategoryType('');
			setCategoryName('');
			setCategoryDescription('');
			setCategoryStartDate();
			setCategoryEndDate();
			setCategoryBudget();
			setErrorMessage('')
			setSuccessMessage('Category saved successfully.');
			setTimeout(() => {
				handleCloseAlert('success');
			}, 5000);
		} catch (error) {
			console.error('Error saving task:', error);
		}
	};

	const handleCloseAlert = (type) => {
		if (type === 'error') {
			setErrorMessage('');
		} else if (type === 'success') {
			setSuccessMessage('');
		}
	};
	const handleDeleteTask = async () => {
		setShowDeleteConfirmation(true);
	};

	const handleCancelDelete = () => {
		setShowDeleteConfirmation(false);
	};

	const handleCancel =  () => {
		navigate('/tasks');
	};
	const handleConfirmDelete = async () => {
		try {
			const token = Cookies.get();
			if (propsData) {
				await categoryService.deleteCategory(token.token, propsData.selectedCategory['_id']);
			}
			setSuccessMessage('Category successfully deleted.');
			navigate('/tasks')
		}	catch (error) {
			console.error('Error deleting task task:', error);
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
			{showDeleteConfirmation && (
				<Alert severity="warning" className={classes.alert}>
					<AlertTitle>Confirmation</AlertTitle>
					Are you sure you want to delete this task?
					<Button variant="contained" color="primary" onClick={handleConfirmDelete}>Yes</Button>
					<Button variant="contained" color="default" onClick={handleCancelDelete}>No</Button>
				</Alert>
			)}
			<ThemeProvider theme={createTheme({ palette: { type: darkMode ? 'dark' : 'light' } })}>
				<div className={classes.root}>
					<Paper className={`${classes.paper} ${classes.centeredPaper}`} elevation={3}>
						<Typography variant="h5" gutterBottom>
							Create / Edit Category
						</Typography>
						{isAuthenticated && (
							<form>
							<TextField
								select
								label="Category Type *"
								variant="outlined"
								margin="normal"
								fullWidth
								value={categoryType}
								onChange={(e) => setCategoryType(e.target.value)}
							>
								<MenuItem value="Project">Project</MenuItem>
								<MenuItem value="Vacation">Vacation</MenuItem>
								<MenuItem value="Shopping">Shopping</MenuItem>
							</TextField>
							<TextField
								label="Name *"
								variant="outlined"
								margin="normal"
								fullWidth
								value={categoryName}
								onChange={(e) => setCategoryName(e.target.value)}
							/><TextField
								label="Description"
								variant="outlined"
								margin="normal"
								fullWidth
								multiline
								minRows={4}
								value={categoryDescription}
								onChange={(e) => setCategoryDescription(e.target.value)}
							/>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={['DateTimePicker']}>
									<DateTimePicker
										label="Start Date"
										value={categoryStartDate}
										onChange={(date) => setCategoryStartDate(date)}
										className={darkMode ? classes.datePickerDark : ""}
										PopperProps={{ className: darkMode ? classes.datePickerPopperDark : '' }}
									/>
									<DateTimePicker
										label="End Date"
										value={categoryEndDate}
										onChange={(date) => setCategoryEndDate(date)}
										className={darkMode ? classes.datePickerDark : ""}
										PopperProps={{ className: darkMode ? classes.datePickerPopperDark : '' }}
									/>
								</DemoContainer>
							</LocalizationProvider>
							{categoryType === 'Project' && (
								<TextField
									label="Budget"
									variant="outlined"
									margin="normal"
									fullWidth
									value={categoryBudget}
									onChange={(e) => setCategoryBudget(e.target.value)}
								/>
							)}
							<Button
								variant="contained"
								color="primary"
								fullWidth
								className={classes.button}
								onClick={handleSaveCategory}
							>
								Save Category
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
							{propsData && (
								<Button
									variant="outlined"
									fullWidth
									className={classes.deleteButton}
									onClick={handleDeleteTask}
									startIcon={<DeleteIcon />}
								>
									Delete Task
								</Button>
							)}
						</form>
						)}
					</Paper>
				</div>
			</ThemeProvider>
		</>
	);
};

export default CategoryForm;

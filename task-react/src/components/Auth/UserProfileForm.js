import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useAuthState } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';
import useStyles from '../../styles/styles';
import Cookies from 'js-cookie';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Fade from '@mui/material/Fade';
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import userService from "../../services/userService";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {IconButton} from "@material-ui/core";
import authService from "../../services/authService";
import {jwtDecode} from "jwt-decode";


const UserProfileForm = (props) => {
	const classes = useStyles();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [profilePicture, setProfilePicture] = useState(null); // Add state for profile picture
	const navigate = useNavigate ();
	const { darkMode, toggleDarkMode } = useDarkMode();
	const { isAuthenticated } = useAuthState();
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const location = useLocation();
	const propsData = location.state;
	const [showPassword, setShowPassword] = useState(false);


	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? '#303030' : 'white';
		document.body.style.color = darkMode ? 'white' : 'black';
		const token = Cookies.get();
		const decodeToken = jwtDecode(token.token);
		setUsername(decodeToken.username);
	}, [darkMode]);

	const handleSaveUserProfile = async () => {
		try {
			console.log(profilePicture);
			if (!username || !password) {
				setErrorMessage('Please fill in both the username and password fields.');
				setTimeout(() => {
					handleCloseAlert('error');
				}, 5000);
				return;
			}
			const token = Cookies.get();
			const updateTask = await userService.updateUserProfile(token.token, username, password, profilePicture);
			console.log('User successfully saved:', updateTask);

			setTimeout(() => {
				handleCloseAlert('success');
			}, 5000);
		} catch (error) {
			console.error('Error saving user:', error);
		}
	};

	const handleSavePP = async () => {
		try {
			if (!profilePicture) {
				setErrorMessage('Please upload a file [10mo].');
				setTimeout(() => {
					handleCloseAlert('error');
				}, 5000);
				return;
			}
			const token = Cookies.get();
			const updatePP = await userService.saveProfilePicture(token.token, profilePicture);
			console.log('PP successfully saved:', updatePP);

			setTimeout(() => {
				handleCloseAlert('success');
			}, 5000);
		} catch (error) {
			console.error('Error saving PP:', error);
		}
	};

	const handleCloseAlert = (type) => {
		if (type === 'error') {
			setErrorMessage('');
		} else if (type === 'success') {
			setSuccessMessage('');
		}
	};

	const handleCancel =  () => {
		navigate('/user-profile');
	};

	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
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
					<Paper className={`${classes.paperUserProfileForm} ${classes.centeredPaper}`} >
						<Typography variant="h5" gutterBottom>
							{isAuthenticated ? '' : 'Please log again.'}
						</Typography>
						{isAuthenticated && (
							<form>
								<div>
									<Typography variant="subtitle1">Profile Picture</Typography>
									<input
										type="file"
										accept="image/*"
										onChange={(e) => setProfilePicture(e.target.files[0])}
									/>
									<Button
										variant="outlined"
										color="primary"
										onClick={handleSavePP}
									>
										Modify
									</Button>
								</div>
								<TextField
									label="Username"
									variant="outlined"
									margin="normal"
									fullWidth
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
								<TextField
									label="Password"
									type={showPassword ? 'text' : 'password'}
									variant="outlined"
									margin="normal"
									fullWidth
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									InputProps={{
										endAdornment: (
											<IconButton onClick={handleTogglePasswordVisibility} edge="end">
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										),
									}}
								/>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									className={classes.button}
									onClick={handleSaveUserProfile}
								>
									Save
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

export default UserProfileForm;

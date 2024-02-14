import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, IconButton, Avatar } from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import userService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import useStyles from '../../styles/styles';
import Cookies from "js-cookie";
import {useDarkMode} from "../../context/DarkModeContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Navbar from '../Utils/Navbar';


const UserProfile = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const { darkMode, toggleDarkMode } = useDarkMode();
	const [user, setUser] = useState(null);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const token = Cookies.get();
				const userData = await userService.getUserProfile(token.token);
				setUser(userData);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

		fetchUserProfile();
	}, []);

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? '#303030' : 'white';
		document.body.style.color = darkMode ? 'white' : 'black';
	}, [darkMode]);

	const handleModifyProfile = () => {
		navigate('/user-profile/modify');
	};

	return (
		<>
			<Navbar />
			<div className={classes.switchContainer}>
				<FormControlLabel
					control={<Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />}
					label="Dark Mode"
				/>
			</div>
			<ThemeProvider theme={createTheme({ palette: { type: darkMode ? 'dark' : 'light' } })}>
				<Paper className={`${classes.paperUserProfile} ${classes.centeredPaper}`}  elevation={3}>
					<Typography variant="h4" gutterBottom>
						Your Profile
					</Typography>
					{user && (
						<>
							<div>
								<img alt="Profile Picture" src={user.profilePicturePath} className={classes.avatar} />
							</div>
							<Typography variant="h6" gutterBottom>
								Username: {user.username}
							</Typography>
							<Typography variant="h6" gutterBottom>
								Password: {showPassword ? "" : '******'}
							</Typography>
							<Button variant="contained" color="primary" onClick={handleModifyProfile}>
								Modify Profile
							</Button>
						</>
					)}
				</Paper>
			</ThemeProvider>
		</>
	);
};

export default UserProfile;

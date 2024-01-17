import React, {useEffect, useState} from 'react';
import { useAuthDispatch } from '../../context/AuthContext';
import authService from '../../services/authService';
import Cookies from 'js-cookie';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDarkMode } from '../../context/DarkModeContext';
import useStyles from '../../styles/styles';

const Register = () => {
	const classes = useStyles();
	const dispatch = useAuthDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { darkMode, toggleDarkMode } = useDarkMode();

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? '#303030' : 'white';
		document.body.style.color = darkMode ? 'white' : 'black';
	}, [darkMode]);
	const handleRegister = async () => {
		try {
			const token = await authService.register(username, password);

			// Store the token in a secure cookie with expiration
			Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });

			// Dispatch the login action to update the authentication context
			dispatch({ type: 'LOGIN', payload: { token } });
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
							Register
						</Typography>
						<form>
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
								type="password"
								variant="outlined"
								margin="normal"
								fullWidth
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</form>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							className={classes.button}
							onClick={handleRegister}
						>
							Register
						</Button>
					</Paper>
				</div>
			</ThemeProvider>
		</>
	);
};

export default Register;

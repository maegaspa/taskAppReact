import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';
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

const Login = () => {
	const classes = useStyles();
	const dispatch = useAuthDispatch();
	const navigate = useNavigate ();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { darkMode, toggleDarkMode } = useDarkMode();

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? '#303030' : 'white';
		document.body.style.color = darkMode ? 'white' : 'black';
	}, [darkMode]);

	const handleLogin = async () => {
		try {
			const token = await authService.login(username, password);

			// Stocker le token dans un cookie sécurisé avec une expiration
			Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });

			// Dispatch l'action de login pour mettre à jour le contexte d'authentification
			dispatch({ type: 'LOGIN', payload: { token } });

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
			<ThemeProvider  theme={createTheme({ palette: { type: darkMode ? 'dark' : 'light' } })}>
				<div className={classes.root}>
					<Paper className={classes.paper} elevation={3}>
						<Typography variant="h5" gutterBottom>
							Login
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
							onClick={handleLogin}
						>
							Login
						</Button>
						<Button
							variant="outlined"
							color="primary"
							fullWidth className={classes.button}
							component={Link}
							to="/register"
						>
							Register
						</Button>
					</Paper>
				</div>
			</ThemeProvider>
		</>
	);
};

export default Login;
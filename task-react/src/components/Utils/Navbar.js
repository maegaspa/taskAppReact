import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import useStyles from '../../styles/styles';

const Navbar = () => {
	const navigate = useNavigate();
	const classes = useStyles();

	const handleLogout = () => {
		navigate('/login');
	};

	return (
		<AppBar position="static" className={classes.navbar}>
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/tasks">
					<HomeIcon />
				</IconButton>
				<Typography variant="h6" style={{ flexGrow: 1 }}>
					Task Manager
				</Typography>
				<IconButton edge="end" color="inherit" aria-label="logout" onClick={handleLogout}>
					<LogoutIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

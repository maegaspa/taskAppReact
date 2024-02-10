import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@material-ui/core';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import useStyles from '../../styles/styles';

const Navbar = () => {
	const navigate = useNavigate();
	const classes = useStyles();

	const handleLogout = () => {
		navigate('/login');
	};

	return (
		<AppBar className={classes.navbar} >
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/tasks">
					<HomeIcon />
				</IconButton>
				<Typography variant="h6" style={{ flexGrow: 1 }}>
					Task Manager
				</Typography>
				<IconButton color="inherit" aria-label="profile" component={Link} to="/user-profile">
					<Avatar>
						<PersonIcon />
					</Avatar>
				</IconButton>
				<IconButton edge="end" color="inherit" aria-label="logout" onClick={handleLogout}>
					<LogoutIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

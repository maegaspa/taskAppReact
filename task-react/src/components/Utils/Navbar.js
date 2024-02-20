import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@material-ui/core';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import useStyles from '../../styles/styles';
import Cookies from "js-cookie";
import userService from "../../services/userService";

const Navbar = () => {
	const navigate = useNavigate();
	const classes = useStyles();
	const [user, setUser] = useState(null);


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

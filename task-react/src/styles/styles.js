import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
	},
	paper: {
		padding: theme.spacing(4),
		width: 400,
		textAlign: 'center',
	},
	switchContainer: {
		position: 'fixed',
		top: 10,
		right: 10,
	},
	button: {
		marginTop: theme.spacing(2),
	},
}));

export default useStyles;

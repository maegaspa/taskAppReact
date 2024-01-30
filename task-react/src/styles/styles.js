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
	rowParent: {
		display: 'flex',
		textAlign: 'center',
	},
	rowChild: {
		display: 'inline-block',
		verticalAlign: 'middle',
	},
	rowChildStar: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(5),
		display: 'inline-block',
		verticalAlign: 'middle',
	}
}));

export default useStyles;

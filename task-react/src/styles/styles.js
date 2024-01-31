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
	},
	alert: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	listItem: {
		border: '1px solid rgba(0, 0, 0, 0.2)',
		borderRadius: '5px',
		marginBottom: '10px',
		boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
	},
	datePickerDark: {
		"& .MuiInputBase-input": {
			color: "lightgray",
		},
		"& .MuiInputLabel-root": {
			color: "lightgray",
		},
		"& .MuiIconButton-root": {
			color: "lightgray",
		},
		"& .MuiPaper-root": {
			backgroundColor: "#424242",
		},

	},
	datePickerPopperDark: {
		"& .MuiPickersPopper-colorPopup .MuiPaper-root": {
			backgroundColor: '#424242', // KO
		},
		"& .MuiPickersPopper-paper": {
			backgroundColor: '#424242', // KO
		},
	},
}));

export default useStyles;

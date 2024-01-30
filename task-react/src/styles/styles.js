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
	datePickerDark: {
		"& .MuiInputBase-input": {
			color: "lightgray", // Changez la couleur du texte en blanc dans le mode sombre
		},
		"& .MuiInputLabel-root": {
			color: "lightgray", // Changez la couleur du label en blanc dans le mode sombre
		},
		"& .MuiIconButton-root": {
			color: "lightgray", // Changez la couleur de l'icône en blanc dans le mode sombre
		},
		"& .MuiPaper-root": {
			backgroundColor: "#424242", // Change la couleur de fond du calendrier ouvert dans le mode sombre
		},

	},
	datePickerPopperDark: {
		"& .MuiPickersPopper-colorPopup .MuiPaper-root": {
			backgroundColor: '#424242', // Change la couleur de fond du calendrier ouvert dans le mode sombre
		},
		"& .MuiPickersPopper-paper": {
			backgroundColor: '#424242', // Change la couleur de fond du calendrier ouvert dans le mode sombre
		},
	},
}));

export default useStyles;

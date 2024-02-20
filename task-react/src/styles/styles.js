import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		display: 'flex',
		justifyContent: 'top',
	},
	navbar: {
		background: '#424242',
		backgroundColor: '#424242',
		position: 'sticky',
	},
	paper: {
		marginTop: '8%',
		padding: theme.spacing(4),
		width: '80%',
		textAlign: 'center',
	},
	paperUserProfile: {
		marginTop: '8%',
		marginLeft: '20%',
		padding: theme.spacing(4),
		width: '50%',
		textAlign: 'center',
	},
	paperUserProfileForm: {
		marginTop: '8%',
		marginLeft: '9%',
		padding: theme.spacing(5),
		width: '65%',
		textAlign: 'center',
	},
	paperForm: {
		padding: theme.spacing(4),
		width: '80%',
		textAlign: 'center',
	},
	switchContainer: {
		position: 'absolute',
		top: '15%',
		left: '95%',
		transform: 'translate(-70%, -80%)',
	},
	button: {
		marginTop: theme.spacing(2),
	},
	container: {
		marginTop: '50%',
		width: '80%',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	content: {
		width: '100%',
	},
	avatar: {
		width: theme.spacing(10),
		height: theme.spacing(10),
		margin: 'auto',
		marginBottom: theme.spacing(2),
	},
	input: {
		marginRight: theme.spacing(1),
	},
	createButton: {
		marginTop: theme.spacing(2),
	},
	deleteButton: {
		marginTop: theme.spacing(2),
		color: '#fd9796'
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
	centeredPaper: {
		//may try
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
	highlightedCategory: {
		backgroundColor: "#f0f0f0",
		borderLeft: "4px solid #3f51b5",
		paddingLeft: "12px",
	},
	normalCategory: {
		backgroundColor: 'dark',
		borderLeft: "4px solid #3f51b5",
		paddingLeft: "12px",
	},
	circularImageContainer: {
		width: '150px',
		height: '150px',
		overflow: 'hidden',
		borderRadius: '50%',
		marginLeft: '25%',
	},
	circularImage: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	circularImageContainerCentered: {
		width: '150px',
		height: '150px',
		overflow: 'hidden',
		borderRadius: '50%',
	},
	truncateText: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	}
}));

export default useStyles;

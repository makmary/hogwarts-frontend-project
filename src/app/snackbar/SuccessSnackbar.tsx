import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { IDispatchProps, IStateProps } from '@app/snackbar/SuccessSnackbarContainer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		backgroundColor: '#4caf50' ,
		color: 'white',
	},
});

export const SuccessSnackbar: React.FC<IStateProps & IDispatchProps> = ({ snackbarMessage, successSnackbarOpen, clearSnackbar }) => {

	const classes = useStyles();
	function handleClose() {
		clearSnackbar();
	}
	('success-bar');

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			ContentProps={{
				classes: {
					root: classes.root,
				},
			}}
			open={successSnackbarOpen}
			autoHideDuration={2000}
			onClose={handleClose}
			aria-describedby="client-snackbar"
			message={snackbarMessage}
			action={[
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					onClick={handleClose}
				>
				</IconButton>,
			]}
		/>
	);
};

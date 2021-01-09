import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { IDispatchProps, IStateProps } from '@app/snackbar/ErrorSnackbarContainer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		backgroundColor: '#f44336',
		color: 'white',
	},
});


export const ErrorSnackbar: React.FC<IStateProps & IDispatchProps> = ({ snackbarMessage, errorSnackbarOpen, clearSnackbar }) => {

	const classes = useStyles();
	function handleClose() {
		clearSnackbar();
	}

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
			open={errorSnackbarOpen}
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

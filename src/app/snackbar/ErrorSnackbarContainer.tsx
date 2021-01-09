import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '@app/reducers';

import { ErrorSnackbar } from '@app/snackbar/ErrorSnackbar';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: IRootState) => ({
	snackbarMessage: state.snackbars.snackbarMessage,
	errorSnackbarOpen: state.snackbars.errorSnackbarOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	clearSnackbar: () => dispatch(SnackbarCreators.clearSnackbar()),
});

export const ErrorSnackbarContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ErrorSnackbar);

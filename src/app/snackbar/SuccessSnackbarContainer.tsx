import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '@app/reducers';

import { SuccessSnackbar } from '@app/snackbar/SuccessSnackbar';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: IRootState) => ({
	snackbarMessage: state.snackbars.snackbarMessage,
	successSnackbarOpen: state.snackbars.successSnackbarOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	clearSnackbar: () => dispatch(SnackbarCreators.clearSnackbar()),
});

export const SuccessSnackbarContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SuccessSnackbar);

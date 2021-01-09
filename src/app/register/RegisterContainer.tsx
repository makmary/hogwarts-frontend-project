import { connect } from 'react-redux';

import { IRootState } from '@app/reducers';
import { Registration } from './Registration';
import { Dispatch } from 'redux';
import { RegisterCreators } from './duck/actions';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: IRootState) => ({
	isAuth: state.auth.isAuth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	register: (email: string, username: string, password: string, lastName: string,
		firstName: string, middleName: string, phone: string, studyGroup: number, repeatPassword: string) =>
		dispatch(RegisterCreators.register({ email, username, password, lastName, firstName, middleName, phone, studyGroup, repeatPassword })),
	showSuccessSnackbar: (message: string) => dispatch(SnackbarCreators.showSuccessSnackbar(message)),
	showErrorSnackbar: (message: string) => dispatch(SnackbarCreators.showErrorSnackbar(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

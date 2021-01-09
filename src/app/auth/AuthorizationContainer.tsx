import { connect } from 'react-redux';

import { Authorization } from '@app/auth/Authorization';
import { Dispatch } from 'redux';
import { AuthCreators } from '@app/auth/duck/actions';
import { IRootState } from '@app/reducers';

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: IRootState) => ({
	isAuth: state.auth.isAuth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	authorize: (username: string, password: string) => dispatch(AuthCreators.authorize({ username, password })),
});

export const AuthorizationContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Authorization);

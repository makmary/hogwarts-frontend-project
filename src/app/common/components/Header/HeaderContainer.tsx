import { Header } from '@app/common/components/Header/Header';
import { IRootState } from '@app/reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AuthCreators } from '@app/auth/duck/actions';

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: IRootState) => ({
	username: state.auth.username,
	role: state.auth.role,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getRole: () => dispatch(AuthCreators.getRole()),
	logout: () => dispatch(AuthCreators.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);


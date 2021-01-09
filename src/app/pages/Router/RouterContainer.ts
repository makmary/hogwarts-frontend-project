import { IRootState } from '@app/reducers';
import { connect } from 'react-redux';
import { Router } from '@app/pages/Router/Router';

export type IStateProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IRootState) => ({
	isAuth: state.auth.isAuth,
});

export const RouterContainer = connect(
	mapStateToProps,
	null,
)(Router);

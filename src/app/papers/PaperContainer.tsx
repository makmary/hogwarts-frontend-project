import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '@app/reducers';

import { PaperCreators } from '@app/papers/duck/actions';
import { PaperList } from './PaperList';
import { AuthCreators } from '@app/auth/duck/actions';
import { StatusCreators } from '@app/status/duck/actions';
import { GroupsCreators } from '@app/groups/duck/actions';

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: IRootState) => ({
	role: state.auth.role,
	itemsPapers: state.papers.items,
	status: state.papers.status,
	groupsList: state.groups.groups,
	statusesList: state.status.statuses,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getStatuses: () => dispatch(StatusCreators.getStatuses()),
	getGroups: () => dispatch(GroupsCreators.getGroups()),
	getRole: () => dispatch(AuthCreators.getRole()),
	getPapersList: () => dispatch(PaperCreators.paperGetList()),
});

export const PaperContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(PaperList);

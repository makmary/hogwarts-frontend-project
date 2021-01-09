import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '@app/reducers';

import { TeacherCreators } from '@app/teacher/duck/actions';
import { WorkCreators } from '@app/work/duck/actions';
import { FeedCreators } from '@app/feed/duck/actions';
import WorkCard from './WorkCard';

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: IRootState) => ({
	workInfo: state.work.workInfo,
	statusId: state.work.statusId,
	role: state.auth.role,
	teacherList: state.teacher.items,
	feeds: state.feed.feeds,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getWork: (id: number) => dispatch(WorkCreators.getWork({ id })),
	getFeed: (id: number) => dispatch(FeedCreators.getFeed({ id })),
	getTeacherList: () => dispatch(TeacherCreators.teacherGetList()),
});

export const WorkCardContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(WorkCard);

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '@app/reducers';

import { PaperForm } from './PaperForm';
import { TeacherCreators } from '@app/teacher/duck/actions';
import { WorkCreators } from '@app/work/duck/actions';

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: IRootState) => ({
	itemsTeachers: state.teacher.items,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	postWork: (description: string, theme: string, advisory_id: number) => dispatch(WorkCreators.createWork({ description, theme, advisory_id })),
	getTeacherList: () => dispatch(TeacherCreators.teacherGetList()),
});

export const PaperFormContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(PaperForm);

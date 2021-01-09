import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '@app/reducers';

import { WorkCreators } from '@app/work/duck/actions';
import { WorkButtons } from './WorkButtons';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: IRootState) => ({
	workStatus: state.work.statusId,
	role: state.auth.role,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getWork: (id: number) => dispatch(WorkCreators.getWork({ id })),
	deleteWork: (researchPaper_id: number) => dispatch(WorkCreators.deleteWork({ researchPaper_id })),
	editWork: (id: number, consultant_id: number, theme: string, objective: string, results: string, content: string, sources: string) =>
		dispatch(WorkCreators.editWork({ id, consultant_id, theme, objective, results, content, sources })),
	popWork: (researchPaper_id: number) => dispatch(WorkCreators.popWork({ researchPaper_id })),
	pushWork: (researchPaper_id: number) => dispatch(WorkCreators.pushWork({ researchPaper_id })),
	postComment: (researchPaper_id: number, text: string) => dispatch(WorkCreators.commentWork({ researchPaper_id, text })),
	returnWork: (researchPaper_id: number) => dispatch(WorkCreators.returnWork({ researchPaper_id })),
	returnWorkReport: (researchPaper_id: number) => dispatch(WorkCreators.returnWorkReport({ researchPaper_id })),
	showErrorSnackbar: (message: string) => dispatch(SnackbarCreators.showErrorSnackbar(message)),
	showSuccessSnackbar: (message: string) => dispatch(SnackbarCreators.showSuccessSnackbar(message)),
});

export const WorkButtonsContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(WorkButtons);

import { IWork } from '@app/work/interfaces/IWork';
import { IWorkInfo } from '../interfaces/IWorkInfo';

export enum Types {
	GET_WORK = 'GET_WORK',
	GET_WORK_SUCCESS = 'GET_WORK_SUCCESS',
	GET_WORK_FAILURE = 'GET_WORK_FAILURE',

	WORK_CREATE = 'WORK_CREATE',
	WORK_CREATE_SUCCESS = 'WORK_CREATE_SUCCESS',

	WORK_COMMENT = 'WORK_COMMENT',
	WORK_COMMENT_SUCCESS = 'WORK_COMMENT_SUCCESS',
	WORK_COMMENT_FAILURE = 'WORK_COMMENT_FAILURE',

	WORK_DELETE = 'WORK_DELETE',
	WORK_DELETE_SUCCESS = 'WORK_DELETE_SUCCESS',
	WORK_DELETE_FAILURE = 'WORK_DELETE_FAILURE',

	WORK_EDIT = 'WORK_EDIT',
	WORK_EDIT_FAILURE = 'WORK_EDIT_FAILURE',

	WORK_POP = 'WORK_POP',
	WORK_POP_SUCCESS = 'WORK_POP_SUCCESS',
	WORK_POP_FAILURE = 'WORK_POP_FAILURE',

	WORK_PUSH = 'WORK_PUSH',
	WORK_PUSH_SUCCESS = 'WORK_PUSH_SUCCESS',
	WORK_PUSH_FAILURE = 'WORK_PUSH_FAILURE',

	WORK_RETURN = 'WORK_RETURN',
	WORK_RETURN_SUCCESS = 'WORK_RETURN_SUCCESS',
	WORK_RETURN_FAILURE = 'WORK_RETURN_FAILURE',

	WORK_MARK = 'WORK_MARK',
	WORK_MARK_SUCCESS = 'WORK_MARK_SUCCESS',
	WORK_MARK_FAILURE = 'WORK_MARK_FAILURE',

	WORK_SEND_PRESENTATION = 'WORK_SEND_PRESENTATION',
	WORK_GET_PRESENTATION = 'WORK_GET_PRESENTATION',

	WORK_SEND_REPORT = 'WORK_SEND_REPORT',
	WORK_GET_REPORT = 'WORK_GET_REPORT',

	WORK_RETURN_REPORT = 'WORK_RETURN_REPORT',
	WORK_REVIEW = 'WORK_REVIEW',
}

export const WorkCreators = {

	getWork: ({ id }: IWorkInfo) => ({
		type: Types.GET_WORK,
		id,
	} as const),
	getWorkSuccess: ({ statusId, workInfo }: IWork) => ({
		type: Types.GET_WORK_SUCCESS,
		workInfo,
		statusId,
	} as const),
	getWorkFailure: ({ statusId, error }: IWork) => ({
		type: Types.GET_WORK_FAILURE,
		statusId,
		error,
	} as const),

	createWork: ({ description, theme, advisory_id }: IWork) => ({
		type: Types.WORK_CREATE,
		description,
		theme,
		advisory_id,
	} as const),
	createWorkSuccess: ({ response }: IWork) => ({
		type: Types.WORK_CREATE_SUCCESS,
		response,
	} as const),

	editWork: ({ id, consultant_id, theme, objective, results, content, sources }: IWorkInfo) => ({
		type: Types.WORK_EDIT,
		id, consultant_id, theme, objective, results, content, sources,
	} as const),

	editWorkFailure: ({ error }: IWork) => ({
		type: Types.WORK_EDIT_FAILURE,
		error,
	} as const),

	commentWork: ({ researchPaper_id, text }: {researchPaper_id: number; text: string}) => ({
		type: Types.WORK_COMMENT,
		researchPaper_id,
		text,
	} as const),
	commentWorkSuccess: () => ({
		type: Types.WORK_COMMENT_SUCCESS,
	} as const),
	commentWorkFailure: ({ error }: IWork) => ({
		type: Types.WORK_COMMENT_FAILURE,
		error,
	} as const),

	deleteWork: ({ researchPaper_id }: IWork) => ({
		type: Types.WORK_DELETE,
		researchPaper_id,
	} as const),
	deleteWorkSuccess: () => ({
		type: Types.WORK_DELETE_SUCCESS,
	} as const),
	deleteWorkFailure: ({ error }: IWork) => ({
		type: Types.WORK_DELETE_FAILURE,
		error,
	} as const),

	pushWork: ({ researchPaper_id }: IWork) => ({
		type: Types.WORK_PUSH,
		researchPaper_id,
	} as const),
	pushWorkSuccess: () => ({
		type: Types.WORK_PUSH_SUCCESS,
	} as const),
	pushWorkFailure: ({ error }: IWork) => ({
		type: Types.WORK_PUSH_FAILURE,
		error,
	} as const),

	popWork: ({ researchPaper_id }: IWork) => ({
		type: Types.WORK_POP,
		researchPaper_id,
	} as const),
	popWorkSuccess: () => ({
		type: Types.WORK_POP_SUCCESS,
	} as const),
	popWorkFailure: ({ error }: IWork) => ({
		type: Types.WORK_POP_FAILURE,
		error,
	} as const),

	returnWork: ({ researchPaper_id }: IWork) => ({
		type: Types.WORK_RETURN,
		researchPaper_id,
	} as const),
	returnWorkSuccess: () => ({
		type: Types.WORK_RETURN_SUCCESS,
	} as const),
	returnWorkFailure: ({ error }: IWork) => ({
		type: Types.WORK_RETURN_FAILURE,
		error,
	} as const),

	markWork: ({ researchPaper_id, letter, mark }: IWork) => ({
		type: Types.WORK_MARK,
		researchPaper_id,
		letter,
		mark,
	} as const),
	markWorkSuccess: () => ({
		type: Types.WORK_MARK_SUCCESS,
	} as const),
	markWorkFailure: ({ error }: IWork) => ({
		type: Types.WORK_MARK_FAILURE,
		error,
	} as const),

	sendWorkPresentation: ({ researchPaper_id }: IWork) => ({
		type: Types.WORK_SEND_PRESENTATION,
		researchPaper_id,
	} as const),

	getWorkPresentation: ({ researchPaper_id }: IWork) => ({
		type: Types.WORK_GET_PRESENTATION,
		researchPaper_id,
	} as const),

	sendWorkReport: ({ researchPaper_id, reportFile }: IWork) => ({
		type: Types.WORK_SEND_REPORT,
		researchPaper_id,
		reportFile,
	} as const),

	getWorkReport: ({ researchPaper_id }: IWork) => ({
		type: Types.WORK_SEND_REPORT,
		researchPaper_id,
	} as const),

	returnWorkReport: ({ researchPaper_id }: IWork) => ({
		type: Types.WORK_RETURN_REPORT,
		researchPaper_id,
	} as const),

	sendWorkReview: ({ researchPaper_id, review }: IWork) => ({
		type: Types.WORK_REVIEW,
		researchPaper_id,
		review,
	} as const),
};



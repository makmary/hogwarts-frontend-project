import { WorkCreators, Types } from '@app/work/duck/actions';
import { IWorkInfo } from '@app/work/interfaces/IWorkInfo';

export interface IState {
	error: string;
	statusId: number;
	workInfo: IWorkInfo;
	response: {type: string; message: string};
}

const initialState: IState = {
	statusId: 0,
	workInfo: {},
	error: '',
	response: { type: '', message: '' },
};

type ActionTypes = ReturnType<InferValueTypes<typeof WorkCreators>>;

export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.GET_WORK && { ...state }
	||
	action.type === Types.GET_WORK_SUCCESS && { ...state, statusId: action.statusId, workInfo: action.workInfo }
	||
	action.type === Types.GET_WORK_FAILURE && { ...state, error: action.error }
	||
	action.type === Types.WORK_CREATE && { ...state }
	||
	action.type === Types.WORK_CREATE_SUCCESS && { ...state, response: action.response }
	||
	action.type === Types.WORK_EDIT && { ...state }
	||
	action.type === Types.WORK_COMMENT && { ...state }
	||
	action.type === Types.WORK_COMMENT_SUCCESS && { ...state }
	||
	action.type === Types.WORK_COMMENT_FAILURE && { ...state, error: action.error }
	||
	action.type === Types.WORK_DELETE && { ...state }
	||
	action.type === Types.WORK_DELETE_SUCCESS && { ...state }
	||
	action.type === Types.WORK_DELETE_FAILURE && { ...state, error: action.error }
	||
	action.type === Types.WORK_POP && { ...state }
	||
	action.type === Types.WORK_POP_SUCCESS && { ...state }
	||
	action.type === Types.WORK_POP_FAILURE && { ...state, error: action.error }
	||
	action.type === Types.WORK_PUSH && { ...state }
	||
	action.type === Types.WORK_PUSH_SUCCESS && { ...state }
	||
	action.type === Types.WORK_PUSH_FAILURE && { ...state, error: action.error }
	||
	action.type === Types.WORK_RETURN && { ...state }
	||
	action.type === Types.WORK_RETURN_SUCCESS && { ...state }
	||
	action.type === Types.WORK_RETURN_FAILURE && { ...state, error: action.error }
	||
	action.type === Types.WORK_MARK && { ...state }
	||
	action.type === Types.WORK_MARK_SUCCESS && { ...state }
	||
	action.type === Types.WORK_MARK_FAILURE && { ...state, error: action.error }
	||
	action.type === Types.WORK_GET_PRESENTATION && { ...state }
	||
  state
;

import { StatusCreators, Types } from '@app/status/duck/actions';
import { IStatus } from '@app/status/interfaces/IStatus';

export interface IState {
	statuses: IStatus[];
}

const initialState: IState = {
	statuses: [],
};

type ActionTypes = ReturnType<InferValueTypes<typeof StatusCreators>>;

export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.GET_STATUSES_REQUEST && { ...state }
    ||
    action.type === Types.GET_STATUSES && { ...state, statuses: action.statuses }
    ||
    state
;

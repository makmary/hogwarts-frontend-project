import { RegisterCreators, Types } from '@app/register/duck/actions';

export interface IState {
	isSent: boolean;
	error: string;
}

const initialState: IState = {
	isSent: false,
	error: '',
};

type ActionTypes = ReturnType<InferValueTypes<typeof RegisterCreators>>;

// Takes care of changing the application state
export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.REGISTER_REQUEST && { ...state, }
	||
  action.type === Types.REGISTER_SUCCESS && { ...state, isSent: action.isSent }
  ||
  action.type === Types.REGISTER_FAILURE && { ...state, isSent: action.isSent, error: action.error }
  ||
  state
;

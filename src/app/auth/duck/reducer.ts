import { AuthCreators, Types } from '@app/auth/duck/actions';

export interface IState {
	isAuth: boolean;
	role: number;
	username: string;
}

const initialState: IState = {
	isAuth: Boolean(localStorage.getItem('token')),
	role: 0,
	username: '',
};

type ActionTypes = ReturnType<InferValueTypes<typeof AuthCreators>>;

export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.AUTH_REQUEST && { ...state }
	||
	action.type === Types.ROLE_REQUEST && { ...state }
	||
	action.type === Types.ROLE_SUCCESS && { ...state, role: action.role, username: action.username, isAuth: action.isAuth }
	||
	state
;

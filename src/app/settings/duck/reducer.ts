import { SettingsCreators, Types } from '@app/settings/duck/actions';

export interface IState {
	data: Record<string, string>;
}

const initialState: IState = {
	data: null,
};

type ActionTypes = ReturnType<InferValueTypes<typeof SettingsCreators>>;

// Takes care of changing the application state
export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.CHANGE_PASSWORD_REQUEST && { ...state }
    ||
    action.type === Types.CHANGE_PASSWORD && { ...state, data: action.data }
    ||
    state
;

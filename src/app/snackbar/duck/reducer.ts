import { SnackbarCreators, Types } from '@app/snackbar/duck/actions';

export interface IState {
	successSnackbarOpen: boolean;
	errorSnackbarOpen: boolean;
	snackbarMessage: string;
}

const initialState: IState = {
	successSnackbarOpen: false,
	errorSnackbarOpen: false,
	snackbarMessage: '',
};

type ActionTypes = ReturnType<InferValueTypes<typeof SnackbarCreators>>;

// Takes care of changing the application state
export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.SNACKBAR_SUCCESS && {
		...state,
		successSnackbarOpen: true,
		snackbarMessage: action.message,
	}
    ||
	action.type === Types.SNACKBAR_ERROR && {
		...state,
		errorSnackbarOpen: true,
		snackbarMessage: action.message,
	}
	||
    action.type === Types.SNACKBAR_CLEAR && {
    	...state,
    			errorSnackbarOpen: false,
    			successSnackbarOpen: false,
    			snackbarMessage: '',
    }
    ||
    state
;

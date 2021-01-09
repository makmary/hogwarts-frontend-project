export enum Types {
	SNACKBAR_SUCCESS = 'SNACKBAR_SUCCESS',
	SNACKBAR_ERROR = 'SNACKBAR_ERROR',
	SNACKBAR_CLEAR = 'SNACKBAR_CLEAR',
}

export const SnackbarCreators = {
	showSuccessSnackbar: (message: string) => ({
		type: Types.SNACKBAR_SUCCESS,
		message,
	} as const),
	showErrorSnackbar: (message: string) => ({
		type: Types.SNACKBAR_ERROR,
		message,
	} as const),
	clearSnackbar: () => ({
		type: Types.SNACKBAR_CLEAR,
	} as const),
};

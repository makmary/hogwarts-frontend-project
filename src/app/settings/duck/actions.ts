import { IChangePassword } from '@app/settings/interfaces/IChangePassword';

export enum Types {
	CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST',
	CHANGE_PASSWORD= 'CHANGE_PASSWORD',
}

export const SettingsCreators = {
	changePassword: ({ oldPassword, newPassword, confirmPassword } : { oldPassword: string; newPassword: string; confirmPassword: string }) => ({
		type: Types.CHANGE_PASSWORD_REQUEST,
		oldPassword,
		newPassword,
		confirmPassword,
	} as const),
	changePasswordSuccess: ({ data } : IChangePassword) => ({
		type: Types.CHANGE_PASSWORD,
		data,
	} as const),
};

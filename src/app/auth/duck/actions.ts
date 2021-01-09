import { IAuth } from '@app/auth/interfaces/IAuth';

export enum Types {
	AUTH_REQUEST = 'AUTH_REQUEST',
	LOGOUT = 'LOGOUT',
	ROLE_REQUEST = 'ROLE_REQUEST',
	ROLE_SUCCESS = 'ROLE_SUCCESS',
}

export const AuthCreators = {
	authorize: ({ username, password }: { username: string, password: string }) => ({
		type: Types.AUTH_REQUEST,
		username,
		password,
	} as const),
	logOut: () => ({
		type: Types.LOGOUT,
	} as const),
	getRole: () => ({
		type: Types.ROLE_REQUEST,
	} as const),
	getRoleSuccess: ({ role, username, isAuth }: IAuth) => ({
		type: Types.ROLE_SUCCESS,
		role,
		username,
		isAuth,
	} as const),
};

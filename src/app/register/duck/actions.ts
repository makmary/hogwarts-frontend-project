import { IRegister } from '@app/register/interfaces/IRegister';

export enum Types {
	REGISTER_REQUEST = 'REGISTER_REQUEST',
	REGISTER_SUCCESS = 'REGISTER_SUCCESS',
	REGISTER_FAILURE = 'REGISTER_FAILURE',
}

export const RegisterCreators = {
	register: ({ email, username, password, lastName, firstName, middleName, phone, studyGroup , repeatPassword }:
				   {
				   	email: string; username: string; password: string;
				    lastName: string; firstName: string; middleName: string;
				    phone: string; studyGroup: number; repeatPassword: string;
				   }) => ({
		type: Types.REGISTER_REQUEST,
		email,
		username,
		password,
		lastName,
		firstName,
		middleName,
		phone,
		studyGroup,
		repeatPassword,
	} as const),
	registerSuccess: ({ isSent }: IRegister) => ({
		type: Types.REGISTER_SUCCESS,
		isSent,
	} as const),
	registerFailure: ({ isSent, error }: IRegister) => ({
		type: Types.REGISTER_FAILURE,
		isSent,
		error,
	} as const),
};

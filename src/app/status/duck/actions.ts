import { IStatus } from '@app/status/interfaces/IStatus';

export enum Types {
	GET_STATUSES_REQUEST = 'GET_STATUSES_REQUEST',
	GET_STATUSES = 'GET_STATUSES',
}

export const StatusCreators = {
	getStatuses: () => ({
		type: Types.GET_STATUSES_REQUEST,
	} as const),
	getStatusesSuccess: (statuses: IStatus[]) => ({
		type: Types.GET_STATUSES,
		statuses,
	} as const),
};

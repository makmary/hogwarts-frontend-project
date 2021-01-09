import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';
import { ITeacher } from '../interfaces/ITeacher';

export enum Types {
	TEACHER_GET_LIST = 'TEACHER_GET_LIST',
	TEACHER_REFRESH_LIST = 'TEACHER_REFRESH_LIST',
	TEACHER_REFRESH_FETCH_STATUS = 'TEACHER_REFRESH_FETCH_STATUS',
}

export const TeacherCreators = {
	teacherGetList: () => ({
		type: Types.TEACHER_GET_LIST,
	} as const),
	teacherRefreshList: (teachers: ITeacher[]) => ({
		type: Types.TEACHER_REFRESH_LIST,
		items: teachers,
	} as const),
	teacherRefreshFetchStatus: (status: FetchingStatuses) => ({
		type: Types.TEACHER_REFRESH_FETCH_STATUS,
		status,
	} as const),
};

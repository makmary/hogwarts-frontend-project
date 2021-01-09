import { TeacherCreators, Types } from '@app/teacher/duck/actions';

import { ITeacher } from '@app/teacher/interfaces/ITeacher';
import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';

export interface IState {
	items: ITeacher[];
	status: FetchingStatuses;
}

const initialState: IState = {
	items: [],
	status: FetchingStatuses.NONE,
};

type ActionTypes = ReturnType<InferValueTypes<typeof TeacherCreators>>;

export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.TEACHER_REFRESH_LIST && {
		...state,
		items: action.items,
		status: FetchingStatuses.SUCCESS,
	} ||
  action.type === Types.TEACHER_REFRESH_FETCH_STATUS && {
  	...state,
  	status: action.status,
  } ||
  state
;

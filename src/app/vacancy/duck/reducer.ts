import { VacancyCreators, Types } from '@app/vacancy/duck/actions';

import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';
import { IVacancy } from '@app/vacancy/interfaces/IVacancy';

export interface IState {
	items: IVacancy[];
	status: FetchingStatuses;
}

const initialState: IState = {
	items: [],
	status: FetchingStatuses.NONE,
};

type ActionTypes = ReturnType<InferValueTypes<typeof VacancyCreators>>;

export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.VACANCY_REFRESH_LIST && {
		...state,
		items: action.items,
		status: FetchingStatuses.SUCCESS,
	} ||
  action.type === Types.VACANCY_REFRESH_FETCH_STATUS && {
  	...state,
  	status: action.status,
  } ||
  state
;

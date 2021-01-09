import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';
import { IVacancy } from '../interfaces/IVacancy';

export enum Types {
	VACANCY_GET_LIST = 'VACANCY_GET_LIST',
	VACANCY_REFRESH_LIST = 'VACANCY_REFRESH_LIST',
	VACANCY_REFRESH_FETCH_STATUS = 'VACANCY_REFRESH_FETCH_STATUS',
}

export const VacancyCreators = {
	vacancyGetList: () => ({
		type: Types.VACANCY_GET_LIST,
	} as const),
	vacancyRefreshList: (vacancies: IVacancy[]) => ({
		type: Types.VACANCY_REFRESH_LIST,
		items: vacancies,
	} as const),
	vacancyRefreshFetchStatus: (status: FetchingStatuses) => ({
		type: Types.VACANCY_REFRESH_FETCH_STATUS,
		status,
	} as const),
};

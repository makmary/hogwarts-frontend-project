import { all, put, takeEvery, call, ForkEffect, AllEffect, delay } from 'redux-saga/effects';

import { VacancyCreators, Types } from '@app/vacancy/duck/actions';
import { fetchData } from '@app/common/helpers/fetchData';
import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';
import { push } from 'connected-react-router';
import { IVacancy } from '@app/vacancy/interfaces/IVacancy';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

export function* onGetVacancyList(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.VACANCY_GET_LIST, refreshVacancies);
}

function* refreshVacancies() {
	yield put(VacancyCreators.vacancyRefreshFetchStatus(FetchingStatuses.IN_PROGRESS));

	if (localStorage.getItem('token')) {
		const authOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};

		const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, '/api/vacancies/', authOptions);

		if (response.status === 400) {
			yield put(VacancyCreators.vacancyRefreshFetchStatus(FetchingStatuses.FAILED));
			yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			yield put(push('/'));
			location.reload();
		} else {
			const data: { message: IVacancy[] } = yield response.json();
			console.log(data.message);
			yield put(VacancyCreators.vacancyRefreshList(data.message));
		}
	} else {
		location.reload();
	}
}

export function* saga(): Generator<AllEffect<Generator<ForkEffect<never>, void>>, void> {
	yield all([onGetVacancyList()]);
}

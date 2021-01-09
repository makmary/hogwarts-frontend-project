import { all, put, takeEvery, call, ForkEffect, AllEffect, delay } from 'redux-saga/effects';

import { PaperCreators, Types } from '@app/papers/duck/actions';
import { fetchData } from '@app/common/helpers/fetchData';
import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

export function* onGetList(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.PAPER_GET_LIST, refreshPapers);
}

function* refreshPapers() {
	yield put(PaperCreators.paperRefreshFetchStatus(FetchingStatuses.IN_PROGRESS));

	if (localStorage.getItem('token')) {
		const authOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};

		const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, '/api/paperList/', authOptions);
		if (response.status === 400) {
			yield put(PaperCreators.paperRefreshFetchStatus(FetchingStatuses.FAILED));
			yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			yield put(PaperCreators.paperRefreshFetchStatus(FetchingStatuses.FAILED));
			localStorage.removeItem('token');
			location.reload();
		} else {
			const data = yield response.json();
			const sortedData = data.message
				.sort(
					(a, b) => b.id - a.id);
			yield put(PaperCreators.paperRefreshList(sortedData));
			yield put(PaperCreators.paperRefreshFetchStatus(FetchingStatuses.SUCCESS));
		}
	} else {
		location.reload();
	}

}

export function* saga(): Generator<AllEffect<Generator<ForkEffect<never>, void>>, void> {
	yield all([onGetList()]);
}

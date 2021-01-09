import { all, call, put, takeEvery, ForkEffect, AllEffect } from 'redux-saga/effects';
import { NewsCreators, Types } from '@app/news/duck/actions';
import { fetchData } from '@app/common/helpers/fetchData';
import { INews } from '../interfaces/INews';
import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

export function* onGetNews(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.GET_NEWS, getNews);
}

function* getNews() {

	if (localStorage.getItem('token')) {
		const options = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};

		const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, '/api/post/all/', options);
		if (response.status === 400) {
			yield put(SnackbarCreators.showErrorSnackbar('400 error'));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			yield put(NewsCreators.newsRefreshFetchStatus(FetchingStatuses.FAILED));
			localStorage.removeItem('token');
			location.reload();
		} else {
			const data: { message: INews[] } = yield response.json();
			yield put(NewsCreators.getNewsSuccess(data.message));
			yield put(NewsCreators.newsRefreshFetchStatus(FetchingStatuses.SUCCESS));
		}
	} else {
		location.reload();
	}
}

export function* saga(): Generator<AllEffect<Generator<ForkEffect<never>, void>>, void> {
	yield all([onGetNews()]);
}

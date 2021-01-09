import { all, call, put, takeEvery, ForkEffect, AllEffect } from 'redux-saga/effects';
import { FeedCreators, Types } from '@app/feed/duck/actions';
import { fetchData } from '@app/common/helpers/fetchData';
import { IFeed } from '@app/feed/interfaces/IFeed';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

export function* onGetFeed(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.GET_FEED, getFeed);
}

function* getFeed({ id }: ReturnType<typeof FeedCreators.getFeed>) {
	if (localStorage.getItem('token')) {

		const options = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};

		const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/feed/?id=${id}`, options);
		if (response.status === 400) {
			yield put(SnackbarCreators.showErrorSnackbar('400 error'));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			location.reload();
		} else {
			const data: { message: IFeed[] } = yield response.json();
			yield put(FeedCreators.getFeedSuccess(data.message));
		}
	} else {
		location.reload();
	}
}

export function* saga(): Generator<AllEffect<Generator<ForkEffect<never>, void>>, void> {
	yield all([onGetFeed()]);
}

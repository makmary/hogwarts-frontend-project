import { all, call, ForkEffect, put, takeEvery, AllEffect } from 'redux-saga/effects';
import { StatusCreators, Types } from '@app/status/duck/actions';
import { fetchData } from '@app/common/helpers/fetchData';
import { SnackbarCreators } from '@app/snackbar/duck/actions';
import { IStatus } from '../interfaces/IStatus';

export function* onGetStatuses(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.GET_STATUSES_REQUEST, getStatuses);
}

function* getStatuses() {

	if (localStorage.getItem('token')) {

		const postOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};

		const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, '/api/allStates/', postOptions);
		if (response.status === 400) {
			yield put(SnackbarCreators.showErrorSnackbar('400 error'));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			location.reload();
		} else {
			const data: { message?: IStatus[]; type: string } = yield response.json();
      data.message.sort(function(a, b){return a.id-b.id});
			yield put(StatusCreators.getStatusesSuccess(data.message));
		}
	} else {
		location.reload();
	}
}

export function* saga(): Generator<AllEffect<Generator<ForkEffect<never>, void>>, void> {
	yield all([onGetStatuses()]);
}

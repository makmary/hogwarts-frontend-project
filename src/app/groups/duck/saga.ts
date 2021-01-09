import { all, call, ForkEffect, put, takeEvery, AllEffect } from 'redux-saga/effects';
import { GroupsCreators, Types } from '@app/groups/duck/actions';
import { fetchData } from '@app/common/helpers/fetchData';
import { SnackbarCreators } from '@app/snackbar/duck/actions';
import { IGroups } from '../interfaces/IGroups';

export function* onGetGroups(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.GET_GROUPS_REQUEST, getGroups);
}

function* getGroups() {

	if (localStorage.getItem('token')) {

		const postOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};

		const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, '/api/groupList/', postOptions);
		if (response.status === 400) {
			yield put(SnackbarCreators.showErrorSnackbar('400 error'));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			location.reload();
		} else {
			const data: { message?: IGroups[]; type: string } = yield response.json();
			yield put(GroupsCreators.getGroupsSuccess(data.message));
		}
	} else {
		location.reload();
	}
}

export function* saga(): Generator<AllEffect<Generator<ForkEffect<never>, void>>, void> {
	yield all([onGetGroups()]);
}

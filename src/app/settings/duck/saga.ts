import { all, call, ForkEffect, put, takeEvery, AllEffect } from 'redux-saga/effects';
import { SettingsCreators, Types } from '@app/settings/duck/actions';
import { fetchData } from '@app/common/helpers/fetchData';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

export function* onChangePassword(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.CHANGE_PASSWORD_REQUEST, changePassword);
}

const delay = time => new Promise(resolve => setTimeout(resolve, time));

function* changePassword({ oldPassword, newPassword, confirmPassword }: ReturnType<typeof SettingsCreators.changePassword>) {

	if (localStorage.getItem('token')) {

		if (confirmPassword !== newPassword) {
			yield put(SnackbarCreators.showErrorSnackbar('Пароли не совпадают.'));
		} else if (oldPassword === '' || newPassword === '') {
			oldPassword === '' && (yield put(SnackbarCreators.showErrorSnackbar('Введите Ваш старый пароль.'))) && (yield delay(3000));
			newPassword === '' && (yield put(SnackbarCreators.showErrorSnackbar('Введите Ваш новый пароль.'))) && (yield delay(3000));
		} else {
			const postOptions = {
				body: JSON.stringify({ oldPassword, newPassword }),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, 'api/user/password/change/', postOptions);
			if (response.status === 400) {
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (response.status === 401 || response.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: string; type: string } = yield response.json();
				yield put(SettingsCreators.changePasswordSuccess({ data }));
				if (data.type === 'success') {
					yield put(SnackbarCreators.showSuccessSnackbar(data.message));
					yield call(delay, 2000);
					localStorage.removeItem('token');
					location.reload();
				} else {
					yield put(SnackbarCreators.showErrorSnackbar(data.message));
				}
			}
		}
	} else {
		location.reload();
	}
}

export function* saga(): Generator<AllEffect<Generator<ForkEffect<never>, void>>, void> {
	yield all([onChangePassword()]);
}

import { all, call, put, takeEvery, ForkEffect, AllEffect } from 'redux-saga/effects';
import { AuthCreators, Types } from '@app/auth/duck/actions';
import { fetchData } from '@app/common/helpers/fetchData';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

export function* onAuthorize(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.AUTH_REQUEST, authorize);
}

export function* onLogOut(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.LOGOUT, logout);
}

export function* onGetRole(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.ROLE_REQUEST, getRoleRequest);
}

const delay = time => new Promise(resolve => setTimeout(resolve, time));

function* authorize({ username, password }: ReturnType<typeof AuthCreators.authorize>) {

	const postOptions = {
		body: JSON.stringify({ username, password }),
		method: 'POST',
	};

	const response : {status: number; statusText: string; json: any} = yield call(fetchData, '/api/login/', postOptions);

	if (response.status === 400) {
		const data: {username: string; password: string} = yield response.json();
		if (data.username) {
			yield put(SnackbarCreators.showErrorSnackbar('Username: ' + data.username));
			yield delay(3500);
		}
		if (data.password) {
			yield put(SnackbarCreators.showErrorSnackbar('Пароль: ' + data.password));
			yield delay(3500);
		}
		yield put(SnackbarCreators.showErrorSnackbar('Данные неверны или пользователь не активен'));
		if (data) {
			yield put(SnackbarCreators.showErrorSnackbar('Пользователь не существует.')) && (yield delay(3500));
		}
	} else if (response.status === 500) {
		localStorage.removeItem('token');
		location.reload();
	} else {
		const data: { type: string; message: {token: string} } = yield response.json();
		data.message.token && localStorage.setItem('token', data.message.token);
		yield put(SnackbarCreators.showSuccessSnackbar('Авторизация прошла успешно'));
		yield delay(2000);
		location.reload();
	}
}

function* logout(): Generator<never, void> {
	localStorage.removeItem('token');
	location.reload();
}

function* getRoleRequest() {

	const authOptions = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	};

	const roleResponse: { status: number; statusText: string; json: any } = yield call(fetchData, '/api/auth/me/', authOptions);

	if (roleResponse.status === 400 || roleResponse.status === 401 || roleResponse.status === 403 || roleResponse.status === 500) {
		localStorage.removeItem('token');
		location.reload();
	} else {
		const data = yield roleResponse.json();
		yield put(AuthCreators.getRoleSuccess({ role: data.message[0].role, username: data.message[0].username, isAuth: true }));
	}

}

export function* saga(): Generator<AllEffect<Generator<ForkEffect<never>, void>>, void> {
	yield all([onAuthorize(), onLogOut(), onGetRole()]);
}

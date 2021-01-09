import { all, call, ForkEffect, put, takeEvery, AllEffect } from 'redux-saga/effects';
import { RegisterCreators, Types } from '@app/register/duck/actions';
import { SnackbarCreators } from '@app/snackbar/duck/actions';
import { fetchData } from '@app/common/helpers/fetchData';
import { push } from 'connected-react-router';

export function* onRegister(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.REGISTER_REQUEST, register);
}

const delay = time => new Promise(resolve => setTimeout(resolve, time));

function* register({ email, username, password, lastName, firstName, middleName, phone, studyGroup, repeatPassword }: ReturnType<typeof RegisterCreators.register>) {

	const postOptions = {
		body: JSON.stringify({ email, username, password, lastName, firstName, middleName, phone, studyGroup }),
		method: 'POST',
	};

	if (password !== repeatPassword) {
		yield put(SnackbarCreators.showErrorSnackbar('Пароли не совпадают'));
	} else {
		const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, 'api/registration/', postOptions);
		if (response.status === 400) {
			const error = response.statusText;
			const data: {
				email: string;
				password: string;
				firstName: string;
				lastName: string;
				username: string;
				phone: string;
				studyGroup: string;
			} = yield response.json();
			yield put(RegisterCreators.registerFailure({ error, isSent: false }));
			data.email && (yield put(SnackbarCreators.showErrorSnackbar('Почта: ' + data.email))) && (yield delay(3500));
			data.password && (yield put(SnackbarCreators.showErrorSnackbar('Пароль: ' + data.password))) && (yield delay(3500));
			data.firstName && (yield put(SnackbarCreators.showErrorSnackbar('Имя: ' + data.firstName))) && (yield delay(3500));
			data.lastName && (yield put(SnackbarCreators.showErrorSnackbar('Фамилия: ' + data.lastName))) && (yield delay(3500));
			data.username && (yield put(SnackbarCreators.showErrorSnackbar('Username: ' + data.username))) && (yield delay(3500));
			data.phone && (yield put(SnackbarCreators.showErrorSnackbar('Телефон: ' + data.phone))) && (yield delay(3500));
			data.studyGroup && (yield put(SnackbarCreators.showErrorSnackbar('Группа: ' + data.studyGroup))) && (yield delay(3500));
		} else {
			const data: { message: string } = yield response.json();
			yield put(RegisterCreators.registerSuccess({ isSent: true }));
			yield put(SnackbarCreators.showSuccessSnackbar(data.message));
			yield call(delay, 2000);
			yield put(push('/'));
		}
	}
}

export function* saga(): Generator<AllEffect<Generator<ForkEffect<never>, void>>, void > {
	yield all([onRegister()]);
}

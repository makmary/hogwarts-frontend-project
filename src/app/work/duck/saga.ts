import { all, call, put, takeEvery, ForkEffect, AllEffect } from 'redux-saga/effects';
import { WorkCreators, Types } from '@app/work/duck/actions';
import { fetchData } from '@app/common/helpers/fetchData';
import { push } from 'connected-react-router';
import { FeedCreators } from '@app/feed/duck/actions';
import { IFeed } from '@app/feed/interfaces/IFeed';
import { SnackbarCreators } from '@app/snackbar/duck/actions';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

// ---------------------------- GET WORK INFO --------------------------------- //

export function* onGetWork(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.GET_WORK, getWorkInfo);
}

function* getWorkInfo({ id }: ReturnType<typeof WorkCreators.getWork>) {
	if (localStorage.getItem('token')) {
		const options = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};

		const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/?id=${id}`, options);
		if (response.status === 400) {
			const error = response.statusText;
			yield put(WorkCreators.getWorkFailure({ error }));
			yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			location.reload();
		} else {
			const data = yield response.json();
			yield put(WorkCreators.getWorkSuccess({ workInfo: data.message, statusId: data.message.status }));
		}
	} else {
		location.reload();
	}
}

// ---------------------------- CREATE WORK --------------------------------- //

export function* onCreateWork(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_CREATE, createWork);
}

function* createWork({ description, theme, advisory_id }: ReturnType<typeof WorkCreators.createWork>) {

	if (localStorage.getItem('token')) {

		if (description === '' || advisory_id === 0) {
			advisory_id === 0 && (yield put(SnackbarCreators.showErrorSnackbar('Выберите научного руководителя'))) && (yield delay(3000));
			description === '' && (yield put(SnackbarCreators.showErrorSnackbar('Напишете название Вашей работы'))) && (yield delay(3000));
		} else {
			const postOptions = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify({ description, theme, advisory_id }),
				method: 'POST',
			};

			const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, '/api/work/new/', postOptions);
			const data = yield response.json();
			if (response.status === 400) {
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (response.status === 401 || response.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				yield put(WorkCreators.createWorkSuccess({ response: data }));
				data.message && (yield put(SnackbarCreators.showSuccessSnackbar(data.message))) && (yield delay(1500));

				location.reload();
			}
		}
	} else {
		location.reload();
	}
}

// ---------------------------- CREATE COMMENT --------------------------------- //

export function* onCreateComment(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_COMMENT, createComment);
}

function* createComment({ researchPaper_id, text }: ReturnType<typeof WorkCreators.commentWork>) {
	if (localStorage.getItem('token')) {

		const postOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({ researchPaper_id, text }),
			method: 'POST',
		};

		const response: { status: number; statusText: string } = yield call(fetchData, '/api/work/comment/', postOptions);
		if (response.status === 400) {
			const error = response.statusText;
			yield put(WorkCreators.commentWorkFailure({ error }));
			yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			location.reload();
		} else {
			yield put(WorkCreators.commentWorkSuccess());

			const options = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			const feedResponse: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/feed/?id=${researchPaper_id}`, options);
			if (feedResponse.status === 400) {
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (feedResponse.status === 401 || feedResponse.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: IFeed[] } = yield feedResponse.json();
				yield put(FeedCreators.getFeedSuccess(data.message));
			}


			const _response: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/?id=${researchPaper_id}`, options);
			if (_response.status === 400) {
				const error = _response.statusText;
				yield put(WorkCreators.getWorkFailure({ error }));
				yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
			} else if (response.status === 401 || response.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const workData: { message: { status: number } } = yield _response.json();
				yield put(WorkCreators.getWorkSuccess({
					workInfo: workData.message,
					statusId: workData.message.status,
				}));
			}
		}


	} else {
		location.reload();
	}
}

// ---------------------------- EDIT WORK --------------------------------- //

export function* onEditWork(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_EDIT, editWork);
}

function* editWork({ id, consultant_id, theme, objective, results, content, sources }: ReturnType<typeof WorkCreators.editWork>) {

	if (localStorage.getItem('token')) {
		if (theme === ('' || null) || objective === ('' || null) || content === ('' || null)) {
			theme === ('' || null) && (yield put(SnackbarCreators.showErrorSnackbar('Введите тему Вашей работы.'))) && (yield delay(3000));
			objective === ('' || null) && (yield put(SnackbarCreators.showErrorSnackbar('Введите цель Вашей работы.'))) && (yield delay(3000));
			content === ('' || null) && (yield put(SnackbarCreators.showErrorSnackbar(' Введите содержание Вашей работы.'))) && (yield delay(3000));
		} else {
			const postOptions = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify({
					pk: id,
					consultant_id: consultant_id === -1 ? '' : consultant_id,
					theme,
					objective,
					results,
					content,
					sources,
				}),
				method: 'POST',
			};

			const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, '/api/work/edit/', postOptions);
			if (response.status === 400) {
				const error = response.statusText;
				yield put(WorkCreators.editWorkFailure({ error }));
				yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
			} else if (response.status === 401 || response.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { type: string; message: string } = yield response.json();
				// yield put(WorkCreators.editWorkSuccess());
				if (data.type === 'error') {
					yield put(SnackbarCreators.showErrorSnackbar(data.message));
				} else {
					yield put(SnackbarCreators.showSuccessSnackbar(data.message));
				}
				const options = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				};

				const feedResponse: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/feed/?id=${id}`, options);
				if (feedResponse.status === 400) {
					yield put(SnackbarCreators.showErrorSnackbar('400 error'));
				} else if (feedResponse.status === 401 || feedResponse.status === 403 || response.status === 500) {
					localStorage.removeItem('token');
					location.reload();
				} else {
					const data: { message: IFeed[] } = yield feedResponse.json();
					yield put(FeedCreators.getFeedSuccess(data.message));
				}

				const _response: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/?id=${id}`, options);
				if (_response.status === 400) {
					const error = _response.statusText;
					yield put(WorkCreators.getWorkFailure({ error }));
					yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
				} else if (response.status === 401 || response.status === 403 || response.status === 500) {
					localStorage.removeItem('token');
					location.reload();
				} else {
					const workData: { message: { status: number } } = yield _response.json();
					yield put(WorkCreators.getWorkSuccess({
						workInfo: workData.message,
						statusId: workData.message.status,
					}));

				}
			}
		}
	} else {
		location.reload();
	}
}

// ---------------------------- DELETE WORK --------------------------------- //

export function* onDeleteWork(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_DELETE, deleteWork);
}

function* deleteWork({ researchPaper_id }: ReturnType<typeof WorkCreators.deleteWork>) {

	if (localStorage.getItem('token')) {
		const postOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({ id: researchPaper_id }),
			method: 'POST',
		};

		const response: { status: number; statusText: string } = yield call(fetchData, '/api/work/delete/', postOptions);
		if (response.status === 400) {
			const error = response.statusText;
			yield put(WorkCreators.deleteWorkFailure({ error }));
			yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			location.reload();
		} else {
			yield put(WorkCreators.deleteWorkSuccess());
			yield delay(600);
			yield put(push('/papers'));
		}
	} else {
		location.reload();
	}
}

// ---------------------------- PUSH WORK --------------------------------- //

export function* onPushWork(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_PUSH, pushWork);
}

function* pushWork({ researchPaper_id }: ReturnType<typeof WorkCreators.pushWork>) {
	if (localStorage.getItem('token')) {
		const postOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({ id: researchPaper_id }),
			method: 'POST',
		};

		const response: { status: number; statusText: string } = yield call(fetchData, '/api/work/push/', postOptions);
		if (response.status === 400) {
			const error = response.statusText;
			yield put(WorkCreators.pushWorkFailure({ error }));
			yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			location.reload();
		} else {
			yield put(WorkCreators.pushWorkSuccess());

			const options = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			const feedResponse: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/feed/?id=${researchPaper_id}`, options);
			if (feedResponse.status === 400) {
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (feedResponse.status === 401 || feedResponse.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: IFeed[] } = yield feedResponse.json();
				yield put(FeedCreators.getFeedSuccess(data.message));
			}

			const _response: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/?id=${researchPaper_id}`, options);
			if (_response.status === 400) {
				const error = _response.statusText;
				yield put(WorkCreators.getWorkFailure({ error }));
				yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
			} else if (response.status === 401 || response.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: { status: number } } = yield _response.json();
				yield put(WorkCreators.getWorkSuccess({ workInfo: data.message, statusId: data.message.status }));

			}

		}
	} else {
		location.reload();
	}
}

// ---------------------------- POP WORK --------------------------------- //

export function* onPopWork(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_POP, popWork);
}

function* popWork({ researchPaper_id }: ReturnType<typeof WorkCreators.popWork>) {
	if (localStorage.getItem('token')) {
		const postOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({ id: researchPaper_id }),
			method: 'POST',
		};

		const response: { status: number; statusText: string } = yield call(fetchData, '/api/work/pop/', postOptions);
		if (response.status === 400) {
			const error = response.statusText;
			yield put(WorkCreators.popWorkFailure({ error }));
			yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			location.reload();
		} else {
			yield put(WorkCreators.popWorkSuccess());

			const options = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			const feedResponse: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/feed/?id=${researchPaper_id}`, options);
			if (feedResponse.status === 400) {
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (feedResponse.status === 401 || feedResponse.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: IFeed[] } = yield feedResponse.json();
				yield put(FeedCreators.getFeedSuccess(data.message));
			}

			const _response: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/?id=${researchPaper_id}`, options);
			if (_response.status === 400) {
				const error = _response.statusText;
				yield put(WorkCreators.getWorkFailure({ error }));
				yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
			} else if (response.status === 401 || response.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: { status: number } } = yield _response.json();
				yield put(WorkCreators.getWorkSuccess({ workInfo: data.message, statusId: data.message.status }));
			}

		}
	} else {
		location.reload();
	}
}

// ---------------------------- RETURN WORK --------------------------------- //

export function* onReturnWork(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_RETURN, returnWork);
}

function* returnWork({ researchPaper_id }: ReturnType<typeof WorkCreators.returnWork>) {
	if (localStorage.getItem('token')) {
		const postOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({ id: researchPaper_id }),
			method: 'POST',
		};

		const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, '/api/work/return/', postOptions);
		if (response.status === 400) {
			const error = response.statusText;
			yield put(WorkCreators.returnWorkFailure({ error }));
			yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			location.reload();
		} else {
			yield put(WorkCreators.returnWorkSuccess());

			const options = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			const feedResponse: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/feed/?id=${researchPaper_id}`, options);
			if (feedResponse.status === 400) {
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (feedResponse.status === 401 || feedResponse.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: IFeed[] } = yield feedResponse.json();
				yield put(FeedCreators.getFeedSuccess(data.message));
			}

			const _response: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/?id=${researchPaper_id}`, options);
			if (_response.status === 400) {
				const error = _response.statusText;
				yield put(WorkCreators.getWorkFailure({ error }));
				yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
			} else if (response.status === 401 || response.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: { status: number } } = yield _response.json();
				yield put(WorkCreators.getWorkSuccess({ workInfo: data.message, statusId: data.message.status }));

			}
		}
	} else {
		location.reload();
	}
}

// ---------------------------- RETURN REPORT --------------------------------- //

export function* onReturnReport(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_RETURN_REPORT, returnWorkReport);
}

function* returnWorkReport({ researchPaper_id }: ReturnType<typeof WorkCreators.returnWorkReport>) {
	if (localStorage.getItem('token')) {
		const postOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({ id: researchPaper_id }),
			method: 'POST',
		};

		const response: { status: number; statusText: string; json: () => void } = yield call(fetchData, '/api/work/reportreturn/', postOptions);
		if (response.status === 400) {
			yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			location.reload();
		} else {

			const options = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			const feedResponse: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/feed/?id=${researchPaper_id}`, options);
			if (feedResponse.status === 400) {
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (feedResponse.status === 401 || feedResponse.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: IFeed[] } = yield feedResponse.json();
				yield put(FeedCreators.getFeedSuccess(data.message));
			}

			const _response: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/?id=${researchPaper_id}`, options);
			if (_response.status === 400) {
				const error = _response.statusText;
				yield put(WorkCreators.getWorkFailure({ error }));
				yield put(SnackbarCreators.showErrorSnackbar('400 error')) && (yield delay(3500));
			} else if (response.status === 401 || response.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: { status: number } } = yield _response.json();
				yield put(WorkCreators.getWorkSuccess({ workInfo: data.message, statusId: data.message.status }));

			}
		}
	} else {
		location.reload();
	}
}


// ---------------------------- POST MARK --------------------------------- //

export function* onMarkSend(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_MARK, sendingMark);
}

function* sendingMark({ researchPaper_id, letter, mark }: ReturnType<typeof WorkCreators.markWork>) {

	if (localStorage.getItem('token')) {

		const markToSend = letter + ' ' + mark;

		const postOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({
				id: researchPaper_id,
				markToSend,
			}),
			method: 'POST',
		};

		const response: { status: number; statusText: string } = yield call(fetchData, '/api/work/mark/', postOptions);
		if (response.status === 400) {
			const error = response.statusText;
			yield put(WorkCreators.markWorkFailure({ error }));
			yield put(SnackbarCreators.showErrorSnackbar('400 error'));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			yield put(push('/'));
			location.reload();
		} else {
			yield put(WorkCreators.markWorkSuccess());

			const options = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			const feedResponse: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/feed/?id=${researchPaper_id}`, options);
			if (feedResponse.status === 400) {
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (feedResponse.status === 401 || feedResponse.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: IFeed[] } = yield feedResponse.json();
				yield put(FeedCreators.getFeedSuccess(data.message));
			}

			const _response: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/?id=${researchPaper_id}`, options);
			if (_response.status === 400) {
				const error = _response.statusText;
				yield put(WorkCreators.getWorkFailure({ error }));
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (response.status === 401 || response.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: { status: number } } = yield _response.json();
				yield put(WorkCreators.getWorkSuccess({ workInfo: data.message, statusId: data.message.status }));
			}
		}
	} else {
		location.reload();
	}
}


// ---------------------------- SEND PRESENTATION --------------------------------- //
/*
export function* onSendPresentation(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_SEND_PRESENTATION, presentationUpload);
}

function* presentationUpload({ researchPaper_id, presFile }: ReturnType<typeof WorkCreators.sendWorkPresentation>) {

	const postOptions = {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
		body: JSON.stringify({
			id: researchPaper_id,
			file: presFile,
		}),
		method: 'POST',
	};

	const response : {status: number; statusText: string} = yield call(fetchData, '/api/pres/upload/', postOptions);
	if (response.status === 400) {
		yield put(SnackbarCreators.showErrorSnackbar('400 error'));
	} else if (response.status === 401 || response.status === 403 || response.status === 500) {
		localStorage.removeItem('token');
		location.reload();
	} else {

		yield put(SnackbarCreators.showSuccessSnackbar('Презентация успешно загружена.')) && (yield delay(3500));
	}
}

 */

// ---------------------------- SEND REPORT--------------------------------- //

export function* onSendReport(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_SEND_REPORT, reportUpload);
}

function* reportUpload({ researchPaper_id, reportFile }: ReturnType<typeof WorkCreators.sendWorkReport>) {

	const postOptions = {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
		body: JSON.stringify({
			id: researchPaper_id,
			file: reportFile,
		}),
		method: 'POST',
	};

	const response : {status: number; statusText: string} = yield call(fetchData, '/api/report/upload/', postOptions);
	if (response.status === 400) {
		yield put(SnackbarCreators.showErrorSnackbar('400 error'));
	} else if (response.status === 401 || response.status === 403 || response.status === 500) {
		localStorage.removeItem('token');
		yield put(push('/'));
		location.reload();
	} else {

		yield put(SnackbarCreators.showSuccessSnackbar('Отчёт успешно загружен.')) && (yield delay(3500));

	}
}


// ---------------------------- GET REPORT--------------------------------- //

export function* onGetReport(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_GET_REPORT, getReport);
}

function* getReport({ researchPaper_id }: ReturnType<typeof WorkCreators.getWorkReport>) {

	const options = {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	};

	const response : {status: number; statusText: string} = yield call(fetchData, `/api/work/report/?id=${researchPaper_id}`, options);
	if (response.status === 400) {
		yield put(SnackbarCreators.showErrorSnackbar('400 error'));
	} else if (response.status === 401 || response.status === 403 || response.status === 500) {
		localStorage.removeItem('token');
		yield put(push('/'));
		location.reload();
	} else {

		yield put(SnackbarCreators.showSuccessSnackbar('Отчёт успешно загружен.')) && (yield delay(3500));

	}
}

// ---------------------------- GET PRESENTATION --------------------------------- //

export function* onGetPresentation(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_SEND_PRESENTATION, getPresentation);
}

function* getPresentation({ researchPaper_id }: ReturnType<typeof WorkCreators.getWorkPresentation>) {

	const postOptions = {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
		body: JSON.stringify({
			id: researchPaper_id,
		}),
		method: 'POST',
	};

	const response : {status: number; statusText: string} = yield call(fetchData, `/api/work/presentation/?id=${researchPaper_id}`, postOptions);
	if (response.status === 400) {
		yield put(SnackbarCreators.showErrorSnackbar('400 error'));
	} else if (response.status === 401 || response.status === 403 || response.status === 500) {
		localStorage.removeItem('token');
		location.reload();
	} else {

		yield put(SnackbarCreators.showSuccessSnackbar('Презентация успешно загружена.')) && (yield delay(3500));
	}
}

// ---------------------------- POST REVIEW --------------------------------- //

export function* onReviewSend(): Generator<ForkEffect<never>, void> {
	yield takeEvery(Types.WORK_REVIEW, sendingReview);
}

function* sendingReview({ researchPaper_id, review }: ReturnType<typeof WorkCreators.sendWorkReview>) {

	if (localStorage.getItem('token')) {
		const postOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({
				id: researchPaper_id,
				review,
			}),
			method: 'POST',
		};

		const response: { status: number; statusText: string; json: any } = yield call(fetchData, '/api/work/review/', postOptions);
		if (response.status === 400) {
			const error = response.statusText;
			yield put(WorkCreators.markWorkFailure({ error }));
			yield put(SnackbarCreators.showErrorSnackbar('400 error'));
		} else if (response.status === 401 || response.status === 403 || response.status === 500) {
			localStorage.removeItem('token');
			yield put(push('/'));
			location.reload();
		} else {

			const data: { message: string } = yield response.json();
			yield put(SnackbarCreators.showSuccessSnackbar(data.message));

			const options = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			const feedResponse: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/feed/?id=${researchPaper_id}`, options);
			if (feedResponse.status === 400) {
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (feedResponse.status === 401 || feedResponse.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: IFeed[] } = yield feedResponse.json();
				yield put(FeedCreators.getFeedSuccess(data.message));
			}

			const _response: { status: number; statusText: string; json: () => void } = yield call(fetchData, `/api/work/?id=${researchPaper_id}`, options);
			if (_response.status === 400) {
				const error = _response.statusText;
				yield put(WorkCreators.getWorkFailure({ error }));
				yield put(SnackbarCreators.showErrorSnackbar('400 error'));
			} else if (response.status === 401 || response.status === 403 || response.status === 500) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				const data: { message: { status: number } } = yield _response.json();
				yield put(WorkCreators.getWorkSuccess({ workInfo: data.message, statusId: data.message.status }));
			}
		}
	} else {
		location.reload();
	}
}


export function* saga(): Generator<AllEffect<Generator<ForkEffect<never>, void>>, void> {
	yield all([
		onGetWork(),
		onEditWork(),
		onCreateWork(),
		onCreateComment(),
		onDeleteWork(),
		onPushWork(),
		onPopWork(),
		onReturnWork(),
		onMarkSend(),
		//	onSendPresentation(),
		onSendReport(),
		onGetReport(),
		onGetPresentation(),
		onReturnReport(),
		onReviewSend(),
	]
	);
}

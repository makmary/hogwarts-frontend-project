import { all, AllEffect, ForkEffect } from 'redux-saga/effects';

import { saga as authSaga } from './auth/duck/saga';
import { saga as papersSaga } from './papers/duck/saga';
import { saga as teacherSaga } from './teacher/duck/saga';
import { saga as registerSaga } from './register/duck/saga';
import { saga as workSaga } from './work/duck/saga';
import { saga as feedSaga } from './feed/duck/saga';
import { saga as settingsSaga } from './settings/duck/saga';
import { saga as vacancySaga } from './vacancy/duck/saga';
import { saga as newsSaga } from './news/duck/saga';
import { saga as statusSaga } from './status/duck/saga';
import { saga as groupsSaga } from './groups/duck/saga';

export function* sagas(): Generator<AllEffect<Generator<AllEffect<Generator<ForkEffect<never>, void>>>>> {
	yield all([
		authSaga(),
		papersSaga(),
		teacherSaga(),
		registerSaga(),
		workSaga(),
		feedSaga(),
		settingsSaga(),
		vacancySaga(),
		newsSaga(),
    statusSaga(),
    groupsSaga(),
	]);
}


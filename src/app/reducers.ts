import { combineReducers } from 'redux';
import { History as IHistory } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';

import { IState as IAuth, reducer as authReducer } from '@app/auth/duck/reducer';
import { IState as IPaper, reducer as papersReducer } from '@app/papers/duck/reducer';
import { IState as ITeacher, reducer as teacherReducer } from '@app/teacher/duck/reducer';
import { IState as IRegister, reducer as registerReducer } from '@app/register/duck/reducer';
import { IState as IWork, reducer as workReducer } from '@app/work/duck/reducer';
import { IState as IFeed, reducer as feedReducer } from '@app/feed/duck/reducer';
import { IState as ISettings, reducer as settingsReducer } from '@app/settings/duck/reducer';
import { IState as ISnackbars, reducer as snackbarsReducer } from '@app/snackbar/duck/reducer';
import { IState as IVacancy, reducer as vacancyReducer } from '@app/vacancy/duck/reducer';
import { IState as INews, reducer as newsReducer } from '@app/news/duck/reducer';
import { IState as IStatus, reducer as statusReducer } from '@app/status/duck/reducer';
import { IState as IGroups, reducer as groupsReducer } from '@app/groups/duck/reducer';

export interface IRootState {
	auth: IAuth;
	router: RouterState;
	papers: IPaper;
	teacher: ITeacher;
	register: IRegister;
	work: IWork;
	feed: IFeed;
	settings: ISettings;
	snackbars: ISnackbars;
	vacancy: IVacancy;
	news: INews;
	status: IStatus;
	groups: IGroups;
}

export const createRootReducer = (history: IHistory) => combineReducers<IRootState>({
	router: connectRouter(history),
	papers: papersReducer,
	auth: authReducer,
	teacher: teacherReducer,
	register: registerReducer,
	work: workReducer,
	feed: feedReducer,
	settings: settingsReducer,
	snackbars: snackbarsReducer,
	vacancy: vacancyReducer,
	news: newsReducer,
	status: statusReducer,
	groups: groupsReducer,
});

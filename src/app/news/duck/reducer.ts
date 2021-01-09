import { NewsCreators, Types } from '@app/news/duck/actions';
import { INews } from '../interfaces/INews';
import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';

export interface IState {
	news: INews[];
	status: FetchingStatuses;
}

const initialState: IState = {
	news: [],
	status: FetchingStatuses.NONE,
};

type ActionTypes = ReturnType<InferValueTypes<typeof NewsCreators>>;

export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.GET_NEWS && { ...state }
    ||
    action.type === Types.GET_NEWS_SUCCESS && { ...state, news: action.news, status: FetchingStatuses.SUCCESS }
    ||
	action.type === Types.NEWS_REFRESH_FETCH_STATUS && { ...state, status: action.status }
	||
    state
;

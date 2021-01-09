import { INews } from '@app/news/interfaces/INews';
import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';

export enum Types {
	GET_NEWS = 'GET_NEWS',
	GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS',
	NEWS_REFRESH_FETCH_STATUS = 'NEWS_REFRESH_FETCH_STATUS',
}

export const NewsCreators = {
	getNews: () => ({
		type: Types.GET_NEWS,
	} as const),
	getNewsSuccess: (news: INews[]) => ({
		type: Types.GET_NEWS_SUCCESS,
		news,
	} as const),
	newsRefreshFetchStatus: (status: FetchingStatuses) => ({
		type: Types.NEWS_REFRESH_FETCH_STATUS,
		status,
	} as const),
};

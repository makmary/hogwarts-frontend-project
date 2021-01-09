import { IFeed } from '@app/feed/interfaces/IFeed';

export enum Types {
	GET_FEED = 'GET_FEED',
	GET_FEED_SUCCESS = 'GET_FEED_SUCCESS',
}

export const FeedCreators = {
	getFeed: ({ id }: {id: number}) => ({
		type: Types.GET_FEED,
		id,
	} as const),
	getFeedSuccess: (feeds: IFeed[]) => ({
		type: Types.GET_FEED_SUCCESS,
		feeds,
	} as const),
};

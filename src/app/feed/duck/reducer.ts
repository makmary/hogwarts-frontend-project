import { FeedCreators, Types } from '@app/feed/duck/actions';
import { IFeed } from '../interfaces/IFeed';

export interface IState {
	feeds: IFeed[];
}

const initialState: IState = {
	feeds: [],
};

type ActionTypes = ReturnType<InferValueTypes<typeof FeedCreators>>;

export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.GET_FEED && { ...state }
    ||
    action.type === Types.GET_FEED_SUCCESS && { ...state, feeds: action.feeds }
    ||
    state
;

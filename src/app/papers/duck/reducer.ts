import { PaperCreators, Types } from '@app/papers/duck/actions';

import { IPaper } from '@app/papers/interfaces/IPaper';
import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';

export interface IState {
	items: IPaper[];
	status: FetchingStatuses;
}

const initialState: IState = {
	items: [],
	status: FetchingStatuses.NONE,
};

type ActionTypes = ReturnType<InferValueTypes<typeof PaperCreators>>;

export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.PAPER_REFRESH_LIST && {
		...state,
		items: action.items,
		status: FetchingStatuses.SUCCESS,
	} ||
	action.type === Types.PAPER_REFRESH_FETCH_STATUS && {
		...state,
		status: action.status,
	} ||
	state
;

import { IPaper } from '@app/papers/interfaces/IPaper';
import { FetchingStatuses } from '@app/common/enums/fetchingStatuses';

export enum Types {
	PAPER_GET_LIST = 'PAPER_GET_LIST',
	PAPER_REFRESH_LIST = 'PAPER_REFRESH_LIST',
	PAPER_REFRESH_FETCH_STATUS = 'PAPER_REFRESH_FETCH_STATUS',
}

export const PaperCreators = {
	paperGetList: () => ({
		type: Types.PAPER_GET_LIST,
	} as const),
	paperRefreshList: (papers: IPaper[]) => ({
		type: Types.PAPER_REFRESH_LIST,
		items: papers,
	} as const),
	paperRefreshFetchStatus: (status: FetchingStatuses) => ({
		type: Types.PAPER_REFRESH_FETCH_STATUS,
		status,
	} as const),
};

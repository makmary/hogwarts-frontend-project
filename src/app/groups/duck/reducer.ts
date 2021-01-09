import { GroupsCreators, Types } from '@app/groups/duck/actions';
import { IGroups } from '@app/groups/interfaces/IGroups';

export interface IState {
	groups: IGroups[];
}

const initialState: IState = {
	groups: [],
};

type ActionTypes = ReturnType<InferValueTypes<typeof GroupsCreators>>;

export const reducer = (state = initialState, action: ActionTypes): IState =>
	action.type === Types.GET_GROUPS_REQUEST && { ...state }
    ||
    action.type === Types.GET_GROUPS && { ...state, groups: action.groups }
    ||
    state
;

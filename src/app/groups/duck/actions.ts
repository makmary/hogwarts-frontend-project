import { IGroups } from '@app/groups/interfaces/IGroups';

export enum Types {
	GET_GROUPS_REQUEST = 'GET_GROUPS_REQUEST',
	GET_GROUPS = 'GET_GROUPS',
}

export const GroupsCreators = {
	getGroups: () => ({
		type: Types.GET_GROUPS_REQUEST,
	} as const),
	getGroupsSuccess: (groups: IGroups[]) => ({
		type: Types.GET_GROUPS,
		groups,
	} as const),
};

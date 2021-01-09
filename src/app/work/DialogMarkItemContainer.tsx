import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { WorkCreators } from '@app/work/duck/actions';
import { DialogMarkItem } from './DialogMarkItem';

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
	postMark: (researchPaper_id: number, letter: string, mark: string) => dispatch(WorkCreators.markWork({ researchPaper_id, letter, mark })),
});

export const DialogMarkItemContainer = connect(
	null,
	mapDispatchToProps,
)(DialogMarkItem);

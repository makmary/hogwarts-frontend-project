import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { WorkCreators } from '@app/work/duck/actions';
import { DialogItem } from './DialogItem';


export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
	postComment: (researchPaper_id: number, text: string) => dispatch(WorkCreators.commentWork({ researchPaper_id, text })),
});

export const DialogItemContainer = connect(
	null,
	mapDispatchToProps,
)(DialogItem);

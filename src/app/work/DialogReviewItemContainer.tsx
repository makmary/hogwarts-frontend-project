import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { WorkCreators } from '@app/work/duck/actions';
import { DialogReviewItem } from './DialogReviewItem';

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
	sendReview: (researchPaper_id: number, review: string) => dispatch(WorkCreators.sendWorkReview({ researchPaper_id, review })),
});

export const DialogReviewItemContainer = connect(
	null,
	mapDispatchToProps,
)(DialogReviewItem);

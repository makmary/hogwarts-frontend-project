import { connect } from 'react-redux';

import { News } from '@app/news/News';
import { IRootState } from '@app/reducers';
import { Dispatch } from 'redux';
import { NewsCreators } from '@app/news/duck/actions';

export type IStateProps = ReturnType<typeof mapStateToProps>;
export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;


const mapStateToProps = (state: IRootState) => ({
	news: state.news.news,
	status: state.news.status,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getNewsList: () => dispatch(NewsCreators.getNews()),
});

export const NewsListContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(News);

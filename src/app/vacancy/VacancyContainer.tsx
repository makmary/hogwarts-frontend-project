import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '@app/reducers';
import { Vacancy } from './Vacancy';
import { VacancyCreators } from '@app/vacancy/duck/actions';


export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;


const mapStateToProps = (state: IRootState) => ({
	vacancies: state.vacancy.items,
	status: state.vacancy.status,
	role: state.auth.role,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getVacancyList: () => dispatch(VacancyCreators.vacancyGetList()),
});

export const VacancyContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Vacancy);

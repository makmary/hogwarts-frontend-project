import React from 'react';

import { IDispatchProps, IStateProps } from '@app/vacancy/VacancyContainer';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container/Container';

import { VacancyCard } from './VacancyCard';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : '#212121',
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	productCard: {
		height: '100%',
		marginBottom: theme.spacing(2),
	},
	vacancies: {
		width: '100%',
		margin: theme.spacing(2),
	},

}));


export const Vacancy: React.FC<IStateProps & IDispatchProps> = ({ vacancies, status, getVacancyList }) => {
	const classes = useStyles();

	React.useEffect(() => {
		getVacancyList();
	},[]);

	return (
		<Grid container>
			{(status !== 'SUCCESS' ? Array.from(new Array(5)) : vacancies).map((item, index) =>
				<Box key={index} className={classes.vacancies}>
					{item ?
						<Container maxWidth={false}>
							{
								<VacancyCard
									className={classes.productCard}
									vacancy={item}
								/>
							}
						</Container>
						:
						<div>
							<Skeleton variant="text"/>
							<Skeleton variant="text"/>
							<Skeleton variant="rect" height={230} />
						</div>
					}
				</Box>
			)}
		</Grid>
	);
};

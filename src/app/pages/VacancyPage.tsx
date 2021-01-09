import * as React from 'react';
import HeaderContainer from '@app/common/components/Header/HeaderContainer';
import { Footer } from '@app/common/components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { VacancyContainer } from '@app/vacancy/VacancyContainer';

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 'calc(100vh - 90px)',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : '#212121',
	},
}));

const VacancyPage: React.FC = () => {

	const classes = useStyles();

	React.useEffect(() => {
		document.title = 'Vacancies';
	});

	return (
		<>
			<div className={classes.root}>
				<HeaderContainer name='Vacancies'>
					<VacancyContainer/>
				</HeaderContainer>
			</div>
			<Footer withBorder={true}/>
		</>
	);
};

export default VacancyPage;

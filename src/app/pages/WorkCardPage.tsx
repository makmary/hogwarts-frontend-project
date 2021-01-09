import * as React from 'react';
import { Footer } from '@app/common/components/Footer';
import { WorkCardContainer } from '@app/work/WorkCardContainer';
import { makeStyles, Theme } from '@material-ui/core/styles';
import HeaderContainer from '@app/common/components/Header/HeaderContainer';

const useStyles = makeStyles((theme : Theme) => ({
	root: {
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : '#212121',
		minHeight: 'calc(100vh - 90px)',
	},
}));

const WorkCardPage: React.FC = () => {

	const classes = useStyles();

	React.useEffect(() => {
		document.title = 'Student Paper';
	}, []);

	return (
		<>
			<div className={classes.root}>
				<HeaderContainer name='Student Paper'>
					<WorkCardContainer />
				</HeaderContainer>
			</div>
			<Footer withBorder={true}/>
		</>
	);
};

export default WorkCardPage;

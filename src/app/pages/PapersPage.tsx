import * as React from 'react';

import { Footer } from '@app/common/components/Footer';
import { PaperContainer } from '@app/papers/PaperContainer';
import { makeStyles } from '@material-ui/core/styles';
import HeaderContainer from '@app/common/components/Header/HeaderContainer';

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 'calc(100vh - 90px)',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : '#212121',
	},
}));

const PapersPage: React.FC = () => {

	const classes = useStyles();

	React.useEffect(() => {
		document.title = 'Papers';
	});

	return (
		<>
			<div className={classes.root}>
				<HeaderContainer name='Papers'>
					<PaperContainer/>
				</HeaderContainer>
			</div>
			<Footer withBorder={true}/>
		</>
	);
};

export default PapersPage;

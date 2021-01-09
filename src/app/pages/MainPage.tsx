import * as React from 'react';

import { Footer } from '@app/common/components/Footer';
import { NewsListContainer } from '@app/news/NewsContainer';
import { makeStyles } from '@material-ui/core/styles';
import HeaderContainer from '@app/common/components/Header/HeaderContainer';

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 'calc(100vh - 90px)',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : '#212121',
	},
}));


const MainPage: React.FC = () => {

	const classes = useStyles();

	React.useEffect(() => {
		document.title = 'Main Page';
	});

	return (
		<>
			<div className={classes.root}>
				<HeaderContainer name="News">
					<NewsListContainer />
				</HeaderContainer>
			</div>
			<Footer withBorder={true}/>
		</>
	);

};

export default MainPage;

import * as React from 'react';

import { Footer } from '@app/common/components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import HeaderContainer from '@app/common/components/Header/HeaderContainer';
import { Support } from '@app/support/Support';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : '#212121',
		minHeight: 'calc(100vh - 90px)',
	},
}));

const SupportPage: React.FC = () => {

	const classes = useStyles();

	React.useEffect(() => {
		document.title = 'Support';
	});

	return (
		<>
			<div className={classes.root}>
				<HeaderContainer name='Support'>
					<Support />
				</HeaderContainer>
			</div>
			<Footer withBorder={true}/>
		</>
	);
};

export default SupportPage;

import * as React from 'react';
import { SettingsContainer } from '@app/settings/SettingsContainer';
import HeaderContainer from '@app/common/components/Header/HeaderContainer';
import { Footer } from '@app/common/components/Footer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 'calc(100vh - 90px)',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : '#212121',

	},
}));

const SettingsPage: React.FC = () => {

	const classes = useStyles();

	React.useEffect(() => {
		document.title = 'Settings';
	});

	return (
		<>
			<div className={classes.root}>
				<HeaderContainer name='Settings'>
					<SettingsContainer/>
				</HeaderContainer>
			</div>
			<Footer withBorder={true}/>
		</>
	);
};

export default SettingsPage;

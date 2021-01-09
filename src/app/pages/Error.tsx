import * as React from 'react';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.background.paper,

	},
}));

const ErrorPage:React.FC = () => {

	const localLocation = useLocation();
	const classes = useStyles();

	React.useEffect(() => {
		document.title = 'Error 404 Not found';
	});

	return (
		<div className={classes.root}>
			<h1>Error Page</h1>
			<h3>No match for <code>{localLocation.pathname}</code></h3>
			<h1>WTF</h1>
		</div>
	);
};

export default ErrorPage;

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const lightTheme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#332A2A',
			light: '#F4F6F8',
		},
		secondary: {
			main: '#DCDCDC',
		},
		action: {
			active: '#bc492d',
		},
		text: {
			primary: '#000000',
		},
		background: {
			default: '#bc492d',
			paper: '#fafafa',
		},
	},
});

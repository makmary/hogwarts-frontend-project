import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#424242',
			light: '#C0C0C0',
		},
		secondary: {
			main: '#424242',
		},
		action: {
			active: '#8a85ff',
		},
		text: {
			primary: '#FFFFFF',
		},
		background: {
			default: '#424242', // header and footer
			paper: '#303030', // body
		},
	},
});

import * as React from 'react';

import { createGlobalStyle } from 'styled-components';
import { darkTheme } from '@app/common/styles/DarkTheme';
import { lightTheme } from '@app/common/styles/LightTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';

interface IProps {
	children: React.ReactNode;
}

interface IColor {
  backgroundColor: string;
}

type Theme = string;
type ThemeContext = { colorTheme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>(
	{} as ThemeContext
);

export const ThemeProvider: React.FC<IProps> = ({ children }: IProps) => {

	const [colorTheme, setColorTheme] = React.useState<string>(localStorage.getItem('theme') || 'light');
	const [theme, setTheme] = React.useState(colorTheme === 'light' ? lightTheme : darkTheme);

	const toggleTheme = () => {
		setColorTheme(colorTheme === 'dark' ? 'light' : 'dark');
		setTheme(colorTheme === 'dark' ? lightTheme : darkTheme);
		if (colorTheme !== 'dark') {
			localStorage.setItem('theme', 'dark');
		} else {
			localStorage.setItem('theme', 'light');
		}
	};

	React.useEffect(() => {
		const currentTheme = localStorage.getItem('theme');
		if (currentTheme) {
			setColorTheme(currentTheme);
			setTheme(currentTheme === 'dark' ? darkTheme : lightTheme);
		}
	}, []);

	const backgroundColor = (localStorage.getItem('theme') || 'light') === 'dark' ? '#303030' : '#F4F6F8';

	return (
		<ThemeContext.Provider value={{ colorTheme, toggleTheme }}>
			<MuiThemeProvider theme={theme}>
				<GlobalStyles backgroundColor={backgroundColor}/>
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

const GlobalStyles = createGlobalStyle<IColor>`
  html {
    height: 100%;
  }
  body {
    background: ${props => props.backgroundColor};
    font-size: 1.6rem;
    height: 100%;
    overflow: scroll;
    width: 100%;
  }
  #app {
    height: 100%;
  }
  *::-webkit-scrollbar {
    display: none;
  }
  * {
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    scrollbar-width: none;
  }
`;


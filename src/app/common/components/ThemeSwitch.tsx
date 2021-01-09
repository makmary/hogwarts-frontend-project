import React, { useContext } from 'react';

import { withStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import FormGroup from '@material-ui/core/FormGroup';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import { ThemeContext } from '@app/common/styles/Theme';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
	focusVisible?: string;
}

interface Props extends SwitchProps {
	classes: Styles;
}

interface IProps {
	toggleTheme: (string) => void;
}

export const ThemeSwitch: React.FC<IProps> = ({ toggleTheme }: IProps) => {

	const [checked, setChecked] = React.useState(false);
	const { colorTheme } = useContext(ThemeContext);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		toggleTheme(colorTheme);
		setChecked(e.target.checked);
	};

	React.useEffect(() => {
		if (colorTheme === 'light') {
			setChecked(false);
		} else {
			setChecked(true);
		}
	}, []);

	return (
		<>
			<StyledControlWithLabel>
				<FormControlLabel
					control={
						<IOSSwitch
							checked={checked}
							onChange={handleChange}
							name="checked"
						/>
					}
					label="DarkMode"
				/>
			</StyledControlWithLabel>
			<StyledControl>
				<FormControlLabel
					control={
						<IOSSwitch
							checked={checked}
							onChange={handleChange}
							name="checked"
						/>
					}
					label=""
				/>
			</StyledControl>
		</>
	);
};

const StyledControlWithLabel = styled(FormGroup)`
	@media screen and (max-width: 1000px) {display: none};
`;

const StyledControl = styled(FormGroup)`
	@media screen and (min-width: 1000px) {display: none};
`;

const IOSSwitch = withStyles((theme: Theme) => ({
	root: {
		width: 42,
		height: 26,
		padding: 0,
		margin: theme.spacing(1),
		marginLeft: theme.spacing(2),
		marginDown: theme.spacing(10),
	},
	switchBase: {
		padding: 1,
		'&$checked': {
			transform: 'translateX(16px)',
			color: 'white',
			'& + $track': {
				backgroundColor: 'grey',
				opacity: 1,
				border: 'none',
			},
		},
		'&$focusVisible $thumb': {
			color: 'white',
			border: '6px solid #fff',
		},
	},
	thumb: {
		width: 24,
		height: 24,
	},
	track: {
		borderRadius: 26 / 2,
		border: `1px solid ${theme.palette.grey[400]}`,
		backgroundColor: theme.palette.grey[50],
		opacity: 1,
		transition: theme.transitions.create(['background-color', 'border']),
	},
	checked: {},
	focusVisible: {},
}))(({ classes, ...props }: Props) =>
	<Switch
		focusVisibleClassName={classes.focusVisible}
		classes={{
			root: classes.root,
			switchBase: classes.switchBase,
			thumb: classes.thumb,
			track: classes.track,
			checked: classes.checked,
		}}
		{...props}
	/>
);

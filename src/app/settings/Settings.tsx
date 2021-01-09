import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField, makeStyles, InputAdornment } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { IDispatchProps } from '@app/settings/SettingsContainer';
import { Breakpoints } from '@app/common/enums/breakpoints';

const useStyles = makeStyles({
	root: {
		marginTop: '60px',
		[`@media (max-width: ${Breakpoints.MOBILE}px)`]: {
			margin: '80px 32px',
		},
	},
});

interface IPassword {
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
	showOldPassword: boolean;
	showNewPassword: boolean;
	showConfirmPassword: boolean;
	errors: Record<string, string>;
}

export const Settings: React.FC<IDispatchProps> = ({ changePassword }) => {

	const classes = useStyles();

	const [values, setValues] = useState<IPassword>({
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: '',
		showOldPassword: false,
		showNewPassword: false,
		showConfirmPassword: false,
		errors: {},
	});

	function onSendNewPassword() {
		changePassword(values.oldPassword, values.newPassword, values.confirmNewPassword);
	}

	const handleChange = (prop: keyof IPassword) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: e.target.value });
	};

	const handleClickShowOldPassword = () => {
		setValues({ ...values, showOldPassword: !values.showOldPassword });
	};

	const handleClickShowNewPassword = () => {
		setValues({ ...values, showNewPassword: !values.showNewPassword });
	};

	const handleClickShowConfirmPassword = () => {
		setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
	};

	const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	};

	return (
		<form className={classes.root}>
			<Card variant="outlined">
				<CardHeader
					subheader="Password"
					title="Password changing"
				/>
				<Divider />
				<CardContent>
					<TextField
						required
						fullWidth
						label="Old password"
						margin="normal"
						name="old-password"
						onChange={handleChange('oldPassword')}
						type={values.showOldPassword ? 'text' : 'password'}
						value={values.oldPassword}
						variant="outlined"
						InputProps={{
							endAdornment:
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowOldPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'
									>{values.showOldPassword ? <Visibility/> : <VisibilityOff/>}
									</IconButton>
								</InputAdornment>
							,
						}}
					/>
					<TextField
						required
						fullWidth
						label="New password"
						margin="normal"
						name="new-password"
						onChange={handleChange('newPassword')}
						type={values.showNewPassword ? 'text' : 'password'}
						value={values.newPassword}
						variant="outlined"
						InputProps={{
							endAdornment:
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowNewPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'
									>{values.showNewPassword ? <Visibility/> : <VisibilityOff/>}
									</IconButton>
								</InputAdornment>
							,
						}}
					/>
					<TextField
						required
						fullWidth
						label="Confirm new password"
						margin="normal"
						name="confirm-new-password"
						onChange={handleChange('confirmNewPassword')}
						type={values.showConfirmPassword ? 'text' : 'password'}
						value={values.confirmNewPassword}
						variant="outlined"
						InputProps={{
							endAdornment:
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowConfirmPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'
									>
										{ values.showConfirmPassword ? <Visibility/> : <VisibilityOff/> }
									</IconButton>
								</InputAdornment>
							,
						}}
					/>
				</CardContent>
				<Divider />
				<Box display="flex" justifyContent="flex-end" p={2}>
					<Button
						color="primary"
						variant="contained"
						onClick={onSendNewPassword}
					>
                            Send
					</Button>
				</Box>
			</Card>
		</form>
	);
};


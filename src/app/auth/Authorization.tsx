import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Footer } from '@app/common/components/Footer';
import { ThemeContext } from '@app/common/styles/Theme';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Link, Redirect } from 'react-router-dom';
import { ThemeSwitch } from '@app/common/components/ThemeSwitch';
import { IDispatchProps, IStateProps } from '@app/auth/AuthorizationContainer';
import { InputAdornment } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import { Routes } from '@app/common/enums/routes';
import styled from 'styled-components';
import { Breakpoints } from '@app/common/enums/breakpoints';
import street from '@app/assets/img/street.png';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: `url(${street})`,
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.grey[50],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(12, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	picture: {
		margin: theme.spacing(1),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: theme.palette.action.active,
		color: 'white',
		'&:hover': {
			backgroundColor: theme.palette.action.active,
			color: '#fafafa',
		},
	},
	right: {
		display: 'flex',
		flexDirection: 'row',
		position: 'absolute',
		right: '10px',
	},
	register: {
		color: 'white',
	},
	appBar: {
		background: theme.palette.primary.main,
	},
	title: {
		marginLeft: theme.spacing(2),
		color: 'white',
	},
}));

interface IAuthorization {
	username: string;
	password: string;
	showPassword: boolean;
}

export const Authorization: React.FC<IStateProps & IDispatchProps> = ({ isAuth, authorize }) => {

	const classes = useStyles();
	const { toggleTheme } = useContext(ThemeContext);
	const [completed, setCompleted] = React.useState(0);
	const [toDisable, setDisable] = React.useState(true);

	const [fake_isAuth, setFakeIsAuth] = React.useState(false);

	const [values, setValues] = React.useState<IAuthorization>({
		username: '',
		password: '',
		showPassword: false,
	});

	function progress() {
		setCompleted(oldCompleted => {
			if (oldCompleted === 100) {
				return 0;
			}
			const diff = Math.random() * 10;
			return Math.min(oldCompleted + diff, 100);
		});
	}

	React.useEffect(() => {
		let cleanupFunction = false;

		setTimeout(() => {
			if (!cleanupFunction) {
				setDisable(false);
			}
		}, 800);

		const timer = setInterval(progress, 500);
		return () => {
			clearInterval(timer);
			cleanupFunction = true;
		};
	}, []);


	const handleChange = (prop: keyof IAuthorization) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: e.target.value });
	};

	const toggleLocalTheme = () => {
		toggleTheme();
	};

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
		e.preventDefault();
		if (values.username === 'admin' && values.password === 'admin') {
			setFakeIsAuth(true);
		}
		authorize(values.username, values.password);
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	};

	if (fake_isAuth) {
		return <Redirect to={Routes.ROOT} />;
	}
	return (
		<Grid container component='main' className={classes.root}>
			<AppBar position="absolute" className={classes.appBar}>
				<Toolbar>
					<StyledTitle>
						<Typography component="h1" variant="h6" noWrap className={classes.title}>
              Hogwarts School of Witchcraft and Wizardry
						</Typography>
						<Typography variant="body1" noWrap className={classes.title}>
              Your Hogwarts house here
						</Typography>
					</StyledTitle>
					<div className={classes.right}>
						<ThemeSwitch toggleTheme={toggleLocalTheme}/>
						<Button className={classes.register} component={Link} to={'/register'} color='primary'>
              Registration
						</Button>
					</div>
				</Toolbar>
				{toDisable ? <LinearProgress value={completed}/> : null}
			</AppBar>

			<Grid item xs={false} sm={4} md={7} className={classes.image}/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

				<div className={classes.paper}>
					<Typography component='h1' variant='h5'>
            Login
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='username'
							label='Username'
							name='username'
							autoComplete='username'
							autoFocus
							onChange={handleChange('username')}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							id='password'
							autoComplete='password'
							onChange={handleChange('password')}
							InputProps={{
								endAdornment:
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{values.showPassword ? <Visibility/> : <VisibilityOff/>}
										</IconButton>
									</InputAdornment>
								,
							}}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='inherit'
							className={classes.submit}
							onClick={onSubmit}
						>Login</Button>

						<Box mt={8}>
							<Footer withBorder={false}/>
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

const StyledTitle = styled.div`
	@media screen and (max-width: ${Breakpoints.MOBILE}px) {display: none};
`;

import React, { useContext, useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputAdornment, FormControl, FormGroup, FormControlLabel, Checkbox, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { Footer } from '@app/common/components/Footer';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { fetchData } from '@app/common/helpers/fetchData';
import { IStateProps, IDispatchProps } from '@app/register/RegisterContainer';
import { ThemeContext } from '@app/common/styles/Theme';
import { ThemeSwitch } from '@app/common/components/ThemeSwitch';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Breakpoints } from '@app/common/enums/breakpoints';
import { groupList } from '@app/backend/groupList/groupList';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.background.paper,
	},
	paper: {
		color: theme.palette.type === 'light' ? 'black' : 'white',
		marginTop: theme.spacing(11),
		marginBottom: '35px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		background: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		padding: '20px',
	},
	submit: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(4),
		background: theme.palette.action.active,
		color: 'white',
		'&:hover': {
			backgroundColor: theme.palette.action.active,
			color: 'white',
		},
	},
	entry: { color: 'white' },
	control: {
		paddingTop: '7px',
	},
	picture: {
		margin: theme.spacing(1),
	},
	right: {
		display: 'flex',
		flexDirection: 'row',
		position: 'absolute',
		right: '10px',
	},
	appBar: {
		background: theme.palette.primary.main,
	},
	title: {
		marginLeft: theme.spacing(2),
		color: 'white',
	},
	notDisplay: {
		display: 'none',
	},
}));

interface IRegister {
	username: string;
	firstName: string;
	lastName: string;
	middleName: string;
	password: string;
	repeatPassword: string;
	showPassword1: boolean;
	showPassword2: boolean;
	email: string;
	isStudent: boolean;
	studyGroup: any;
	phone: string;
	errors: Record<string, string>;
}

export const Registration:React.FC<IStateProps & IDispatchProps> = ({ isAuth, register }) => {

	const classes = useStyles();
	const { toggleTheme } = useContext(ThemeContext);
	const [groupData, setGroupData] = useState([]);
	const [completed, setCompleted] = React.useState(0);
	const [toDisable, setDisable] = React.useState(true);

	const [values, setValues] = React.useState<IRegister>({
		username: '',
		firstName: '',
		lastName: '',
		middleName: '',
		isStudent: false,
		password: '',
		repeatPassword: '',
		email: '',
		showPassword1: false,
		showPassword2: false,
		studyGroup: '',
		phone: '',
		errors: {},
	});

	const { isStudent, studyGroup } = values;

	const handleChange = (prop: keyof IRegister) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: e.target.value });
	};

	const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.checked });
	};

	const handleClickShowPassword1 = () => {
		setValues({ ...values, showPassword1: !values.showPassword1 });
	};

	const handleClickShowPassword2 = () => {
		setValues({ ...values, showPassword2: !values.showPassword2 });
	};

	const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	};

	const toggleLocalTheme = () => {
		toggleTheme();
	};

	function progress() {
		setCompleted(oldCompleted => {
			if (oldCompleted === 100) {
				return 0;
			}
			const diff = Math.random() * 10;
			return Math.min(oldCompleted + diff, 100);
		});
	}

	useEffect(() => {
	  /*
		void fetchData('/api/groupList/')
			.then(res => res.json())
			.then(data => {
				setGroupData(data.message);
			});
	   */
		setGroupData(groupList);

		setTimeout(() => {
			setDisable(false);
		}, 800);

		const timer = setInterval(progress, 800);
		return () => {
			clearInterval(timer);
		};

	},[]);


	function onRegister() {
		const { lastName, firstName, middleName, password, phone, email, username , repeatPassword } = values;
		register(email, username, password, lastName, firstName, middleName, phone, studyGroup, repeatPassword);
	}

	if (isAuth) {
		return <Redirect to='/' />;
	}
	return (
		<div className={classes.root}>
			<AppBar position='absolute' className={classes.appBar}>
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
						<Button className={classes.entry} component={Link} to={'/'} color='primary'>
              Authorization
						</Button>
					</div>
				</Toolbar>
				{toDisable ? <LinearProgress value={completed}/> : null}
			</AppBar>
			<Container component='main' maxWidth='xs'>
				<div className={classes.paper}>
					<Typography component='h1' variant='h5'>
            Registration
					</Typography>
					<form className={classes.form} noValidate={true}>
						<Grid container={true} spacing={1}>

							<Grid item={true} xs={12}>
								<TextField
									variant='outlined'
									required={true}
									fullWidth={true}
									id='username'
									label='Username'
									name='username'
									autoComplete='username'
									autoFocus={true}
									onChange={handleChange('username')}
								/>
							</Grid>

							<Grid item={true} xs={12}>
								<TextField
									variant='outlined'
									required={true}
									fullWidth={true}
									id='lastName'
									label='Last name'
									name='lastName'
									autoComplete='lastname'
									onChange={handleChange('lastName')}
								/>
							</Grid>

							<Grid item={true} xs={12}>
								<TextField
									autoComplete='firstname'
									name='firstName'
									variant='outlined'
									required={true}
									fullWidth={true}
									id='firstName'
									label='First name'
									onChange={handleChange('firstName')}
								/>
							</Grid>

							<Grid item={true} xs={12}>
								<TextField
									autoComplete='secondname'
									name='secondName'
									variant='outlined'
									required={true}
									fullWidth={true}
									id='secondName'
									label='Middle name'
									onChange={handleChange('middleName')}
								/>
							</Grid>

							<Grid item={true} xs={12} sm={6}>
								<FormControl component='fieldset'>
									<FormGroup>
										<FormControlLabel
											control={<Checkbox
												checked={isStudent}
												onChange={handleCheckBoxChange}
												name='isStudent'/>}
											labelPlacement='start'
											label='I am a student'
											className={classes.control}
										/>
									</FormGroup>
								</FormControl>
							</Grid>

							<Grid item={true} xs={12} sm={6} className={clsx(!values.isStudent && classes.notDisplay)}>
								<TextField
									variant='outlined'
									required={true}
									fullWidth={true}
									select={true}
									name='studyGroup'
									label='Study group'
									id='studyGroup'
									autoComplete='studyGroup'
									onChange={handleChange('studyGroup')}
									value={studyGroup ? studyGroup : ''}
								>
									{groupData && groupData.map((option: { id: number; name: string}) =>
										<MenuItem key={option.id} value={option.id}>
											{option.name}
										</MenuItem>
									)}
								</TextField>
							</Grid>

							<Grid item={true} xs={12}>
								<TextField
									variant='outlined'
									required={true}
									fullWidth={true}
									id='email'
									label='E-mail'
									name='email'
									autoComplete='email'
									onChange={handleChange('email')}
								/>
							</Grid>

							<Grid item={true} xs={12}>
								<TextField
									variant='outlined'
									required={true}
									fullWidth={true}
									id='phone'
									label='Phone number'
									name='phone'
									autoComplete='phone'
									onChange={handleChange('phone')}
								/>
							</Grid>

							<Grid item={true} xs={12}>
								<TextField
									variant='outlined'
									required={true}
									fullWidth={true}
									name='password'
									label='Password'
									type={values.showPassword1 ? 'text' : 'password'}
									id='password'
									value={values.password}
									onChange={handleChange('password')}
									autoComplete='current-password'
									InputProps={{
										endAdornment:
										  <InputAdornment position='end'>
										  	<IconButton
										  		aria-label='toggle password visibility'
										  		onClick={handleClickShowPassword1}
										  		onMouseDown={handleMouseDownPassword}
										  		edge='end'
										  	>{values.showPassword1 ? <Visibility/> : <VisibilityOff/>}
										  	</IconButton>
										  </InputAdornment>
										,
									}}
								/>
							</Grid>

							<Grid item={true} xs={12}>
								<TextField
									variant='outlined'
									required={true}
									fullWidth={true}
									name='repeatPassword'
									label='Confirm your password'
									type={values.showPassword2 ? 'text' : 'password'}
									value={values.repeatPassword}
									id='repeat-password'
									autoComplete='current-repeatPassword'
									onChange={handleChange('repeatPassword')}
									InputProps={{
										endAdornment:
										  <InputAdornment position='end'>
										  	<IconButton
										  		aria-label='toggle password visibility'
										  		onClick={handleClickShowPassword2}
										  		onMouseDown={handleMouseDownPassword}
										  		edge='end'
										  	>
										  		{values.showPassword2 ? <Visibility/> : <VisibilityOff/>}
										  	</IconButton>
										  </InputAdornment>
										,
									}}
								/>
							</Grid>

							<Button
								fullWidth={true}
								variant='contained'
								color='inherit'
								className={classes.submit}
								onClick={onRegister}
							>
                Register
							</Button>

						</Grid>
					</form>
				</div>
				<Footer withBorder={false}/>
			</Container>

		</div>
	);
};

const StyledTitle = styled.div`
	@media screen and (max-width: ${Breakpoints.MOBILE}px) {display: none};
`;

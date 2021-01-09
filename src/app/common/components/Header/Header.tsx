import React, { useContext } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import { ThemeSwitch } from '@app/common/components/ThemeSwitch';
import logo from '@app/assets/img/logo.png';
import { Avatar, Theme } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import WorkIcon from '@material-ui/icons/Work';
import LayersIcon from '@material-ui/icons/Layers';
import SettingsIcon from '@material-ui/icons/Settings';
import { ThemeContext } from '@app/common/styles/Theme';
import { IDispatchProps, IStateProps } from '@app/common/components/Header/HeaderContainer';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import styled from 'styled-components';
import { Breakpoints } from '@app/common/enums/breakpoints';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		[`@media (max-width: ${Breakpoints.MOBILE}px)`]: {
			marginLeft: 0,
			width: '100%',
		},
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	menuButton: {
		marginRight: 30,
	},
	hide: {
		display: 'none',
	},
	title: {
		marginLeft: theme.spacing(2),
		color: 'white',
		flexGrow: 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		background: theme.palette.background.paper,
		padding: theme.spacing(3),
		marginLeft: -drawerWidth,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	contentShift: {
		flexShrink: 1,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
		[`@media (max-width: ${Breakpoints.MOBILE}px)`]: {
			marginLeft: -drawerWidth,
		},
	},
	main: {
		width: '100%',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : '#212121',
		minHeight: 'calc(100vh-85px)',
	},
	profile: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: 'fit-content',
		padding: theme.spacing(1),
	},
	avatar: {
		width: 50,
		height: 50,
		background: theme.palette.type === 'light' ? theme.palette.secondary.main : theme.palette.primary.light,
	},
	user: {
		marginTop: theme.spacing(1),
	},
	appBarSpacer: {
		marginTop: theme.spacing(8),
	},
	grow: {
		flexGrow: 1,
	},
}));

interface IProps {
	name: string;
	children: React.ReactNode;
}

export const Header: React.FC<IProps & IStateProps & IDispatchProps> = ({ children, name, username, role, getRole, logout }) => {
	const classes = useStyles();

	const [_open, setOpen] = React.useState(false);
	const [completed, setCompleted] = React.useState(0);
	const [toDisable, setDisable] = React.useState(true);
	const { toggleTheme } = useContext(ThemeContext);

	const toggleLocalTheme = () => {
		toggleTheme();
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
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

	React.useEffect(() => {
		getRole();

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

	const logOut = () => {
		logout();
	};

	return (
		<div className={classes.root}>
			<AppBar position="fixed"
				className={clsx(classes.appBar,
					{ [classes.appBarShift]: _open }, classes.root)}
			>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, _open && classes.hide)}
					>
						<MenuIcon/>
					</IconButton>
					<StyledTitle variant="h6" noWrap className={classes.title}>
						{name}
					</StyledTitle>

					<div className={classes.grow} />

					<ThemeSwitch toggleTheme={toggleLocalTheme}/>
					<IconButton
						edge="end"
						onClick={logOut}
					>
						<ExitToAppIcon style={{ color: 'white' }}/>
					</IconButton>
				</Toolbar>
				{toDisable ? <LinearProgress value={completed}/> : null}
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={_open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>

				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronRightIcon />
					</IconButton>
				</div>

				<Divider />
				<div className={classes.profile}>
					<Avatar alt="Person" className={classes.avatar}/>
					<Typography className={clsx(classes.user, !_open && classes.hide)} variant="h6">
						{username}
					</Typography>
					<Typography className={clsx(!_open && classes.hide)} variant="body2">
						{ role === 1 ? 'Student' :
							role === 2 ? 'Teacher' :
								role === 3 ? 'Faculty' : '...'}
					</Typography>
				</div>
				<Divider />
				<List>

					<ListItem button component={Link} to='/news'>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='News' />
					</ListItem>

					<ListItem button component={Link} to='/papers'>
						<ListItemIcon>
							<LayersIcon />
						</ListItemIcon>
						<ListItemText primary='Papers' />
					</ListItem>

					{
						(role === 1 || role === 3) &&
						<ListItem button component={Link} to='/vacancy'>
							<ListItemIcon>
								<WorkIcon/>
							</ListItemIcon>
							<ListItemText primary='Vacancies'/>
						</ListItem>
					}

					<ListItem button component={Link} to='/settings'>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary='Settings' />
					</ListItem>

					<ListItem button component={Link} to='/support'>
						<ListItemIcon>
							<LiveHelpIcon />
						</ListItemIcon>
						<ListItemText primary='Support' />
					</ListItem>


				</List>
				<Divider />
			</Drawer>
			<div className={clsx(classes.content, { [classes.contentShift]: _open }, classes.main)}>
				<div className={classes.appBarSpacer} />
				{ children }
			</div>
		</div>
	);
};


const StyledTitle = styled(Typography)`
	@media screen and (max-width: ${Breakpoints.MOBILE}px) {display: none};
`;


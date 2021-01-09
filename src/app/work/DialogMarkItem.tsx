import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useParams } from 'react-router-dom';
import { IDispatchProps } from '@app/work/DialogMarkItemContainer';
import { MenuItem, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& .MuiTextField-root': {
				margin: theme.spacing(1),
				width: 200,
			},
		},
		formControl: {
			display: 'flex',
			displayDirection: 'row',
			justifyContent: 'space-evenly',
		},
		button: {
			marginTop: theme.spacing(2),
			color: 'white',
			background: theme.palette.background.default,
			'&:hover': {
				backgroundColor: theme.palette.background.default,
				color: 'white',
			},
		},
		exitButton: {
			color: 'white',
			background: theme.palette.background.default,
			'&:hover': {
				backgroundColor: theme.palette.background.default,
				color: 'white',
			},
		},
		redButton: {
			backgroundColor: theme.palette.action.active,
			color: 'white',
			'&:hover': {
				backgroundColor: theme.palette.action.active,
				color: 'white',
			},
		},
		buttons: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-evenly',
		},
	}),
);

interface IState {
	letter: string;
	mark: string;
}

const Transition = React.forwardRef((
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

export const DialogMarkItem: React.FC<IDispatchProps> = ({ postMark }) => {

	const classes = useStyles();
	const [openDialog, setOpenDialog] = React.useState(false);

	const [values, setValues] = React.useState<IState>({
		letter: '',
		mark: '',
	});

	const { id } = useParams();
	const letters = [
		{
			value: 'A',
			label: 'A',
		},
		{
			value: 'B',
			label: 'B',
		},
		{
			value: 'C',
			label: 'C',
		},
		{
			value: 'D',
			label: 'D',
		},
		{
			value: 'E',
			label: 'E',
		},
		{
			value: 'F',
			label: 'F',
		},
	];

	const handleClickOpen = () => {
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
		setValues({ letter: '', mark: '' });
	};

	const handleChange = (prop: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: e.target.value });
	};

	function onSendMark() {
		postMark(id, values.letter, values.mark);
		setValues({ letter: '', mark: '' });
	}

	return (
		<React.Fragment>
			<Button className={classes.button} size="small" onClick={handleClickOpen}>
				Поставить оценку
			</Button>
			<Dialog
				open={openDialog}
				onClose={handleClose}
				TransitionComponent={Transition}
				keepMounted
				fullWidth={true}
				maxWidth='sm'
				aria-labelledby="dialog-title"
			>
				<DialogTitle id="dialog-title">Добавить комментарий</DialogTitle>
				<Divider />
				<DialogContent>
					<form className={classes.root} noValidate>
						<div className={classes.formControl}>

							<TextField
								id="letter"
								select
								label="Выберите букву"
								value={values.letter}
								fullWidth={false}
								required={true}
								onChange={handleChange('letter')}
							>
								{letters.map(option =>
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								)}
							</TextField>

							<TextField
								autoComplete='mark'
								name='mark'
								variant='outlined'
								required={true}
								fullWidth={false}
								id='mark'
								label='Оценка'
								value={values.mark}
								onChange={handleChange('mark')}
								InputLabelProps={{
									shrink: true,
								}}
							/>

						</div>

					</form>
				</DialogContent>
				<Divider />
				<DialogActions className={classes.buttons}>
					<Button onClick={() => {
						onSendMark();
						handleClose();
					}}
					className={classes.exitButton} size="small">
						Отправить
					</Button>
					<Button onClick={ () => {
						handleClose();
					}} className={classes.redButton} size="small">
						Отменить
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

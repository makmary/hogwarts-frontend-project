import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useParams } from 'react-router-dom';
import { IDispatchProps } from '@app/work/DialogItemContainer';
import { Breakpoints } from '@app/common/enums/breakpoints';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		form: {
			display: 'flex',
			flexDirection: 'column',
		},
		formControl: {
			minWidth: '100%',
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
		submit: {
			marginTop: theme.spacing(2),
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

const Transition = React.forwardRef((
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

export const DialogItem: React.FC<IDispatchProps> = ({ postComment }) => {

	const classes = useStyles();
	const [openDialog, setOpenDialog] = React.useState(false);
	const [text, setText] = React.useState('');
	const { id } = useParams();

	const handleClickOpen = () => {
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
		setText('');
	};

	const handleChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	function onSendComment() {
		postComment(id, text);
		setText('');
	}

	return (
		<React.Fragment>
			<Button className={classes.button} size="small" onClick={handleClickOpen}>
				Оставить комментарий
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
				<DialogContent>
					<form className={classes.form} noValidate>
						<FormControl className={classes.formControl}>
							<TextField
								autoComplete='comment'
								multiline
								name='comment'
								variant='outlined'
								required={true}
								fullWidth={false}
								id='comment'
								label='Комментарий'
								value={text}
								onChange={handleChange()}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions className={classes.buttons}>
					<Button onClick={() => {
						onSendComment();
						handleClose();
					}}
					className={classes.submit} size="small">
              Отправить
					</Button>
					<Button onClick={ () => {
						handleClose();
					}} className={classes.button} size="small">
              Отменить
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

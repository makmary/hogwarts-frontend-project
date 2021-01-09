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
import { IDispatchProps } from '@app/work/DialogReviewItemContainer';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		form: {
			display: 'flex',
			flexDirection: 'column',
		},
		formControl: {
			minWidth: '100%',
		},
		blueButton: {
			marginTop: theme.spacing(2),
			color: 'white',
			background: theme.palette.background.default,
			'&:hover': {
				backgroundColor: theme.palette.background.default,
				color: 'white',
			},
		},
		redButton: {
			marginTop: theme.spacing(2),
			backgroundColor: theme.palette.action.active,
			color: 'white',
			'&:hover': {
				backgroundColor: theme.palette.action.active,
				color: 'white',
			},
		},
		greenButton: {
			marginTop: theme.spacing(2),
			color: '#fafafa',
			background: '#4caf50',
			'&:hover': {
				backgroundColor: '#4caf50',
				color: '#fafafa',
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

export const DialogReviewItem: React.FC<IDispatchProps> = ({ sendReview }) => {

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
		sendReview(id, text);
		setText('');
	}

	return (
		<React.Fragment>
			<Button className={classes.greenButton} size="small" onClick={handleClickOpen}>
        Оставить отзыв
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
				<DialogTitle id="dialog-title">Добавить отзыв</DialogTitle>
				<DialogContent>
					<form className={classes.form} noValidate>
						<FormControl className={classes.formControl}>
							<TextField
								autoComplete='review'
								multiline
								name='review'
								variant='outlined'
								required={true}
								fullWidth={false}
								id='review'
								label='Максимальное количество символов: 1000'
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
					className={classes.blueButton} size="small">
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

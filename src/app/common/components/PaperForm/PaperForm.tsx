import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, Button, Divider, MenuItem, TextField, Theme } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import { IDispatchProps, IStateProps } from '@app/common/components/PaperForm/PaperFormContainer';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		height: '280px',
		width: '100%',
		maxWidth: '320px',
		margin: '10px',
	},
	title: {
		marginLeft: theme.spacing(2),
		marginTop: '5px',
		fontSize: '20',
		color: theme.palette.text.primary,
	},
	formControl: {
		marginTop: theme.spacing(1),
		minWidth: 280,
	},
	selectEmpty: {
		marginTop: theme.spacing(1),
	},
	avatar: {
		height: 45,
		width: 45,
		background: theme.palette.type === 'light' ? theme.palette.secondary.main : theme.palette.primary.light,
	},
	icon: {
		height: 32,
		width: 32,
	},
	content: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '40px',
		marginBottom: '10px',
	},
	button: {
		backgroundColor: 'white',
	},
	submit: {
		marginLeft: theme.spacing(1),
		backgroundColor: theme.palette.action.active,
		color: 'white',
		'&:hover': {
			backgroundColor: theme.palette.action.active,
			color: 'white',
		},
	},
	fields: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '130px',
	},
}));

interface IForm {
	advisory_id: number;
	theme: string;
	description: string;
	errors: Record<string, any>;
}

export const PaperForm: React.FC<IStateProps & IDispatchProps> = ({ itemsTeachers, getTeacherList, postWork }) => {
	const classes = useStyles();

	const [form, setFormValues] = React.useState<IForm>({
		advisory_id: 0,
		description: '',
		theme: '',
		errors: {},
	});

	const handleChange = (prop: keyof IForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormValues({ ...form, [prop]: e.target.value });
	};

	React.useEffect(() => {
		getTeacherList();
	},[]);

	const onAddForm = () => {
		const { description, theme, advisory_id } = form;
		postWork(description, theme, advisory_id);
	};

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<div className={classes.content}>
					<Typography className={classes.title} variant="h5" gutterBottom>
                    Создание НИР
					</Typography>
					<Avatar className={classes.avatar}>
						<CreateIcon className={classes.icon} />
					</Avatar>
				</div>
				<Divider/>
				<div className={classes.fields}>

					<TextField
						className={classes.formControl}
						variant='outlined'
						required={true}
						fullWidth={false}
						select={true}
						name='teacherName'
						label='Выберите научного руководителя'
						id='teacherName'
						autoComplete='teacherName'
						onChange={handleChange('advisory_id')}
						value={form.advisory_id || ''}
					>
						{
							itemsTeachers && itemsTeachers.map((teacher: {pk: number; lastName: string; firstName: string; middleName: string}) =>
								<MenuItem key={teacher.pk}
									value ={teacher.pk}
								> {teacher.lastName} {teacher.firstName} {teacher.middleName} </MenuItem>
							)
						}
					</TextField>
					<TextField required
						label="Описание работы"
						id="description"
						variant="outlined"
						className={classes.formControl}
						onChange={handleChange('description')}/>
				</div>
			</CardContent>
			<CardActions>
				<Button
					type='submit'
					variant='contained'
					color='inherit'
					size="small"
					className={classes.submit}
					onClick={onAddForm}>
                  Добавить
				</Button>
			</CardActions>
		</Card>
	);
};

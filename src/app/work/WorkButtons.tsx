import * as React from 'react';
import { Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { DialogItemContainer } from '@app/work/DialogItemContainer';
import { IDispatchProps, IStateProps } from '@app/work/WorkButtonsContainer';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DialogMarkItemContainer } from '@app/work/DialogMarkItemContainer';
import { DialogReviewItemContainer } from '@app/work/DialogReviewItemContainer';

const useStyles = makeStyles((theme: Theme) => ({
	button: {
		marginTop: theme.spacing(2),
		color: '#fafafa',
		background: theme.palette.background.default,
		'&:hover': {
			backgroundColor: theme.palette.background.default,
			color: '#fafafa',
		},
	},
	redButton: {
		marginTop: theme.spacing(2),
		color: '#fafafa',
		background: '#f44336',
		'&:hover': {
			backgroundColor: '#f44336',
			color: '#fafafa',
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
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap',
		marginTop: theme.spacing(2),
	},
	input: {
		display: 'none',
	},
}));

interface IProps {
	pk: number;
	consultant_id: number;
	theme: string;
	objective: string;
	results: string;
	content: string;
	sources: string;
	reportFile: string;
	presentationFile: string;
	review: string;
}

export const WorkButtons: React.FC<IStateProps & IDispatchProps & IProps> = ({
	workStatus, role, consultant_id, review,
	pk, theme, objective, results, content, sources, editWork, deleteWork, popWork, pushWork, returnWork, returnWorkReport, getWork,
	showErrorSnackbar, showSuccessSnackbar,
}) => {

	const classes = useStyles();
	const { id } = useParams();
	const fileInput = React.createRef<HTMLInputElement>();
	const fileInput2 = React.createRef<HTMLInputElement>();

	function onEditWork() {
		editWork(pk, consultant_id, theme, objective, results, content, sources);
	}

	function onPushWork() {
		pushWork(pk);
	}

	function onPopWork() {
		popWork(pk);
	}

	function onDeleteWork() {
		deleteWork(pk);
	}

	function onReturnWork() {
		returnWork(pk);
	}

	function onReturnWorkReport() {
		returnWorkReport(pk);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (fileInput.current.files[0]) {
			const formData = new FormData();
			formData.append('file', fileInput.current.files[0]);
			formData.append('id', id);
			try {
				const response = await fetch('/api/report/upload/', {
					method: 'PUT',
					headers: {
						ContentType: 'multipart/form-data',
						Authorization: 'Bearer ' + localStorage.getItem('token'),
						credentials: 'include',
					},
					body: formData,
				});
				const result = await response.json();
				showSuccessSnackbar(result.message);
				setTimeout(() => getWork(id), 2000);
			} catch (error) {
				showErrorSnackbar('Ошибка');
			}
		} else {
			showErrorSnackbar('Файл не загружен');
		}
	}

	async function handleSubmitPres(e) {
		e.preventDefault();

		if (fileInput2.current.files[0]) {
			const formData = new FormData();
			formData.append('file', fileInput2.current.files[0]);
			formData.append('id', id);
			try {
				const response = await fetch('/api/pres/upload/', {
					method: 'PUT',
					headers: {
						ContentType: 'multipart/form-data',
						Authorization: 'Bearer ' + localStorage.getItem('token'),
						credentials: 'include',
					},
					body: formData,
				});
				const result = await response.json();
				showSuccessSnackbar(result.message);
				setTimeout(() => getWork(id), 2000);
			} catch (error) {
				showErrorSnackbar('Ошибка');
			}
		} else {
			showErrorSnackbar('Файл не загружен');
		}
	}

	return workStatus !== 0 && role &&
      <div className={classes.buttons}>
      	{
      		workStatus === 1
          &&
          role === 1
          &&
          <>
          	<Button className={classes.greenButton} size="small" variant="contained" onClick={() => onEditWork()}>
              Отправить работу на проверку
          	</Button>
          	<Button className={classes.redButton} size="small" variant="contained" onClick={() => onDeleteWork()}>
              Удалить работу
          	</Button>
          </>
      	}

      	{(workStatus === 2 || workStatus === 3)
        &&
        role === 1
        &&
        <Button className={classes.redButton} size="small" variant="contained" onClick={() => onReturnWork()}>
          Отозвать работу
        </Button>
      	}

      	{workStatus === 2
        &&
        role === 2
        &&
        <>
        	<Button className={classes.greenButton} size="small" variant="contained" onClick={() => onPushWork()}>
            Подтвердить работу
        	</Button>
        	<Button className={classes.redButton} size="small" variant="contained" onClick={() => onPopWork()}>
            Вернуть работу
        	</Button>
        </>
      	}

      	{workStatus === 3
        &&
        role === 3
        &&
        <>
        	<Button className={classes.greenButton} size="small" variant="contained" onClick={() => onPushWork()}>
            Подтвердить работу
        	</Button>
        	<Button className={classes.redButton} size="small" variant="contained" onClick={() => onPopWork()}>
            Вернуть работу
        	</Button>
        </>
      	}

      	{workStatus === 4
        &&
        role === 1
        &&
			<>
				<form onSubmit={handleSubmit}>
					<input
						type="file"
						ref={fileInput}
						accept=".doc, .docx, .pdf, .ppt, .pptx"
						id="report-button"
					/>
					<Button
						type="submit"
						className={classes.greenButton}
						size="small"
						variant="contained"
						startIcon={<CloudUploadIcon />}
					>
							Отправить отчет
					</Button>
				</form>
				<Button className={classes.redButton} size="small" variant="contained" onClick={() => onReturnWork()}>
				Вернуться к редактированию
				</Button>
			</>
      	}

      	{(workStatus === 5 || workStatus === 6)
        &&
        role === 1
        &&
        <Button className={classes.redButton} size="small" variant="contained" onClick={() => onReturnWorkReport()}>
          Отозвать отчёт
        </Button>
      	}

        {
          workStatus === 5
          &&
          role === 2
          &&
          review == ''
          &&
          <DialogReviewItemContainer />
        }

      	{
      	  workStatus === 5
        &&
        role === 2
        &&
            review != ''
        &&
        <>
        	<Button className={classes.greenButton} size="small" variant="contained" onClick={() => onPushWork()}>
            Подтвердить
        	</Button>
        	<Button className={classes.redButton} size="small" variant="contained" onClick={() => onPopWork()}>
            Отклонить
        	</Button>
        </>
      	}

      	{workStatus === 6
        &&
        role === 3
        &&
        <>
        	<Button className={classes.greenButton} size="small" variant="contained" onClick={() => onPushWork()}>
            Допустить к защите
        	</Button>
        	<Button className={classes.redButton} size="small" variant="contained" onClick={() => onPopWork()}>
            Отклонить
        	</Button>
        </>
      	}

      	{
        		workStatus === 7
				&&
				role === 1
				&&
				<form onSubmit={handleSubmitPres}>
				    <input
						type="file"
						ref={fileInput2}
						accept=".doc, .docx, .pdf, .ppt, .pptx"
						id="pres-button"
					/>
					<Button
						type="submit"
						className={classes.greenButton}
						size="small" variant="contained"
						startIcon={<CloudUploadIcon />}
					>
                        Отправить презентацию
					</Button>
				</form>
      	}

      	{
      		workStatus === 7
          &&
          role === 3
          &&
          <DialogMarkItemContainer />
      	}

      	{
      		workStatus !== 8 &&
          <DialogItemContainer/>
      	}
      	<Button className={classes.button} size="small" variant="contained" component={Link} to={'/papers'}>
          Вернуться к работам
      	</Button>
      </div>
	;
};

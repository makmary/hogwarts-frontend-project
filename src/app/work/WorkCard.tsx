import React from 'react';

import TextField from '@material-ui/core/TextField/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { MenuItem, Paper, Button, Theme, StyleRules, Divider } from '@material-ui/core';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import { withStyles } from '@material-ui/styles';
import { withRouter, match } from 'react-router-dom';
import { WorkButtonsContainer } from './WorkButtonsContainer';
import { IDispatchProps, IStateProps } from '@app/work/WorkCardContainer';
import { IFeed } from '@app/feed/interfaces/IFeed';
import RepeatIcon from '@material-ui/icons/Repeat';
import { ITeacher } from '@app/teacher/interfaces/ITeacher';
import styled from 'styled-components';

const styles = (theme: Theme) => {
	const style: StyleRules = {
		root: {
			display: 'flex',
			width: '100%',
			overflowY: 'scroll',
		},
		field: {
			marginTop: theme.spacing(2),
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(2),
    },
    marginTop: {
      marginTop: theme.spacing(2),
    },
    bigTextField: {
      marginTop: theme.spacing(2),
    },
    bigDude: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    button: {
      marginTop: theme.spacing(2),
      color: '#fafafa',
      background: theme.palette.background.default,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: '6px 16px',
      background: theme.palette.background.paper,
    },
    timeline: {
      position: 'absolute',
      right: '0',
    },
    input: {
      display: 'none',
    },
    extraFields: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(2),
    },
  };
  return style;
};


type IState = {
	id?: number;
	chosenTeacher?: number;
	theme?: string;
	objective?: string;
	results?: string;
	content?: string;
	sources?: string;
	reportFile?: string;
	presentationFile?: string;
	isNew?: boolean;
	teacher?: ITeacher[];
	review?: string;
};

interface DetailParams {
	id: string;
}

interface DetailsProps {
	match?: match<DetailParams>;
	classes: any;
}
type PropsType = IStateProps & IDispatchProps & DetailsProps;

class WorkCard extends React.Component<PropsType, IState> {
	private readonly reportLinkRef: React.RefObject<HTMLAnchorElement>;
	private readonly presentationLinkRef: React.RefObject<HTMLAnchorElement>;
	constructor(props : PropsType & IState) {
		super(props);
		this.reportLinkRef = React.createRef();
		this.presentationLinkRef = React.createRef();
		this.state = {
			id: 0,
			chosenTeacher: 0,
			theme: '',
			objective: '',
			results: '',
			content: '',
			sources: '',
			reportFile: '',
			presentationFile: '',
			isNew: true,
			teacher: [],
			review: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.onReportDownload = this.onReportDownload.bind(this);
		this.onPresentationDownload = this.onPresentationDownload.bind(this);
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		const numId = Number(id);
		this.setState({ id: numId });
		this.props.getWork(numId);
		this.props.getFeed(numId);
		this.props.getTeacherList();
		this.setState({ teacher: this.props.teacherList });

	}

	componentDidUpdate(prevProps: Readonly<IStateProps & IDispatchProps>) {
		const { workInfo } = this.props;
		const { id } = this.props.match.params;
		const numId = Number(id);
		if (prevProps.workInfo !== workInfo) {
			this.setState({ id: numId, chosenTeacher: workInfo.consultant_id, theme: workInfo.theme, objective: workInfo.objective,
				results: workInfo.results, content: workInfo.content, sources: workInfo.sources, reportFile: workInfo.reportFile,
				presentationFile: workInfo.presentationFile, isNew: workInfo.isNew, review: workInfo.review });
			this.props.getFeed(numId);
			if (this.props.role === 1) {
				this.props.getTeacherList();
				this.setState({ teacher: this.props.teacherList });
			}
		}
	}

	onReportDownload(e) {
		e.preventDefault();
		fetch(`/api/work/report/?id=${this.props.match.params.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/octet-stream',
				'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
		}).then(res => res.blob()).then(blob => {
			const href = window.URL.createObjectURL(blob);
			const a = this.reportLinkRef.current;
			a.download = this.props.workInfo.reportFile;
			a.href = href;
			a.click();
			a.href = '';
		}).catch(err => console.error(err));
	}

	onPresentationDownload(e) {
		e.preventDefault();
		fetch(`/api/work/presentation/?id=${this.props.match.params.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/octet-stream',
				'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
		}).then(res => res.blob()).then(blob => {
			const href = window.URL.createObjectURL(blob);
			const a = this.presentationLinkRef.current;
			a.download = this.props.workInfo.presentationFile;
			a.href = href;
			a.click();
			a.href = '';
		}).catch(err => console.error(err));
	}

	handleChange(prop: keyof IState) {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({ ...this.state, [prop]: e.target.value });
		};
	}

	render() {
		const { workInfo, classes, teacherList, role, statusId, feeds } = this.props;
		const consultantName = workInfo.consultantLastName + ' ' + workInfo.consultantFirstName + ' ' + workInfo.consultantMiddleName;

		return workInfo &&
			<div className={classes.root}>

				<Container component="main">
					<div className={classes.bigDude}>
						<div className={classes.column}>

							<Typography component="h1" variant="h6" color="textPrimary">
								Научный руководитель:
							</Typography>

							<TextField
								disabled
								className={classes.field}
								id="lastName"
								label="Фамилия"
								variant="outlined"
								value={workInfo.advisoryLastName ? workInfo.advisoryLastName : '' }
								InputLabelProps={{
									shrink: true,
								}}
							/>

							<TextField
								disabled
								className={classes.field}
								name="firstName"
								variant="outlined"
								id="firstName"
								label="Имя"
								value={workInfo.advisoryFirstName ? workInfo.advisoryFirstName : ''}
								InputLabelProps={{
									shrink: true,
								}}
							/>

							<TextField
								disabled
								className={classes.field}
								name="secondName"
								variant="outlined"
								id="secondName"
								label="Отчество"
								value={workInfo.advisoryMiddleName ? workInfo.advisoryMiddleName : ''}
								InputLabelProps={{
									shrink: true,
								}}
							/>

							<TextField
								disabled
								className={classes.field}
								variant="outlined"
								id="email"
								label="E-mail"
								name="email"
								value={workInfo.advisoryEmail ? workInfo.advisoryEmail : ''}
								InputLabelProps={{
									shrink: true,
								}}
							/>

							<TextField
								disabled
								className={classes.field}
								variant="outlined"
								name="telephone"
								label="Телефон"
								id="telephone"
								value={workInfo.advisoryPhone ? workInfo.advisoryPhone : ''}
								InputLabelProps={{
									shrink: true,
								}}
							>
							</TextField>

							<TextField
								disabled
								className={classes.field}
								variant="outlined"
								name="workPlace"
								label="Место работы"
								id="workPlace"
								value={workInfo.advisoryWorkPlace ? workInfo.advisoryWorkPlace : ''}
								InputLabelProps={{
									shrink: true,
								}}
							>
							</TextField>

							<TextField
								disabled
								className={classes.field}
								variant="outlined"
								name="position"
								label="Должность"
								id="position"
								value={ workInfo.advisoryPosition ? workInfo.advisoryPosition : ''}
								InputLabelProps={{
									shrink: true,
								}}
							>
							</TextField>

							<TextField
								disabled
								className={classes.field}
								variant="outlined"
								name="academicRank"
								label="Учёное звание"
								id="academicRank"
								value={ workInfo.advisoryAcademicRank ? workInfo.advisoryAcademicRank : ''}
								InputLabelProps={{
									shrink: true,
								}}
							>
							</TextField>

							<TextField
								disabled
								className={classes.field}
								variant="outlined"
								name="degree"
								label="Учёная степень"
								id="degree"
								value={workInfo.advisoryAcademicDegree ? workInfo.advisoryAcademicDegree : ''}
								InputLabelProps={{
									shrink: true,
								}}
							>
							</TextField>


						</div>

						<div className={classes.column}>

							<Typography component="h1" variant="h6" color="textPrimary">
								Автор:
							</Typography>

							<TextField
								disabled
								className={classes.field}
								variant="outlined"
								id="author-lastName"
								label="Фамилия"
								name="lastName"
								value={workInfo.authorLastName ? workInfo.authorLastName : ''}
								InputLabelProps={{
									shrink: true,
								}}
							/>

							<TextField
								disabled
								className={classes.field}
								name="firstName"
								variant="outlined"
								id="author-firstName"
								label="Имя"
								value={workInfo.authorFirstName ? workInfo.authorFirstName : ''}
								InputLabelProps={{
									shrink: true,
								}}
							/>

							<TextField
								disabled
								className={classes.field}
								name="secondName"
								variant="outlined"
								id="author-secondName"
								label="Отчество"
								value={workInfo.authorMiddleName ? workInfo.authorMiddleName : ''}
								InputLabelProps={{
									shrink: true,
								}}
							/>

							<TextField
								disabled
								className={classes.field}
								variant="outlined"
								id="author-email"
								label="E-mail"
								name="email"
								value={workInfo.authorEmail ? workInfo.authorEmail : ''}
								InputLabelProps={{
									shrink: true,
								}}
							/>

							<TextField
								disabled
								className={classes.field}
								variant="outlined"
								name="telephone"
								label="Телефон"
								value={workInfo.authorPhone ? workInfo.authorPhone : ''}
								id="author-telephone"
								InputLabelProps={{
									shrink: true,
								}}
							>
							</TextField>

							<TextField
								disabled
								className={classes.field}
								variant="outlined"
								name="group"
								label="Группа"
								value={workInfo.authorGroup ? workInfo.authorGroup : ''}
								id="author-group"
								InputLabelProps={{
									shrink: true,
								}}
							>
							</TextField>

							{
								role === 1 && statusId === 1 &&
                                <>
                                	<Typography component="h1" variant="h6" color="textPrimary" className={classes.marginTop}>
										Консультант:
                                	</Typography>
                                	<TextField
                                		required
                                		variant='outlined'
                                		select={true}
                                		name='teacher'
                                		id='teacher'
                                		onChange={this.handleChange('chosenTeacher')}
                                		value={this.state.chosenTeacher || workInfo.consultant_id}
                                	>
                                		<MenuItem value={-1}>
										Нет
                                		</MenuItem>
                                		{
                                			teacherList.map((teacher: { pk: number; lastName: string; firstName: string; middleName: string }) =>
                                				workInfo.advisoryID !== teacher.pk
												&&
											<MenuItem key={teacher.pk} value={teacher.pk}>
												{teacher.lastName} {teacher.firstName} {teacher.middleName}
											</MenuItem>
                                			)
                                		}
                                	</TextField>
                                </>
							}

							{
								role === 1 && statusId !== 1 &&
                                <>
                                	<Typography component="h1" variant="h6" color="textPrimary" className={classes.marginTop}>
                                        Консультант:
                                	</Typography>
                                	<TextField
                                		required
                                		disabled
                                		variant='outlined'
                                		name='teacher'
                                		id='teacher'
                                		defaultValue={consultantName === '  ' ? 'Нет' : consultantName}
                                	/>
                                </>
							}

							<div className={classes.buttons}>
								{
									workInfo.reportFile &&
                    <a ref={this.reportLinkRef}>
                    	<Button variant="contained" color="primary"
                    		component="span" size="small"
                    		onClick={this.onReportDownload}
                    	>
                      Скачать отчёт
                    	</Button>
                    </a>
								}
								{
									workInfo.presentationFile &&
										<a ref={this.presentationLinkRef}>
											<Button variant="contained" color="primary"
												component="span" size="small"
												onClick={this.onPresentationDownload}
											>
												Скачать презентацию
											</Button>
										</a>
								}
							</div>

						</div>
					</div>

					<div className={classes.extraFields}>

						<Typography component="h1" variant="h6" color="textPrimary" className={classes.marginTop}>
							Общие сведения о работе:
						</Typography>

						<TextField
							disabled={statusId !== 1 || role !== 1}
							className={classes.bigTextField}
							required
							fullWidth
							multiline
							variant="outlined"
							id="theme"
							label="Тема работы"
							name="theme"
							value={this.state.theme || ''}
							// defaultValue={workInfo.theme}
							onChange={this.handleChange('theme')}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							disabled={statusId !== 1 || role !== 1}
							className={classes.bigTextField}
							required
							fullWidth
							multiline
							variant="outlined"
							id="objective"
							label="Цель работы"
							name="objective"
							value={this.state.objective}
							// defaultValue={workInfo.objective }
							onChange={this.handleChange('objective')}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							disabled={statusId !== 1 || role !== 1}
							className={classes.bigTextField}
							required
							fullWidth
							multiline
							variant="outlined"
							id="content"
							label="Содержание и основные этапы работы"
							name="content"
							value={this.state.content}
							// defaultValue={workInfo.content }
							onChange={this.handleChange('content')}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							disabled={statusId !== 1 || role !== 1}
							className={classes.bigTextField}
							fullWidth
							multiline
							variant="outlined"
							id="results"
							label="Ожидаемые результаты и формы их реализации"
							name="results"
							value={this.state.results}
							// defaultValue={workInfo.results}
							onChange={this.handleChange('results')}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							disabled={statusId !== 1 || role !== 1}
							className={classes.bigTextField}
							fullWidth
							multiline
							variant="outlined"
							id="sources"
							label="Основные источники информации"
							name="sources"
							value={this.state.sources}
							// defaultValue={workInfo.sources}
							onChange={this.handleChange('sources')}
							InputLabelProps={{
								shrink: true,
							}}
						/>

            { workInfo.review &&
              <TextField
                disabled={statusId !== 1 || role !== 1}
                className={classes.bigTextField}
                fullWidth
                multiline
                variant="outlined"
                id="review"
                label="Отзыв научного руководителя"
                name="review"
                value={this.state.review}
                // defaultValue={workInfo.sources}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            }

						<WorkButtonsContainer
							pk={this.state.id}
							consultant_id={this.state.chosenTeacher}
							theme={this.state.theme}
							objective={this.state.objective}
							results={this.state.results}
							content={this.state.content}
							sources={this.state.sources}
							reportFile={this.state.reportFile}
							presentationFile={this.state.presentationFile}
							review={this.state.review}
						/>
					</div>

					<Timeline align="alternate">
						{
							feeds.map((feed: IFeed) => {
								const date = new Date(feed.date);
								return (
									<TimelineItem key={feed.id}>

										<TimelineOppositeContent>
											<Typography variant="body2" color="textSecondary">
												{date.toLocaleString('ru')}
											</Typography>
										</TimelineOppositeContent>

										<TimelineSeparator>
											<TimelineDot color="secondary">
												<RepeatIcon/>
											</TimelineDot>
											<TimelineConnector/>
										</TimelineSeparator>
										<StyledTimelineContent>
											<Paper elevation={3} className={classes.paper}>
												<Typography variant="h6" component="h1">
													{feed.user.lastName} {feed.user.firstName} {feed.user.middleName}
												</Typography>
												<Divider/>
												<Typography variant="body2">{feed.text}</Typography>
											</Paper>
										</StyledTimelineContent>
									</TimelineItem>);
							})
						}
					</Timeline>
				</Container>
			</div>
		;
	}
}

export default withStyles(styles)(withRouter(WorkCard as any));

const StyledTimelineContent = styled(TimelineContent)`
  min-height: 100px;
`;

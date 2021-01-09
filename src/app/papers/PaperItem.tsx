import React from 'react';

import {makeStyles, StyleRules, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider, Button, Avatar } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => {
  const style: StyleRules = {
    root: {
      width: '320px',
      margin: '10px',
      height: '280px',
      position: 'relative',
    },
    student: {
      fontSize: '10',
    },
    theme: {
      marginBottom: theme.spacing(1),
      wordWrap: 'break-word',
    },
    desc: {
      marginTop: theme.spacing(1),
      wordWrap: 'break-word',
      whiteSpace: 'normal',
    },
    avatar: {
      height: 50,
      width: 50,
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
    },
    button: {
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(1),
      background: theme.palette.action.active,
      color: 'white',
      '&:hover': {
        backgroundColor: theme.palette.action.active,
        color: 'white',
      },
    },
    actions: {
      position: 'absolute',
      bottom: 0,
    },
  };
  return style;
});

export const PaperItem = (props: {id: number; theme: string; description: string; name: string; nameField: string}) => {

	const classes = useStyles();

	return (
		<Card className={classes.root} variant="outlined" key={props.id}>
			<CardContent>
				<div className={classes.content}>
					<Typography className={classes.student} color="textSecondary" gutterBottom>
						{props.name}
						<br/>
						{props.nameField}
					</Typography>
					<Avatar className={classes.avatar}>
						<AssignmentOutlinedIcon className={classes.icon} />
					</Avatar>
				</div>
				<Divider/>
				<Typography className={classes.desc} variant="body2" component="p">
					{props.description}
				</Typography>
			</CardContent>
			<CardActions className={classes.actions}>
				<Button className={classes.button} size="small" variant='contained' component={Link} to={`/papers/${props.id}`}>
                Просмотреть
				</Button>
			</CardActions>
		</Card>
	);
};


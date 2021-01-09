import * as React from 'react';
import { IDispatchProps, IStateProps } from '@app/news/NewsContainer';
import Container from '@material-ui/core/Container/Container';
import { makeStyles } from '@material-ui/core/styles';
import { NewsCard } from './NewsCard';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : '#212121',
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	news: {
		width: '100%',
	},
	productCard: {
		height: '100%',
		marginBottom: theme.spacing(2),
	},
}));

export const News: React.FC<IStateProps & IDispatchProps> = ({ status, news, getNewsList }) => {
	const classes = useStyles();


	React.useEffect(() => {
		//getNewsList();
	},[]);

	return (
		<Grid container>
			{(status !== 'SUCCESS' ? Array.from(new Array(5)) : news).map((item, index) =>
				<Box key={index} className={classes.news}>
					{item ?
						<Container maxWidth={false}>
							{
								<NewsCard
									className={classes.productCard}
									post={item}
									key={item.published_date}/>
							}
						</Container>
					 :
						<div>
							<Skeleton variant="text"/>
							<Skeleton variant="text"/>
							<Skeleton variant="rect" height={200} />
						</div>
					}
				</Box>
			)}
		</Grid>
	);
};


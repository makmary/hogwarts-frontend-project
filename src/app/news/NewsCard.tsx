import React, { useContext } from 'react';
import clsx from 'clsx';
import { Box, Card, CardContent, Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import parse from 'html-react-parser';
import styled, { css } from 'styled-components';
import { ThemeContext } from '@app/common/styles/Theme';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	statsItem: {
		alignItems: 'center',
		display: 'flex',
	},
	statsIcon: {
		marginRight: theme.spacing(1),
		color: theme.palette.primary.main,
	},
}));

export const NewsCard = ({ post, className, ...rest }) => {

	const classes = useStyles();
	const date = new Date(post.published_date);
	const { colorTheme } = useContext(ThemeContext);

	return (
		<Card
			className={clsx(classes.root, className)}
			{...rest}
		>
			<CardContent>
				<Typography
					align="left"
					color="textPrimary"
					gutterBottom
					variant="h4"
				>
					{post.title}
				</Typography>
				<Divider />
				<StyledTypography
					align="left"
					color="textPrimary"
					variant="body1"
					component={'div'}
					$colorTheme={colorTheme}
				>
					{parse(post.text)}
				</StyledTypography>
			</CardContent>
			<Box flexGrow={1} />
			<Divider />
			<Box p={2}>
				<Grid
					container
					justify="space-between"
					spacing={2}
				>
					<Grid
						className={classes.statsItem}
						item
					>
						<AccessTimeIcon
							className={classes.statsIcon}
							color="action"
						/>
						<Typography
							display="inline"
							variant="body2"
						>
							{date.toLocaleString('ru', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Card>
	);
};


/* const StyledTypography = styled(Typography)`
  ${props =>
    (props.colorTheme === 'dark') && css`
      a {
      color: green;
      text-decoration: none;
      background-image: linear-gradient(currentColor, currentColor);
      background-position: 0% 100%;
      background-repeat: no-repeat;
      background-size: 0% 2px;
      transition: background-size .3s;
      }

      a:hover {
      background-size: 100% 2px;
      }
    ` ||
    (props.colorTheme === 'light') && css`

      a {
      color: darkblue;
      text-decoration: none;
      background-image: linear-gradient(currentColor, currentColor);
      background-position: 0% 100%;
      background-repeat: no-repeat;
      background-size: 0% 2px;
      transition: background-size .3s;
      }

      a:hover {
      background-size: 100% 2px;
      }
    `
}`*/

const StyledTypography = styled(({ ...props }) => <Typography {...props}/>)`
  ${props =>
		props.$colorTheme === 'dark' && css`
        a {
        color: green;
        }
    ` ||
    props.colorTheme === 'light' && css`
        a {
        color: darkblue;
        }
    `
}`;

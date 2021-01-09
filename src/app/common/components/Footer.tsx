import * as React from 'react';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Box } from '@material-ui/core';
import { Breakpoints } from '../enums/breakpoints';

const useStyles = makeStyles((theme: Theme) => ({
	words: {
		color: theme.palette.type === 'dark' ? 'white' : 'black',
	},
}));

interface IProps {
	withBorder: boolean;
}


export const Footer: React.FC<IProps> = props => {

	const classes = useStyles();

	if (props.withBorder) {
		return (
			<StyledFooter1>
				<Container maxWidth='sm'>
					<Typography variant='body1' className={classes.words}>
            Hogwarts School of Witchcraft and Wizardry
						<br/>
            Your Hogwarts house here
					</Typography>
					<Typography variant='body2' color='textSecondary'>
						{new Date().getFullYear()}
					</Typography>
				</Container>
			</StyledFooter1>
		);
	}
	return (
		<StyledFooter2>
			<Container maxWidth='sm'>
        <Typography variant='body1' className={classes.words}>
          Hogwarts School of Witchcraft and Wizardry
          <br/>
          Your Hogwarts house here
        </Typography>
				<Typography variant='body2' color='textSecondary'>
					{new Date().getFullYear()}
				</Typography>
			</Container>
		</StyledFooter2>
	);

};

const StyledFooter1 = styled(Box)`
  text-align: center;
  padding-bottom: 5px;
  height: 85px;
 	@media screen and (max-width: ${Breakpoints.MOBILE}px) {
 	margin-top: 5px;
 	height: 130px;
 	};
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

const StyledFooter2 = styled.footer`
  text-align: center;
  padding-bottom: 5px;
  height: 100px;
  display: flex;
  align-items: center;
`;

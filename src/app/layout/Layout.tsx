import styled from 'styled-components';
import { Flex } from '../common/components/Flex';
import * as React from 'react';
import { RouteProps } from 'react-router-dom';

interface IProps {
	children: React.ReactNode;
}

export const Layout: React.FC<IProps & RouteProps> = ({ children }: IProps) =>
	<LayoutStyled>
		<ContentStyled>
			{children}
		</ContentStyled>
	</LayoutStyled>
;

const LayoutStyled = styled(Flex)`
  height: 100%;
  overflow: auto;
`;

const ContentStyled = styled.div`
  flex-grow: 1;
`;

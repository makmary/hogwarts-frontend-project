import * as React from 'react';
import { AuthorizationContainer } from '@app/auth/AuthorizationContainer';

const AuthPage: React.FC = () => {

	React.useEffect(() => {
		document.title = 'Authorization';
	});

	return <AuthorizationContainer />;
};

export default AuthPage;

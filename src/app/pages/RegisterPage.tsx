import * as React from 'react';
import RegisterContainer from '@app/register/RegisterContainer';

const RegisterPage: React.FC = () => {

	React.useEffect(() => {
		document.title = 'Registration';
	});

	return (
		<RegisterContainer/>
	);
};

export default RegisterPage;

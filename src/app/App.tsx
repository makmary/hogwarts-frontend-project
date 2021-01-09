import * as React from 'react';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';

import CssBaseline from '@material-ui/core/CssBaseline';

import { createRootReducer } from '@app/reducers';
import { sagas } from '@app/sagas';
import { RouterContainer } from '@app/pages/Router/RouterContainer';
import { Layout } from '@app/layout/Layout';
import { ThemeProvider } from '@app/common/styles/Theme';
import { SuccessSnackbarContainer } from './snackbar/SuccessSnackbarContainer';
import { ErrorSnackbarContainer } from '@app/snackbar/ErrorSnackbarContainer';
import { SnackbarProvider } from 'notistack';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const store = createStore(
	createRootReducer(history),
	composeWithDevTools(
		applyMiddleware(
			sagaMiddleware,
			routerMiddleware(history),
		),
	),
);

sagaMiddleware.run(sagas);


export const App: React.FC = () =>
	<React.Fragment>
		<CssBaseline/>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<ThemeProvider>
					<Layout>
						<SuccessSnackbarContainer />
						<ErrorSnackbarContainer />
						<SnackbarProvider maxSnack={10} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
							<RouterContainer/>
						</SnackbarProvider>
					</Layout>
				</ThemeProvider>
			</ConnectedRouter>
		</Provider>
	</React.Fragment>
	;


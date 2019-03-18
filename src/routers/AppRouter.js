import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/Pages/DashboardPage';
import AdicionarMovimentacao from '../components/Pages/AdicionarMovimentacao';
import AdicionarConta from '../components/Pages/AdicionarConta';
import AdicionarCartao from '../components/Pages/AdicionarCartao';
import LoginPage from '../components/Pages/LoginPage';
import EditarContaPage from '../components/Pages/EditarContaPage';
import EditarMovimentacaoPage from '../components/Pages/EditarMovimentacaoPage';
import EditarCartaoPage from '../components/Pages/EditarCartaoPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
	<Router history={history} >
		<div>
			<Switch>				
				<PublicRoute path="/" component={LoginPage} exact={true} />
				<PrivateRoute path="/dashboard" component={DashboardPage} />
				<PrivateRoute path="/addMovimentacao" component={AdicionarMovimentacao}/>
				<PrivateRoute path="/addContas" component={AdicionarConta}/>
				<PrivateRoute path="/addCartao" component={AdicionarCartao}/>
				<PrivateRoute path="/editConta/:id" component={EditarContaPage}/>
				<PrivateRoute path="/editMovimentacao/:id" component={EditarMovimentacaoPage}/>
				<PrivateRoute path="/editCartao/:id" component={EditarCartaoPage} />
			</Switch>	
		</div>			
	</Router>
);

export default AppRouter;
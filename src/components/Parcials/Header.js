import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../../redux/action/auth';

export const Header = ({ startLogout }) => (
	<header>	
		<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
			<div className="container">			
				<Link className="navbar-brand" to="/dashboard">Gerenciador Financeiro</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarsExample07">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Adicionar</a>
							<div className="dropdown-menu" aria-labelledby="dropdown07">
								<Link className="dropdown-item" to="/addMovimentacao">Movimentação</Link>
								<Link className="dropdown-item" to="/addContas">Conta</Link>
								<Link className="dropdown-item" to="/addCartao">Cartão</Link>
							</div>
						</li>						
					</ul>
					<Link className="my-md-0 navbar-brand" to="#" onClick={startLogout}>Logout</Link> 						
				</div>
										
			</div>
		</nav>	
	</header>
);

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../../redux/action/auth';

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
        <h1 className="box-layout__title">Gerenciador Financeiro</h1>
        <p>Anote suas contas bancárias e cartões de créditos, suas movimentações de débitos e créditos e obtenha
          um maior controle financeiro.</p> 
        <button className="btn btn-primary" onClick={startLogin}>Login with Google</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

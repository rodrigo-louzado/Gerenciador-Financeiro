import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../../redux/action/auth';

export const LoginPage = ({ startLogin }) => (
  <div>
    <div>    
      <h1>Gerenciador Financeiro</h1> 
      <button onClick={startLogin}>Login with Google</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

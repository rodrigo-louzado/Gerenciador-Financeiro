import React from 'react';
import {connect} from 'react-redux';
import {startAdicionarConta} from '../../redux/action/actions';
import ContaForm from '../Parcials/ContaForm';
export class AdicionarConta extends React.Component {
  onSubmit = (conta) => {
    this.props.startAdicionarConta(conta);
    this.props.history.push('/dashboard');
  }

  render () {
    return (
      <div>
        <div className="page-header__top">
          <div className="container page-header__container">
            <h3 className="page-header__title">Adicionar Conta</h3>
          </div>
        </div>
        <div className="container form-align">
          <ContaForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAdicionarConta: (conta) => dispatch(startAdicionarConta(conta))
});

export default connect(undefined, mapDispatchToProps)(AdicionarConta);
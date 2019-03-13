import React from 'react';
import {connect} from 'react-redux';
import {startAdicionarCartao} from '../../redux/action/actions';
import CartaoForm from '../Parcials/CartaoForm';

export class AdicionarCartao extends React.Component {
  onSubmit = (cartao) => {
    this.props.startAdicionarCartao(cartao);
    this.props.history.push('/dashboard');
  }
  render () {
    return (
      <div>
        <div className="page-header__top">
          <div className="container page-header__container">
            <h3 className="page-header__title">Adicionar Cartão</h3>
          </div>
        </div>
        <div className="container form-align">
          <CartaoForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAdicionarCartao: (cartao) => dispatch(startAdicionarCartao(cartao))
});

export default connect(undefined, mapDispatchToProps)(AdicionarCartao);
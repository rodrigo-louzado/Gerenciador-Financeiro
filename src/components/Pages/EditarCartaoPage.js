import React from 'react';
import { connect } from 'react-redux';
import CartaoForm from '../Parcials/CartaoForm';
import { startEditarCartao, startRemoverCartao, startRemoverMovimentacoes } from '../../redux/action/actions';

export class EditarCartaoPage extends React.Component {
  onSubmit = (cartao) => {
    this.props.startEditarCartao(this.props.cartao.id, cartao);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoverMovimentacoes({conta: this.props.cartao.id});
    this.props.startRemoverCartao({ id: this.props.cartao.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header__top">
          <div className="container page-header__container">
            <h3 className="page-header__title">Editar Cartão</h3>
          </div>
        </div>
        <div className="container form-align">
          <CartaoForm
            cartao={this.props.cartao}
            onSubmit={this.onSubmit}
          />
          <button className="btn btn-primary button__remove" onClick={this.onRemove}>Deletar Cartão</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  cartao: state.cartoes.find((cartao) => cartao.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startEditarCartao: (id, cartao) => dispatch(startEditarCartao(id, cartao)),
  startRemoverCartao: (id) => dispatch(startRemoverCartao(id)),
  startRemoverMovimentacoes: (conta) => dispatch(startRemoverMovimentacoes(conta))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditarCartaoPage);
import React from 'react';
import { connect } from 'react-redux';
import ContaForm from '../Parcials/ContaForm';
import { startEditarConta, startRemoverConta, startRemoverMovimentacoes } from '../../redux/action/actions';

export class EditarContaPage extends React.Component {
  onSubmit = (conta) => {
    this.props.startEditarConta(this.props.conta.id, conta);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoverMovimentacoes({conta: this.props.conta.id});
    this.props.startRemoverConta({ id: this.props.conta.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header__top">
          <div className="container page-header__container">
            <h3 className="page-header__title">Editar Conta</h3>
          </div>
        </div>
        <div className="container form-align">
          <ContaForm
            conta={this.props.conta}
            onSubmit={this.onSubmit}
          />
          <button className="btn btn-primary button__remove" onClick={this.onRemove}>Deletar Conta</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  conta: state.contas.find((conta) => conta.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startEditarConta: (id, conta) => dispatch(startEditarConta(id, conta)),
  startRemoverConta: (id) => dispatch(startRemoverConta(id)),
  startRemoverMovimentacoes: (conta) => dispatch(startRemoverMovimentacoes(conta))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditarContaPage);
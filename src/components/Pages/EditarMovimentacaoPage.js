import React from 'react';
import { connect } from 'react-redux';
import MovimentacaoForm from '../Parcials/MovimentacaoForm';
import { startEditarConta, startEditarMovimentacao, startRemoverMovimentacao } from '../../redux/action/actions';
import {selectContasPorMovimentacao} from '../../redux/selector/selector'

export class EditarMovimentacaoPage extends React.Component {
  onSubmit = (movimentacao) => {
    this.props.startEditarMovimentacao(this.props.movimentacao.id, movimentacao);
    let contaObj = selectContasPorMovimentacao(this.props.contas, movimentacao.conta);
    let conta = {
      nome: contaObj.nome,
      saldo: contaObj.saldo
    }; 
    if(movimentacao.tipo === 'Receita') {
      conta.saldo = conta.saldo + movimentacao.valor;
      this.props.startEditarConta(movimentacao.conta, conta);
    } else {
      conta.saldo = conta.saldo - movimentacao.valor;
      this.props.startEditarConta(movimentacao.conta, conta);
    }
    this.props.history.push('/');
  };
  onRemove = () => {
    let contaObj = selectContasPorMovimentacao(this.props.contas, this.props.movimentacao.conta);
    if(contaObj === undefined) {
      this.props.startRemoverMovimentacao({ id: this.props.movimentacao.id });
      this.props.history.push('/');
    } else {
      let conta = {
        nome: contaObj.nome,
        saldo: contaObj.saldo
      }; 
      if(this.props.movimentacao.tipo === 'Receita') {
        conta.saldo = conta.saldo - this.props.movimentacao.valor;
        this.props.startEditarConta(this.props.movimentacao.conta, conta);
      } else {
        conta.saldo = conta.saldo + this.props.movimentacao.valor;
        this.props.startEditarConta(this.props.movimentacao.conta, conta);
      }
      this.props.startRemoverMovimentacao({ id: this.props.movimentacao.id });
      this.props.history.push('/');
    }
  };
  render() {
    return (
      <div>
        <div className="page-header__top">
          <div className="container page-header__container">
            <h3 className="page-header__title">Editar Movimentação</h3>
          </div>
        </div>
        <div className="container form-align"> 
          <MovimentacaoForm
            movimentacao={this.props.movimentacao}
            onSubmit={this.onSubmit}
          />
          <button className="btn btn-primary button__remove" onClick={this.onRemove}>Deletar Movimentação</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  movimentacao: state.movimentacoes.find((movimentacao) => movimentacao.id === props.match.params.id),
  contas: state.contas
});

const mapDispatchToProps = (dispatch) => ({
  startEditarConta: (id, conta) => dispatch(startEditarConta(id, conta)),  
  startEditarMovimentacao: (id, movimentacao) => dispatch(startEditarMovimentacao(id, movimentacao)),
  startRemoverMovimentacao: (id) => dispatch(startRemoverMovimentacao(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditarMovimentacaoPage);
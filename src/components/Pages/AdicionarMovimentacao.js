import React from 'react';
import {connect} from 'react-redux';
import {startAdicionarMovimentacao, startSetContas, startEditarConta} from '../../redux/action/actions';
import MovimentacaoForm from '../Parcials/MovimentacaoForm';

export class AdicionarMovimentacao extends React.Component {
  onSubmit = (movimentacao) => {    
    this.props.startAdicionarMovimentacao(movimentacao);
    let obj = {}
    this.props.contas.map((conta) => {
      if(conta.id === movimentacao.conta) {
        obj = {
          nome: conta.nome,
          saldo: conta.saldo
        }
      }
    });
    if(movimentacao.tipo === "Receita") {
      obj.saldo = obj.saldo + movimentacao.valor;
    } else {
      obj.saldo = obj.saldo - movimentacao.valor;
    }
    this.props.startEditarConta(movimentacao.conta, obj);
    this.props.history.push('/dashboard');
  }
  render () {
    return (
      <div>
        <div className="page-header__top">
          <div className="container page-header__container">
            <h3 className="page-header__title">Adicionar Movimentação</h3>
          </div>
        </div>
        <div className="container form-align">
          <MovimentacaoForm onSubmit={this.onSubmit}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contas: state.contas
});

const mapDispatchToProps = (dispatch, props) => ({
  startAdicionarMovimentacao: (movimentacao) => dispatch(startAdicionarMovimentacao(movimentacao)),
  startEditarConta: (id, novo) => dispatch(startEditarConta(id, novo))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdicionarMovimentacao);
import React from 'react';
import { connect } from 'react-redux';
import EditMovimentacaoForm from '../Parcials/EditMovimentacaoForm';
import { startEditarConta, startEditarMovimentacao, startRemoverMovimentacao, startEditarCartao } from '../../redux/action/actions';
import {selectContasPorMovimentacao, selectCartoesPorMovimentacao} from '../../redux/selector/selector'

export class EditarMovimentacaoPage extends React.Component {
  onSubmit = (movimentacao) => {
    // Caso a movimentação seja de cartões
    if(movimentacao.tipo === 'Despesa Cartão' || movimentacao.tipo === 'Pagar Cartão') {
      this.props.startEditarMovimentacao(this.props.movimentacao.id, movimentacao);
      let cartaoObj = selectCartoesPorMovimentacao(this.props.cartoes, movimentacao.conta);
      let cartao = {
        nome: cartaoObj.nome,
        total: cartaoObj.total
      };       
      if(movimentacao.tipo === 'Despesa Cartão') {
        //Remover valor anterior da despesa do cartão
        cartao.total = cartao.total - this.props.movimentacao.valor;
        this.props.startEditarCartao(movimentacao.conta, cartao);
        //Adicionar valor posterior da despesa do cartão
        cartao.total = cartao.total + movimentacao.valor;
        this.props.startEditarCartao(movimentacao.conta, cartao);
      } else {
        //Remover valor anterior do pagamento no cartão
        cartao.total = cartao.total + this.props.movimentacao.valor;
        this.props.startEditarCartao(movimentacao.conta, cartao);
        //Adicionar valor posterior do pagamento no cartão
        cartao.total = cartao.total - movimentacao.valor;
        this.props.startEditarCartao(movimentacao.conta, cartao);
      }
    } else {
      // Caso a movimentação seja de contas
      this.props.startEditarMovimentacao(this.props.movimentacao.id, movimentacao);
      let contaObj = selectContasPorMovimentacao(this.props.contas, movimentacao.conta);
      let conta = {
        nome: contaObj.nome,
        saldo: contaObj.saldo
      };
      if(movimentacao.tipo === 'Receita') {
        //Remover valor anterior da receita
        conta.saldo = conta.saldo - this.props.movimentacao.valor;
        this.props.startEditarConta(movimentacao.conta, conta);
        //Adicionar novo valor da receita
        conta.saldo = conta.saldo + movimentacao.valor;
        this.props.startEditarConta(movimentacao.conta, conta);
      } else if (movimentacao.tipo === 'Despesa') {
        //Remover valor anterior da despesa
        conta.saldo = conta.saldo + this.props.movimentacao.valor;
        this.props.startEditarConta(movimentacao.conta, conta);
        //Adicionar novo valor da despesa
        conta.saldo = conta.saldo - movimentacao.valor;
        this.props.startEditarConta(movimentacao.conta, conta);
      }      
    }
    this.props.history.push('/');    
  };
  onRemove = () => {    
    // Caso a movimentação seja de cartões
    if(this.props.movimentacao.tipo === 'Despesa Cartão' ||this.props.movimentacao.tipo === 'Pagar Cartão') {
      let cartaoObj = selectCartoesPorMovimentacao(this.props.cartoes, this.props.movimentacao.conta);
      if(cartaoObj === undefined) {
        this.startRemoverMovimentacao({ id: this.props.movimentacao.id });
        this.props.history.push('/');
      } else {
        let cartao = {
          nome: cartaoObj.nome,
          total: cartaoObj.total
        };
        if(this.props.movimentacao.tipo === 'Despesa Cartão') {
          cartao.total = cartao.total - this.props.movimentacao.valor;
          this.props.startEditarCartao(this.props.movimentacao.conta, cartao);
        } else {
          cartao.total = cartao.total + this.props.movimentacao.valor;
          this.props.startEditarCartao(this.props.movimentacao.conta, cartao);
        }
        this.props.startRemoverMovimentacao({ id: this.props.movimentacao.id });
      }
    } else {
      // Caso a movimentação seja de contas
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
      }      
    }
    this.props.history.push('/');
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
          <EditMovimentacaoForm
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
  contas: state.contas,
  cartoes: state.cartoes
});

const mapDispatchToProps = (dispatch) => ({
  startEditarConta: (id, conta) => dispatch(startEditarConta(id, conta)),  
  startEditarMovimentacao: (id, movimentacao) => dispatch(startEditarMovimentacao(id, movimentacao)),
  startEditarCartao: (id, conta) => dispatch(startEditarCartao(id, conta)),
  startRemoverMovimentacao: (id) => dispatch(startRemoverMovimentacao(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditarMovimentacaoPage);
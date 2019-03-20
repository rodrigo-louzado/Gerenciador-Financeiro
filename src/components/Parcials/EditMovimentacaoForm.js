import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {selectContas, selectCartoes} from '../../redux/selector/selector';
import {DisableInputField} from './Select'

class EditMovimentacaoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descricao: props.movimentacao ? props.movimentacao.descricao : '',
      tipo: props.movimentacao ? props.movimentacao.tipo : 'Receita',
      valor: props.movimentacao ? (props.movimentacao.valor / 100).toString() : '',
      data: props.movimentacao ? moment(props.movimentacao.data) : moment(),
      calendarFocused: false,
      error: '',
      contas: props.contas,
      cartoes: props.cartoes,
      conta: '',
      cartao: ''
    };
  }
  
  onDescricaoChange = (e) => {
    const descricao = e.target.value;
    this.setState(() => ({ descricao }));
  };
  onTipoChange = (e) => {
    const tipo = e.target.value;
    this.setState(() => ({ tipo }));
  };
  onContaChange = (e) => {
    const conta = e;
    this.setState(() => ({ conta }))
  };
  onCartaoChange = (e) => {
    const cartao = e;
    this.setState(() => ({ cartao }))
  };
  onValorChange = (e) => {
    const valor = e.target.value;

    if(!valor || valor.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ valor }));
    }
  };
  onDataChange = (data) => {
    if(data) {
      this.setState(() => ({ data }));
    }    
  };
  onFocusChange = ({focused}) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if(!this.state.descricao || !this.state.valor) {
      this.setState(() => ({error: 'Informe a descrição e valor'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        conta: this.state.conta || this.state.cartao,
        descricao: this.state.descricao,
        valor: parseFloat(this.state.valor, 10) * 100,
        data: this.state.data.valueOf(),
        tipo: this.state.tipo 
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Descrição" autoFocus value={this.state.descricao}
            onChange={this.onDescricaoChange}
          />
        </div>
        <div className="form-group">
          <input className="form-control" type="number" pattern="[0-9]+([\.][0-9][0-9])?" step="0.01" min="0" placeholder="Valor" value={this.state.valor} 
            onChange={this.onValorChange}
          />
        </div>
        <div className="form-group">
          <select className="form-control" onChange={this.onTipoChange} value={this.state.tipo} disabled>
            <option value='Receita'>Receita</option>
            <option value='Despesa'>Despesa</option>
            <option value='Despesa Cartão'>Despesa Cartão</option>
            <option value='Pagar Cartão'>Pagar Cartão</option>
          </select>
        </div>
        <div>
          {   
            this.state.tipo !== 'Despesa Cartão' && this.state.tipo !== 'Pagar Cartão' ? (
              this.state.contas.length === 0 ? (
                <p>Sem contas para vincular a movimentação</p>
              ) : (
                DisableInputField(this.state.conta, this.state.contas, this.onContaChange)
              )
            ) : (
              this.state.cartoes.length === 0 ? (
                <p>Sem cartões para vincular a movimentação</p>
              ) : (
                DisableInputField(this.state.cartao, this.state.cartoes, this.onCartaoChange)
              )
            )
          }    
        </div>
        <SingleDatePicker
          date={this.state.data}
          onDateChange={this.onDataChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          displayFormat={"DD/MM/YYYY"}
          block
        />
        <div>
          <button className="btn btn-primary button-movimentacao__gravar">Salvar Movimentação</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contas: selectContas(state.contas),
    cartoes: selectCartoes(state.cartoes)
  }
};

export default connect(mapStateToProps)(EditMovimentacaoForm);
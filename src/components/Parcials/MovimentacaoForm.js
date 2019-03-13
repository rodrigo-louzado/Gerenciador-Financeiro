import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {selectContas} from '../../redux/selector/selector';
import {InputField} from './Select'

class MovimentacaoForm extends React.Component {
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
      conta: ''
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
        conta: this.state.conta,
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
          <input className="form-control" type="text" placeholder="Valor" value={this.state.valor} 
            onChange={this.onValorChange}
          />
        </div>
        <div className="form-group">
          <select className="form-control" onChange={this.onTipoChange} value={this.state.tipo}>
            <option value='Receita'>Receita</option>
            <option value='Despesa'>Despesa</option>
          </select>
        </div>        
        <div>    
          {
            this.state.contas.length === 0 ? (
              <p>Sem contas para vincular a movimentação</p>
            ) : (
              InputField(this.state.conta, this.state.contas, this.onContaChange)
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
    contas: selectContas(state.contas)
  }
};

export default connect(mapStateToProps)(MovimentacaoForm);
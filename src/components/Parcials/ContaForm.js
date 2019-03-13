import React from 'react';

export default class ContaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: props.conta ? props.conta.nome : '',
      saldo: props.conta ? (props.conta.saldo / 100).toString() : '',
      error: ''
    };
  }
  
  onNomeChange = (e) => {
    const nome = e.target.value;
    this.setState(() => ({ nome }));
  };

  onSaldoChange = (e) => {
    const saldo = e.target.value;

    if(!saldo || saldo.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ saldo }));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    if(!this.state.nome || !this.state.saldo) {
      this.setState(() => ({error: 'Informe o saldo e nome para a conta'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        nome: this.state.nome,
        saldo: parseFloat(this.state.saldo, 10) * 100
      });
    }
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
          <div className="form-group"> 
            <input className="form-control" type="text" placeholder="Nome" autoFocus value={this.state.nome}
              onChange={this.onNomeChange}
            />
          </div>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Saldo" value={this.state.saldo} 
              onChange={this.onSaldoChange}
            />
          </div>
          <button className="btn btn-primary">Salvar Conta</button>
      </form>
    )
  }
}
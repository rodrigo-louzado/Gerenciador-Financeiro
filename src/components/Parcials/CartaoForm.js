import React from 'react';

export default class CartaoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: props.cartao ? props.cartao.nome : '',
      total: props.cartao ? (props.cartao.total / 100).toString() : '',
      error: ''
    };
  }
  
  onNomeChange = (e) => {
    const nome = e.target.value;
    this.setState(() => ({ nome }));
  };

  onTotalChange = (e) => {
    const total = e.target.value;

    if(!total || total.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ total }));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    if(!this.state.nome || !this.state.total) {
      this.setState(() => ({error: 'Informe o saldo e o total da fatura atual para o cartão'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        nome: this.state.nome,
        total: parseFloat(this.state.total, 10) * 100
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Nome" autoFocus value={this.state.nome}
            onChange={this.onNomeChange}
          />
        </div>
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Total" value={this.state.total} 
            onChange={this.onTotalChange}
          />
        </div>         
        <div>
          <button className="btn btn-primary">Salvar Cartão</button>
        </div>
      </form>
    )
  }
}
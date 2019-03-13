import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';
import {connect} from 'react-redux';

export class MovimentacaoListItem extends React.Component {
  render () {
    return ( 
    <div>
      <Link to={`/editMovimentacao/${this.props.id}`}>
        <h3>{this.props.descricao}</h3>
      </Link>
      <p>
        {numeral(this.props.valor / 100).format('$0,0.00')}
      </p>
      <p>{this.props.tipo}</p>
      <p>{moment(this.props.data).format('DD/MM/YYYY')}</p>
      <p>
        {this.props.contas.map((conta) => {
          if(conta.id === this.props.conta){ 
            return conta.nome 
          }
          else {            
            return 'Conta vinculada na movimentação está mais cadastrada';
          }
        })}
      </p>
    </div>
    )    
  }
 };

const mapStateToProps = (state) => ({
  contas: state.contas
});

export default connect(mapStateToProps)(MovimentacaoListItem);
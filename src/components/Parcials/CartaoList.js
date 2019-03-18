import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import {selectCartoes} from '../../redux/selector/selector';

export const CartaoList = (props) => (    
  <div className="container"> 
    {
      props.cartoes.length === 0 ? (
        <p>Nenhum cartão cadastrado</p>
      ) : (
        <div className="table-responsive-md">
          <table className="table table-striped table-bottom">
            <thead className="thead-dark">
              <tr>
                  <th>Nome</th>
                  <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {props.cartoes.map((cartao) => {
                return <tr key={cartao.id}>                  
                  <th scope="row"><Link className="link_table_text_color" to={`/editCartao/${cartao.id}`}>{cartao.nome}</Link></th>      
                  <td>{numeral(cartao.total / 100).format('$0,0.00')}</td>  
                </tr>         
              })}  
            </tbody>    
          </table>
        </div>          
      )
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    cartoes: selectCartoes(state.cartoes)
  };
};

export default connect(mapStateToProps)(CartaoList);
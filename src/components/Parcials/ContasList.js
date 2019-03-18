import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
// import ContaListItem from './ContaListItem';
import {selectContas} from '../../redux/selector/selector';

export const ContaList = (props) => (
  <div className="container"> 
    {
      props.contas.length === 0 ? (
        <p>Nenhuma conta cadastrada</p>
      ) : (
        <div className="table-responsive-md">
          <table className="table table-striped table-bottom">
            <thead className="thead-dark">
              <tr>
                  <th>Conta</th>
                  <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {props.contas.map((conta) => {
                return <tr key={conta.id}>                  
                  <th scope="row"><Link className="link_table_text_color" to={`/editConta/${conta.id}`}>{conta.nome}</Link></th>      
                  <td>{numeral(conta.saldo / 100).format('$0,0.00')}</td>  
                </tr>         
              // <ContaListItem key={conta.id} {...conta} />
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
    contas: selectContas(state.contas)
  };
};

export default connect(mapStateToProps)(ContaList);
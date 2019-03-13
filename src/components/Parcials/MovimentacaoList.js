import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';
import {selectMovimentacoes} from '../../redux/selector/selector';

export const MovimentacaoList = (props) => (
  <div className="container">
    {
      props.movimentacoes.length === 0 ? (
        <p>Nenhuma movimentação cadastrada</p>
      ) : (
          <div className="table-responsive-md table-bottom">
            <table className="table table-bordered table-hover table-bottom">
              <thead className="thead-dark">
                <tr>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Tipo</th>
                  <th>Data</th>
                  <th>Conta</th>
                </tr>
              </thead>
              <tbody>
                {
                  props.movimentacoes.map((movimentacao) => {
                    return <tr key={movimentacao.id}>
                      <th scope="row"><Link className="link_table_text_color" to={`/editMovimentacao/${movimentacao.id}`}>{movimentacao.descricao}</Link></th>
                      <td>{numeral(movimentacao.valor / 100).format('$0,0.00')}</td>
                      <td>{movimentacao.tipo}</td>
                      <td>{moment(movimentacao.data).format('DD/MM/YYYY')}</td>
                      <td>{props.contas.map((conta) => {
                          if(conta.id === movimentacao.conta){ 
                            return conta.nome; 
                          } 
                        })}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>          
        )
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    movimentacoes: selectMovimentacoes(state.movimentacoes),
    contas: state.contas
  };
};

export default connect(mapStateToProps)(MovimentacaoList);

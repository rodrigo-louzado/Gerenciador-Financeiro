import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import {totalReceitas, totalDespesas, movimentacoesTotal} from '../../redux/selector/selector';

export const MovimentacaoSumario = ({ movimentacoesCount, movimentacoesTotal, totalReceitas, totalDespesas }) => {
  const movimentacoesWord = movimentacoesCount === 1 ? 'movimentação' : 'movimentações' ;
  const movimentacoesTotalFormatado = numeral(movimentacoesTotal / 100).format('$0,0.00');
  const totalReceitasFormatado = numeral(totalReceitas / 100).format('$0,0.00');
  const totalDespesasFormatado = numeral(totalDespesas / 100).format('$0,0.00');
  
  return (
    <div className="page-header">
      <div className="container page-header__container">
        <h3 className="page-header__title">
          {/* Apresentando {movimentacoesCount}  {movimentacoesWord} totalizando o 
           valor: {movimentacoesTotalFormatado}, sendo {totalReceitasFormatado} em receitas 
          e {totalDespesasFormatado} em despesas. */} 
          Movimentações totais: {movimentacoesTotalFormatado}, total em receitas: {totalReceitasFormatado}, 
          total em despesas: {totalDespesasFormatado}
        </h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movimentacoesCount: state.movimentacoes.length,
    movimentacoesTotal: movimentacoesTotal(state.movimentacoes),
    totalReceitas: totalReceitas(state.movimentacoes),
    totalDespesas: totalDespesas(state.movimentacoes)
  };
};

export default connect(mapStateToProps)(MovimentacaoSumario);

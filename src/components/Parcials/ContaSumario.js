import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import {contasTotal} from '../../redux/selector/selector';

export const ContaSumario = ({ contasCount, contasTotal }) => {
  const contasWord = contasCount === 1 ? 'conta' : 'contas' ;
  const contasTotalFormatado = numeral(contasTotal / 100).format('$0,0.00');
  
  return (
    <div className="page-header__top">
      <div className="container page-header__container">
        {/* <h3 className="page-header__title">Apresentando {contasCount}  {contasWord} totalizando saldo de: {contasTotalFormatado}</h3> */}
        <h3 className="page-header__title">Saldo total em contas: {contasTotalFormatado}</h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    contasCount: state.contas.length,
    contasTotal: contasTotal(state.contas)
  };
};

export default connect(mapStateToProps)(ContaSumario);

import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import {cartoesTotal} from '../../redux/selector/selector';

export const CartoesSumario = ({ contasCount, cartoesTotal }) => {
  const cartaoWord = contasCount === 1 ? 'cartão' : 'cartões' ;
  const cartoesTotalFormatado = numeral(cartoesTotal / 100).format('$0,0.00');
  
  return (
    <div className="page-header">
      <div className="container page-header__container">
        <h3 className="page-header__title">Gasto total em cartões: {cartoesTotalFormatado}</h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    contasCount: state.cartoes.length,
    cartoesTotal: cartoesTotal(state.cartoes)
  };
};

export default connect(mapStateToProps)(CartoesSumario);

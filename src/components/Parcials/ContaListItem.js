import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

const ContaListItem = ({ id, nome, saldo}) => (
  <div>
    <Link to={`/editConta/${id}`}>
      <h3>{nome}</h3>
    </Link>
    <p>
      {numeral(saldo / 100).format('$0,0.00')}
    </p>
  </div>
);

export default ContaListItem;


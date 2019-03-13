import React from 'react';
import ContaList from '../Parcials/ContasList';
import ContaSumario from '../Parcials/ContaSumario';
import MovimentacaoSumario from '../Parcials/MovimentacaoSumario';
import MovimentacaoList from '../Parcials/MovimentacaoList';

export class DashboardPage extends React.Component {
  render () {
    return (
      <div>
        <ContaSumario />
        <ContaList />
        <MovimentacaoSumario />
        <MovimentacaoList />
      </div>  
    );
  }
};

export default DashboardPage;
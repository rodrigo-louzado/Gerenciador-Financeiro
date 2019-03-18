import database from '../../firebase/firebase';

//Movimentação
export const adicionarMovimentacao = (movimentacao) => ({
  type: 'ADICIONAR_MOVIMENTACAO',
  movimentacao
});

export const startAdicionarMovimentacao = (movimentacaoData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {conta = '', descricao = '', tipo = '', data = 0, valor = 0} = movimentacaoData;
    const movimentacao = {conta, descricao, tipo, data, valor};

    database.ref(`users/${uid}/movimentacoes`).push(movimentacao).then((ref) => {
      dispatch(adicionarMovimentacao({
        id: ref.key,
        ...movimentacao
      }));
    });
  };
};

export const removerMovimentacao = ({ id } = {}) => ({
  type: 'REMOVER_MOVIMENTACAO',
  id
});

export const removerMovimentacoes = ({conta} = {}) => ({
  type: 'REMOVER_MOVIMENTACOES',
  conta
})

export const startRemoverMovimentacoes = ({conta} = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/movimentacoes`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if(childSnapshot.val().conta === conta) {
          childSnapshot.ref.remove();
        }
      });
      dispatch(removerMovimentacoes({conta}));
    });
  };
};

export const startRemoverMovimentacao = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/movimentacoes/${id}`).remove().then(() => {
      dispatch(removerMovimentacao({ id }));
    });
  };
};

export const editarMovimentacao = (id, novo) => ({
  type: 'EDITAR_MOVIMENTACAO',
  id,
  novo
});

export const startEditarMovimentacao = (id, novo) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/movimentacoes/${id}`).update(novo).then(() => {
      dispatch(editarMovimentacao(id, novo));
    });
  };
};


export const setMovimentacoes = (movimentacoes) => ({
  type: 'SET_MOVIMENTACOES',
  movimentacoes
});

export const startSetMovimentacoes = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/movimentacoes`).orderByChild('data').once('value').then((snapshot) => {
      const movimentacoes = [];

      snapshot.forEach((childSnapshot) => {
        movimentacoes.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setMovimentacoes(movimentacoes));
    });
  };
};

//Contas
export const adicionarConta = (conta) => ({
  type: 'ADICIONAR_CONTA',
  conta
});

export const startAdicionarConta = (contaData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {nome = '', saldo = 0} = contaData;
    const conta = {nome, saldo};

    database.ref(`users/${uid}/contas`).push(conta).then((ref) => {
      dispatch(adicionarConta({
        id: ref.key,
        ...conta
      }));
    });
  };
};

export const removerConta = ({ id } = {}) => ({
  type: 'REMOVER_CONTA',
  id
});

export const startRemoverConta = ({id} = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/contas/${id}`).remove().then(() => {
      dispatch(removerConta({id}));
    });
  };
};

export const editarConta = (id, novo) => ({
  type: 'EDITAR_CONTA',
  id,
  novo
});

export const startEditarConta = (id, novo) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/contas/${id}`).update(novo).then(() => {
      dispatch(editarConta(id, novo));
    });
  };
};

export const setContas = (contas) => ({
  type: 'SET_CONTAS',
  contas
});

export const startSetContas = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/contas`).orderByChild('nome').once('value').then((snapshot) => {
      const contas = [];

      snapshot.forEach((childSnapshot) => {
        contas.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setContas(contas));
    });
  };
};

//Cartão
export const adicionarCartao = (cartao) => ({
  type: 'ADICIONAR_CARTAO',
  cartao
});

export const startAdicionarCartao = (cartaoData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      nome = '',
      total = 0
    } = cartaoData;
    const cartao = { nome, total };

    return database.ref(`users/${uid}/cartoes`).push(cartao).then((ref) => {
      dispatch(adicionarCartao({
        id: ref.key,
        ...cartao
      }));
    });
  };
};


export const removerCartao = ({ id } = {}) => ({
  type: 'REMOVER_CARTAO',
  id
});

export const startRemoverCartao = ({id} = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/cartoes/${id}`).remove().then(() => {
      dispatch(removerCartao({id}));
    });
  };
};

export const editarCartao = (id, novo) => ({
  type: 'EDITAR_CARTAO',
  id,
  novo
});

export const startEditarCartao = (id, novo) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/cartoes/${id}`).update(novo).then(() => {
      dispatch(editarCartao(id, novo));
    });
  };
};

export const setCartoes = (cartoes) => ({
  type: 'SET_CARTOES',
  cartoes
});

export const startSetCartoes = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/cartoes`).once('value').then((snapshot) => {
      const cartoes = [];

      snapshot.forEach((childSnapshot) => {
        cartoes.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setCartoes(cartoes));
    });
  };
};
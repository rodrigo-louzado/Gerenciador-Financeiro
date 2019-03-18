const movimentacaoReducerDefaultState = [];

export const movimentacaoReducer = (state = movimentacaoReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADICIONAR_MOVIMENTACAO': 
      return [...state, action.movimentacao].sort((a, b) => {
        if(a.data > b.data)
          return 1;
        else if(b.data > a.data)
          return -1;
        else
          return 0
      });
    case 'EDITAR_MOVIMENTACAO': 
      return state.map((movimentacao) => {
        if(movimentacao.id === action.id) {
          return {
            ...movimentacao,
            ...action.novo
          };
        } else {
          return movimentacao;
        }
      });
    case 'REMOVER_MOVIMENTACAO': 
      return state.filter(({ id }) => id !== action.id);    
    case 'REMOVER_MOVIMENTACOES': return state.filter(({conta}) => conta !== action.conta);
    case 'SET_MOVIMENTACOES':
      return action.movimentacoes.sort((a, b) => {
        if(a.data > b.data)
          return 1;
        else if(b.data > a.data)
          return -1;
        else
          return 0;
      });
    default: return state;
  }
};

const cartaoReducerDefaultState = [];

export const cartaoReducer = (state = cartaoReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADICIONAR_CARTAO': 
      return [...state, action.cartao].sort((a, b) => {
        if(a.nome > b.nome)
          return 1;
        else if(b.nome > a.nome)
          return -1;
        else
          return 0
      });
    case 'EDITAR_CARTAO': 
      return state.map((cartao) => {
        if(cartao.id === action.id) {
          return {
            ...cartao,
            ...action.novo
          };
        } else {
          return cartao;
        }
      });
    case 'REMOVER_CARTAO': 
      return state.filter(({id}) => (id !== action.id ));
    case 'SET_CARTOES': return action.cartoes.sort((a, b) => {
      if(a.nome > b.nome)
        return 1;
      else if(b.nome > a.nome)
        return -1;
      else
        return 0
    });
    default: return state;
  }
};

const contasReducerDefaultState = [];

export const contasReducer = (state = contasReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADICIONAR_CONTA': return [...state, action.conta].sort((a, b) => {
      if(a.nome > b.nome)
        return 1;
      else if(b.nome > a.nome)
        return -1;
      else
        return 0
    });
    case 'EDITAR_CONTA': 
      return state.map((conta) => {
        if(conta.id === action.id) {
          return {
            ...conta,
            ...action.novo
          };      
        } else {
          return conta;
        };
      });
    case 'REMOVER_CONTA':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_CONTAS':
      return action.contas.sort((a, b) => {
        if(a.nome > b.nome)
          return 1;
        else if(b.nome > a.nome)
          return -1;
        else
          return 0
      });
    default: return state;  
  }
};

export const authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
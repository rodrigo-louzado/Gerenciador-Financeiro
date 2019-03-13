import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {movimentacaoReducer, cartaoReducer, contasReducer, authReducer} from '../redux/reducer/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(    
    combineReducers({
      movimentacoes: movimentacaoReducer,
      cartoes: cartaoReducer,
      contas: contasReducer,
      auth: authReducer
    }), 
    composeEnhancers(applyMiddleware(thunk)),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
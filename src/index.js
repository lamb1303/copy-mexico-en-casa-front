import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import registroReducer from './store/reducers/registro';
import clienteReducer from './store/reducers/cliente';
import headerReducer from './store/reducers/header';
import productsReducer from './store/reducers/products';
import negocioReducer from './store/reducers/negocio';
import homeReducer from './store/reducers/Home';
import ordersReducer from './store/reducers/orders';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;

const appReducer = combineReducers({
  registro: registroReducer,
  cliente: clienteReducer,
  header: headerReducer,
  home: homeReducer,
  products: productsReducer,
  negocio: negocioReducer,
  orders: ordersReducer,

});

const rootReducer = (state, action) => {
  if (action.type === 'HOME_LOGOUT') {
    localStorage.removeItem('user');
    state = undefined
  }


  return appReducer(state, action)
}

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

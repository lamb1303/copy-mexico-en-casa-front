import React, { Fragment, useEffect } from 'react';
import './App.css';
import * as actions from './store/actions';
import { connect } from 'react-redux'
import Registro from './components/Negocio/Registro/Registro';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Sidebar from './components/UI/Sidebar/Sidebar';
import Client from './components/Cliente/Client';
import Home from './components/Home/Home';
import RegistroCliente from './components/Cliente/RegistroCliente/RegistroCliente'
import ClientNegocio from './components/Cliente/Negocio/Negocio';
import Negocio from './components/Negocio/views/Negocio/Negocio';
import Pedido from './components/Cliente/Negocio/Pedido/Pedido'
import Pedidos from './components/Negocio/views/Pedidos/Pedidos';
import AddProduct from './components/Negocio/views/Negocio/AddProduct/AddProduct';

const App = (props) => {

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));
    if (storedData && storedData.token && storedData.isCustomer !== null) {
      console.log(`uno:  ${storedData.token}`);
      props.setLocalTokenStored(storedData);
    }

  });

  let route = (
    <Switch >
      <Route path='/Registro' component={Registro} />
      <Route path='/RegistroCliente' component={RegistroCliente} />
      <Route path='/Home' component={Home} />
      <Redirect to='/Home' />
    </Switch>
  )

  if (props.token && props.token !== "") {

    if (props.isCustomer) {
      route = (
        <Fragment>
          <Switch >
            <Route path='/Client' component={Client} />
            <Route path='/Negocio' component={ClientNegocio} />
            <Route path='/Pedido' component={Pedido} />
            <Redirect to='/Client' />
          </Switch>
        </Fragment>
      )
    } else {
      route = (
        <Fragment>
          <Switch >
            <Route path='/Negocio' component={Negocio} />
            <Route path='/Pedidos' component={Pedidos} />
            <Route path='/addProduct' component={AddProduct} />
            <Redirect to='/Negocio' />

          </Switch>
        </Fragment>
      )
    }
  }

  return (
    <Fragment>
      <Sidebar />
      <Header />
      {route}
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    token: state.home.token !== null,
    isCustomer: state.home.isCustomer,
  }
}

const mapDispatchToProps = {

  setLocalTokenStored: actions.setLocalTokenStored,
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

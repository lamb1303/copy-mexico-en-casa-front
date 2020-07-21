import React, { Fragment, useEffect, useCallback, useState } from 'react';
import './App.css';
import * as actions from './store/actions';
import { connect } from 'react-redux'
// import Registro from './components/Negocio/Registro/Registro';
import RegistroNegocio from './components/Negocio/Registro/RegistroNegocio';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Sidebar from './components/UI/Sidebar/Sidebar';
import Client from './components/Cliente/Client';
import EditClient from './components/Cliente/EditClient/EditClient';
import Home from './components/Home/Home';
import Landing from './components/Home/Landing/Landing';
import RegistroCliente from './components/Cliente/RegistroCliente/RegistroCliente'
import ClientNegocio from './components/Cliente/Negocio/Negocio';
import Negocio from './components/Negocio/views/Negocio/Negocio';
import Pedido from './components/Cliente/Negocio/Pedido/Pedido';
import Pedidos from './components/Negocio/views/Pedidos/Pedidos';
import AddProduct from './components/Negocio/views/Negocio/AddProduct/AddProduct';
import Spinner from './components/UI/Spinner/Spinner';
import Backdrop from './components/UI/Backdrop/Backdrop';
import EditBusiness from './components/Negocio/views/Negocio/EditNegocio/EditBusiness';

let logoutTimer;

const App = (props) => {

  const [expirationDate, setExpirationDate] = useState();
  const { getUserType, logOut } = props;
  let storagedToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;


  const logout = useCallback(() => {
    logOut();
    setExpirationDate(null);

  }, [logOut]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));

    if (storedData && storedData.token && storedData.id
      && new Date(storedData.expiration) > new Date()) {
      setExpirationDate(storedData.expiration);
      getUserType(storedData.id);

    } else {
      logout()
    }

  }, [getUserType, logout]);

  useEffect(() => {
    if (expirationDate) {
      const remainingTime = new Date(expirationDate).getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }

  }, [logout, expirationDate]);

  let route;

  if (!storagedToken || storagedToken === "" || storagedToken === null) {
    route = (
      <Switch >
        <Route path='/Registro' component={RegistroNegocio} />
        <Route path='/RegistroCliente' component={RegistroCliente} />
        <Route path='/Home' component={Home} />
        <Route exact path='/' component={Landing} />
        <Redirect to='/' />
      </Switch>
    )
  } else {

    if (props.isCustomer === null) {
      route = (
        <Fragment>
          <Backdrop show={true} />
          <Spinner />
        </Fragment>
      );

    } else {
      //if (storagedToken && storagedToken !== "") {

      if (props.isCustomer) {
        route = (
          <Fragment>
            <Switch >
              <Route path='/Client' component={Client} />
              <Route path='/VerNegocio' component={ClientNegocio} />
              <Route path='/editClient' component={EditClient} />
              <Route path='/Pedido' component={Pedido} />
              <Redirect to='/Client' />
            </Switch>
          </Fragment>
        )
      } else {
        route = (
          <Fragment>
            <Switch >
              <Route path='/pedidos' component={Pedidos} />
              <Route path='/Negocio' component={Negocio} />
              <Route path='/addProduct' component={AddProduct} />
              <Route path='/editBusiness' component={EditBusiness} />
              <Redirect to='/Negocio' />

            </Switch>
          </Fragment>
        )
      }
      // }
    }
  }

  // if (props.loading) {
  //   route = (
  //     <Fragment>
  //       <Backdrop show={true} />
  //       <Spinner />
  //     </Fragment>
  //   );
  // }

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
    id: state.home.id,
    isCustomer: state.home.isCustomer,
    loading: state.home.loading,
  }
}

const mapDispatchToProps = {
  getUserType: actions.getUserType,
  setLocalTokenStored: actions.setLocalTokenStored,
  logOut: actions.logOut,
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

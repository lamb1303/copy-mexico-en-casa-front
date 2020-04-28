import React, { Fragment } from 'react';
import './App.css';
// import * as actions from './store/actions';
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

const App = (props) => {

  let route = (
    <Switch >
      <Route path='/Client' component={Client} />
      <Route path='/Registro' component={Registro} />
      <Route path='/RegistroCliente' component={RegistroCliente} />
      <Route path='/Home' component={Home} />
      <Redirect to='/Home' />
    </Switch>
  )

  if (props.token) {

    route = (
      <Fragment>
        <Sidebar />
        <Header />
        <Switch >
          <Route path='/Client' component={Client} />
          <Route path='/Registro' component={Registro} />
          <Route path='/clientNegocio' component={ClientNegocio} />
          <Route path='/Negocio' component={Negocio} />
          <Redirect to='/' />
        </Switch>
      </Fragment>
    )
  }

  return (
    <Fragment>
      {route}
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    token: state.home.token !== null
  }
}


export default connect(mapStateToProps)(App);

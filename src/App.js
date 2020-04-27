import React, { Fragment } from 'react';
import './App.css';
import * as actions from './store/actions';
import { connect } from 'react-redux'
import Registro from './components/Negocio/Registro/Registro';
import { Route, Switch } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Sidebar from './components/UI/Sidebar/Sidebar';
import Client from './components/Cliente/Client';
import Home from './components/Home/Home';
import RegistroCliente from './components/Cliente/RegistroCliente/RegistroCliente'

const App = (props) => {

  const route = (
    <Switch >
      <Route path='/Client' component={Client} />
      <Route path='/Registro' component={Registro} />
      <Route path='/RegistroCliente' component={RegistroCliente} />
      <Route path='/Home' component={Home} />

    </Switch>
  )

  return (
    <Fragment>
      <Sidebar />
      <Header />
      {route}
    </Fragment>
  );
}



export default App;

import React, { Fragment } from 'react';
import './App.css';
// import * as actions from './store/actions';
// import { connect } from 'react-redux'
import Registro from './components/Negocio/views/Registro/Registro';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Sidebar from './components/UI/Sidebar/Sidebar';
import Client from './components/Cliente/Client';
import Home from './components/Home/Home';
import ClientNegocio from './components/Cliente/Negocio/Negocio';
import Negocio from './components/Negocio/views/Negocio/Negocio';

const App = (props) => {

  const route = (
    <Switch >
      <Route path='/Client' component={Client} />
      <Route path='/Registro' component={Registro} />
      <Route path='/Home' component={Home} />
      <Route path='/clientNegocio' component={ClientNegocio} />
      <Route path='/Negocio' component={Negocio} />
      <Redirect to='/' />
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

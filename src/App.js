import React, { Fragment } from 'react';
import './App.css';
import * as actions from './store/actions';
import { connect } from 'react-redux'
import Registro from './components/Negocio/views/Registro/Registro';
// import { Route } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Sidebar from './components/UI/Sidebar/Sidebar';
import Client from './components/Cliente/Client';
import { Route } from 'react-router-dom';

const App = (props) => {


  return (
    <Fragment>
      <Sidebar />
      <Header />
      <Client />
    </Fragment>
  );
}



export default App;

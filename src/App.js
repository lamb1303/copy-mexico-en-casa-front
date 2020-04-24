import React, { Fragment } from 'react';
import './App.css';
// import { Route } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Sidebar from './components/UI/Sidebar/Sidebar';

const App = (props) => {

  // let routes = <Route path='/' exact component={Header} />

  return (
    <Fragment>
      <Sidebar />
      <Header />
    </Fragment>
  );
}



export default App;

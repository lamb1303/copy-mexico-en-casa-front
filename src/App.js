import React, { useEffect, useCallback } from 'react';
import './App.css';
import * as actions from './store/actions';
import { connect } from 'react-redux'

const App = (props) => {


  let label = "";
  if (props.cliente) {
    label = "CLIENTE"
  }

  if (props.negocio) {
    label = "NEGOCIO"
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src='./logo.png' className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <button onClick={() => props.onClienteSelected('Bladimir')} >REGISTRAR CLIENTE</button>
          <button onClick={() => props.onNegocioSelected()}  >REGISTRAR NEGOCIO</button>
        </div>
        <label>SE REGISTRO UN {label} y se llama {props.name} </label>
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cliente: state.registro.cliente,
    negocio: state.registro.negocio,
    name: state.registro.name,
    loadingC: state.cliente.loading,
    loadingR: state.registro.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClienteSelected: (name) => dispatch(actions.registrarNuevoCliente(name)),
    onNegocioSelected: () => dispatch(actions.registrarNuevoNegocio())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

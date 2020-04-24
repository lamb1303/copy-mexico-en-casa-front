import React, { useEffect, useCallback } from 'react';
import './App.css';
import * as actions from './store/actions';
import { connect } from 'react-redux'
import Registro from './components/Negocio/views/Registro/Registro';

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
      <Registro/>
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

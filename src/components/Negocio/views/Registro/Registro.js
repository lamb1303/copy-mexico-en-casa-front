import React from 'react';
import { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './Registro.scss'
import image from '../../../../assets/default_Image.png'
class Registro extends Component {

    render() {
        return (
            <section>
                <div className='datosPersonales'>
                    <h2>
                        Texto de bienvenida
                    </h2>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Nombre"
                            defaultValue=""
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Apellidos"
                            defaultValue=""
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            defaultValue=""
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Contraseña"
                            type="password"
                            defaultValue=""
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Telefono"
                            defaultValue=""
                            variant="outlined"
                        />
                    </div>
                    <hr style={{ width: '55vh' }} />
                </div>
                <div>
                    <div className='datosNegocio'>
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Nombre del negocio"
                                defaultValue=""
                                variant="outlined"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Direccion del negocio"
                                defaultValue=""
                                variant="outlined"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Descipcion del negocio"
                                defaultValue=""
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <div>
                                <input type="file"></input>
                                <img src={image} />
                                <span>foto del negocio</span>

                            </div>
                            <div>
                                <input type="file"></input>
                                <img src={image} />
                                <span>foto del menu</span>

                            </div>

                        </div>
                    </div>
                    <div className='datosNegocio2'>
                        <div>
                            <image src=''></image>
                            <div>
                                <input type="file"></input>
                                <img src={image} />
                                <span>Fotod de tu INE de lado donde se ve la persona</span>
                            </div>
                        </div>
                        <div>
                            <span>Horario del trabajo</span>
                            <span> multiselect de los dias</span>
                        </div>
                    </div>
                    <hr style={{ width: '55vh' }} />
                </div>
                <div className='metodos'>
                    <div>
                        <span>Metodo de pago</span>
                        <div>
                            <span>Efectivo</span>
                            <span>Tarjeta</span>
                        </div>
                    </div>
                    <div>
                        <span>Metodo de entrega</span>
                        <div>
                            <span>Entrega a domicilio</span>
                            <span>Entrega en el local</span>
                        </div>
                    </div>

                </div>
                <span>Aviso de privacidad</span>
                <div className='crearCuenta'>
                    <button>Crear Cuenta</button>
                </div>

            </section>

        );
    }
}

export default Registro;
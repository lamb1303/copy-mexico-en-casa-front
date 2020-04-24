import React from 'react';
import { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Registro.scss'
import image from '../../../../assets/default_Image.png'
import Button from '../../../UI/Button/Button'
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
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell align="right">Dia</TableCell>
                                            <TableCell align="right">Abierto</TableCell>
                                            <TableCell align="right"> - </TableCell>
                                            <TableCell align="right">Cerrado</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow>
                                            <TableCell>
                                                <Checkbox
                                                    checked={true}
                                                //onChange={handleChange}

                                                />
                                            </TableCell>
                                            <TableCell align="right">Lunes</TableCell>
                                            <TableCell align="right">8:30</TableCell>
                                            <TableCell align="right"> - </TableCell>
                                            <TableCell align="right">16:00</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                    <hr style={{ width: '55vh' }} />
                </div>
                <div className='metodos'>
                    <div>
                        <span>Metodo de pago</span>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={true}
                                        //onChange={handleChange}
                                        name="Efectivo"
                                    />
                                }
                                label="Efectivo"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={true}
                                        //onChange={handleChange}
                                        name="Tarjeta"
                                    />
                                }
                                label="Tarjeta"
                            />
                        </div>
                    </div>
                    <div>
                        <span>Metodo de entrega</span>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={true}
                                        //onChange={handleChange}
                                        name="Entrega"
                                    />
                                }
                                label="Entrega a domicilio"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={true}
                                        //onChange={handleChange}
                                        name="EntregaLocal"
                                    />
                                }
                                label="Entrega en el local "
                            />
                        </div>
                    </div>

                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={true}
                            //onChange={handleChange}
                            name="privacidad"
                        />
                    }
                    label="Aviso de privacidad"
                />

                <div className='crearCuenta'>
                <Button btnType='Success' >Registrar</Button>
                </div>

            </section>

        );
    }
}

export default Registro;
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './Registro.scss'
import Button from '../../UI/Button/Button'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ImageUpload from '../../UI/ImageUpload/ImageUpload';


const Registro = (props) => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [number, setNumber] = useState("")
    const [nNegocio, setNombreNegocio] = useState("")
    const [dNegocio, setDNegocio] = useState("")
    const [descNegocio, setDescNegocio] = useState("")
    const [lunes, setLunes] = useState(false)
    const [martes, setMartes] = useState(false)
    const [miercoles, setMiercoles] = useState(false)
    const [jueves, setJueves] = useState(false)
    const [viernes, setViernes] = useState(false)
    const [sabado, setSabado] = useState(false)
    const [domingo, setDomingo] = useState(false)
    const [openL, setOpenL] = useState("00:00")
    const [openMar, setOpenMar] = useState("00:00")
    const [openMie, setOpenMier] = useState("00:00")
    const [openJ, setOpenJ] = useState("00:00")
    const [openV, setOpenV] = useState("00:00")
    const [openS, setOpenS] = useState("00:00")
    const [openD, setOpenD] = useState("00:00")
    const [closeL, setCloseL] = useState("00:00")
    const [closeMar, setCloseMar] = useState("00:00")
    const [closeMie, setCloseMier] = useState("00:00")
    const [closeJ, setCloseJ] = useState("00:00")
    const [closeV, setCloseV] = useState("00:00")
    const [closeS, setCloseS] = useState("00:00")
    const [closeD, setCloseD] = useState("00:00")
    const [efectivo, setEfectivo] = useState(false)
    const [tarjeta, setTarjeta] = useState(false)
    const [domicilio, setDomicilio] = useState(false)
    const [local, setLocal] = useState(false)
    const [aviso, setAviso] = useState(false)
    const [fotoNegocio, setFotoNegocio] = useState(null)
    const [fotoMenu, setFotoMenu] = useState(null)
    const [fotoIne, setFotoIne] = useState(null)


    const send = () => {

        if (name !== "" && lastName !== "" && email !== "" && password !== null && number !== "" && nNegocio !== "" &&
            descNegocio !== "" && dNegocio !== "" && fotoIne !== null && fotoNegocio !== null) {
            const ob = {
                nameResponsable: name,
                apellidos: lastName,
                email: email,
                password: password,
                telefono: number,
                name: nNegocio,
                direccion: dNegocio,
                desc: descNegocio,
                img: fotoNegocio,
                fotoMenu: fotoMenu,
                fotoId: fotoIne,
                horario: [
                    {
                        lunes: lunes,
                        from: openL,
                        to: closeL
                    },
                    {
                        martes: martes,
                        from: openMar,
                        to: closeMar
                    },
                    {
                        miercoles: miercoles,
                        from: openMie,
                        to: closeMie
                    },
                    {
                        jueves: jueves,
                        from: openJ,
                        to: closeJ
                    },
                    {
                        viernes: viernes,
                        from: openV,
                        to: closeL
                    },
                    {
                        sabado: sabado,
                        from: openS,
                        to: closeS
                    },
                    {
                        domingo: domingo,
                        from: openD,
                        to: closeD
                    },
                ],
                metodoPago: {
                    efectivo: efectivo,
                    tarjeta: tarjeta
                },
                metodoEnvio: {
                    domicilio: domicilio,
                    local: local
                },
                calificacion: 0,
                verificado: false,

            }
            props.nuevoNegocio(ob)
            this.history.push('/RegisroClientes')
        }

    }

    const onSubirImagen = (id, pickedFile, fileIsValid) => {
        if (fileIsValid) {
            switch (id) {
                case 'fotoNegocio':
                    setFotoNegocio(pickedFile)
                    break;
                case 'fotoMenu':
                    setFotoMenu(pickedFile)
                    break;
                case 'fotoIne':
                    setFotoIne(pickedFile)
                    break;
                default:
                    break;
            }
            console.log(pickedFile)

        }
    }

    const options = () => {
        var arr = [], i, j;
        for (i = 0; i < 24; i++) {
            for (j = 0; j < 2; j++) {
                let hour = (i <= 9 ? "0" + i : i) + ":" + (j === 0 ? "00" : 30 * j);
                arr.push(<option value={hour}>{hour}</option>)
            }
        }
        return arr
    }

    return (
        <section>
            <div className='datosPersonales'>
                <h2>
                    Texto de bienvenida
                    </h2>
                <div className='informacionPersonal'>
                    <TextField
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required

                        label="Nombre"
                        defaultValue=""
                        variant="outlined"
                    />
                    <TextField
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                        label="Apellidos"
                        defaultValue=""
                        variant="outlined"
                    />
                    <TextField
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        label="Email"
                        defaultValue=""
                        variant="outlined"
                    />
                    <TextField
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        label="Contraseña"
                        type="password"
                        defaultValue=""
                        variant="outlined"
                    />
                    <TextField
                        value={number}
                        onChange={(event) => setNumber(event.target.value)}
                        required
                        label="Telefono"
                        defaultValue=""
                        variant="outlined"
                    />
                </div>


            </div>
            <hr style={{ width: 'auto' }} />
            <div>
                <div className='datosNegocio'>
                    <div>
                        <TextField
                            value={nNegocio}
                            onChange={(event) => setNombreNegocio(event.target.value)}
                            required
                            label="Nombre del negocio"
                            defaultValue=""
                            variant="outlined"
                        />
                        <TextField
                            value={dNegocio}
                            onChange={(event) => setDNegocio(event.target.value)}
                            required
                            label="Direccion del negocio"
                            defaultValue=""
                            variant="outlined"
                        />
                        <TextField
                            value={descNegocio}
                            onChange={(event) => setDescNegocio(event.target.value)}
                            required
                            label="Descipcion del negocio"
                            defaultValue=""
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <ImageUpload
                            id='fotoNegocio'
                            onInput={(pickedFile, fileIsValid) => onSubirImagen('fotoNegocio', pickedFile, fileIsValid)}
                            errorText='Please provide an image'
                            text='foto del negocio'
                        />
                        <ImageUpload
                            id='fotoMenu'
                            onInput={(pickedFile, fileIsValid) => onSubirImagen('fotoMenu', pickedFile, fileIsValid)}
                            errorText='Please provide an image'
                            text='foto del menu'
                        />
                    </div>
                </div>
                <div className='datosNegocio2'>
                    <div>
                        <ImageUpload
                            id='fotoIne'
                            onInput={(pickedFile, fileIsValid) => onSubirImagen('fotoIne', pickedFile, fileIsValid)}
                            errorText='Please provide an image'
                            text='Foto parte delantera de tu INE'
                        />
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
                                                checked={lunes}
                                                name='lunes'
                                                onChange={(event) => setLunes(event.target.checked)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">Lunes</TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={openL}
                                                    onChange={(event) => setOpenL(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="right"> - </TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={closeL}
                                                    onChange={(event) => setCloseL(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Checkbox
                                                checked={martes}
                                                name='martes'
                                                onChange={(event) => setMartes(event.target.checked)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">Martes</TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={openMar}
                                                    onChange={(event) => setOpenMar(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="right"> - </TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={closeMar}
                                                    onChange={(event) => setCloseMar(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow><TableRow>
                                        <TableCell>
                                            <Checkbox
                                                checked={miercoles}
                                                name='miercoles'
                                                onChange={(event) => setMiercoles(event.target.checked)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">Miercoles</TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={openMie}
                                                    onChange={(event) => setOpenMier(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="right"> - </TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={closeMie}
                                                    onChange={(event) => setCloseMier(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow><TableRow>
                                        <TableCell>
                                            <Checkbox
                                                checked={jueves}
                                                name='jueves'
                                                onChange={(event) => setJueves(event.target.checked)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">Jueves</TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={openJ}
                                                    onChange={(event) => setOpenJ(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="right"> - </TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={closeJ}
                                                    onChange={(event) => setCloseJ(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow><TableRow>
                                        <TableCell>
                                            <Checkbox
                                                checked={viernes}
                                                name='viernes'
                                                onChange={(event) => setViernes(event.target.checked)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">Viernes</TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={openV}
                                                    onChange={(event) => setOpenV(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="right"> - </TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={closeV}
                                                    onChange={(event) => setCloseV(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow><TableRow>
                                        <TableCell>
                                            <Checkbox
                                                checked={sabado}
                                                name='sabado'
                                                onChange={(event) => setSabado(event.target.checked)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">Sabado</TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={openS}
                                                    onChange={(event) => setOpenS(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="right"> - </TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={closeS}
                                                    onChange={(event) => setCloseS(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Checkbox
                                                checked={domingo}
                                                name='domingo'
                                                onChange={(event) => setDomingo(event.target.checked)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">Domingo</TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={openD}
                                                    onChange={(event) => setOpenD(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="right"> - </TableCell>
                                        <TableCell align="right">
                                            <FormControl>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={closeD}
                                                    onChange={(event) => setCloseD(event.target.value)}
                                                >
                                                    {options()}
                                                </NativeSelect>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <hr style={{ width: 'auto' }} />
            </div>
            <div className='metodos'>
                <div>
                    <span>Metodo de pago</span>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={efectivo}
                                    onChange={(event) => setEfectivo(event.target.checked)}
                                    name="Efectivo"
                                />
                            }
                            label="Efectivo"
                        /><FormControlLabel
                            control={
                                <Checkbox
                                    checked={tarjeta}
                                    onChange={(event) => setTarjeta(event.target.checked)}
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
                                    checked={domicilio}
                                    onChange={(event) => setDomicilio(event.target.checked)}
                                    name="Entrega"
                                />
                            }
                            label="Entrega a domicilio"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={local}
                                    onChange={(event) => setLocal(event.target.checked)}
                                    name="EntregaLocal"
                                />
                            }
                            label="Entrega en el local"
                        />
                    </div>
                </div>

            </div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={aviso}
                        onChange={(event) => setAviso(event.target.checked)}
                        name="privacidad"
                    />
                }
                label="Aviso de privacidad"
            />

            <div className='crearCuenta'>
                <Button onClick={() => send()} btnType='Success' >Registrar</Button>
            </div>

        </section>

    );
}
const mapDispatchtoProps = {
    nuevoNegocio: actions.registroNuevoNegocio
}

export default withRouter(connect(null, mapDispatchtoProps)(Registro));
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '../../UI/Button/Button'
import ImageUpload from '../../UI/ImageUpload/ImageUpload';
import img from '../../../assets/default_Image.png'
import './RegistroCliente.scss'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const RegistroCliente = (props) => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [number, setNumber] = useState("")
    const [direccion, setDireccion] = useState("")
    const [aviso, setAviso] = useState(false)
    const [fotoIne, setFotoIne] = useState(null)
    const [verifyName, setVerifyName] = useState("f")
    const [verifyLastName, setVerifyLastName] = useState("f")
    const [verifyEmail, setVerifyEmail] = useState("f")
    const [verifyPassword, setVerifyPassword] = useState("f")
    const [verifyTelefono, setVerifyTelefono] = useState("f")
    const [verifyDireccion, setVerifyDireccion] = useState("f")

    const send = () => {
        verificaciones()
        console.log('si llegue')
        if (name !== "" && lastName !== "" && email !== "" && password !== null && number !== ""  &&
            setFotoIne !== null) {
            const ob = {
                apellidos: lastName,
                email: email,
                password: password,
                telefono: number,
                name: name,
                direccion: direccion,
                fotoId: fotoIne,
                

            }
            console.log(ob)

            props.nuevoCliente(ob)
            props.history.push('/RegistroCliente')
        }

    }

    const verificaciones = () => {
        if (name === "") {
            setVerifyName("")
        } else {
            setVerifyName("f")
        }
        if (lastName === "") {
            setVerifyLastName("")
        } else {
            setVerifyLastName("f")
        }
        if (email === "") {
            setVerifyEmail("")
        } else {
            setVerifyEmail("f")
        }
        if (password === "") {
            setVerifyPassword("")
        } else {
            setVerifyPassword("f")
        }
        if (number === "") {
            setVerifyTelefono("")
        } else {
            setVerifyTelefono("f")
        }
        
        if (direccion === "") {
            setVerifyDireccion("")
        }else {
            setVerifyDireccion("f")
        }
    }

    const onSubirImagen = (id, pickedFile, fileIsValid) => {
        if (fileIsValid) {
            switch (id) {
                case 'fotoIne':
                    setFotoIne(pickedFile)
                    break;
                default:
                    break;
            }

        }
    }
    return (
        <section>
            <div className='datosPersonales'>
                <h2>
                    Texto de bienvenida
                    </h2>
                <div className='informacionPersonal'>
                 <TextField
                        error = { verifyName ? false : true}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        helperText ={verifyName ? "" : "Campo requeridos"}
                        label="Nombre"
                        defaultValue=""
                        variant="outlined"
                    />
                    <TextField
                        error = { verifyLastName ? false : true}
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                        label="Apellidos"
                        defaultValue=""
                        variant="outlined"
                        helperText ={verifyLastName ? "" : "Campo requeridos"}
                    />
                    <TextField
                    error = {verifyEmail ? false : true}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        label="Email"
                        defaultValue=""
                        variant="outlined"
                        helperText ={verifyEmail ? "" : "Campo requeridos"}
                    />
                    <TextField
                    error = { verifyPassword ? false : true}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        label="Contraseña"
                        type="password"
                        defaultValue=""
                        variant="outlined"
                        helperText ={verifyPassword ? "" : "Campo requeridos"}
                    />
                    <TextField
                    error = {verifyTelefono ? false : true}
                        value={number}
                        onChange={(event) => setNumber(event.target.value)}
                        required
                        label="Telefono"
                        defaultValue=""
                        variant="outlined"
                        helperText ={verifyTelefono ? "" : "Campo requeridos"}
                    />
                    <TextField
                        error = {verifyDireccion ? false : true}
                        value={direccion}
                        onChange={(event) => setDireccion(event.target.value)}
                        required
                        label="Direccion"
                        variant="outlined"
                        multiline
                        rows={4}
                        helperText ={verifyDireccion ? "" : "Campo requerido"}
                    />
                </div>
                <ImageUpload
                            id='fotoIne'
                            onInput={(id,pickedFile, fileIsValid) => onSubirImagen(id, pickedFile, fileIsValid)}
                            errorText='Por favor, Agregar imagen'
                            message='Foto frontal de la crendencial'
                            img = {img}
                />
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
                <Button clicked={() => send()} btnType='Success' >Registrar</Button>
            </div>
        </section>
    )
}


const mapDispatchtoProps = {
    nuevoCliente: actions.registrarNuevoCliente
}

export default withRouter(connect(null,mapDispatchtoProps)(RegistroCliente))

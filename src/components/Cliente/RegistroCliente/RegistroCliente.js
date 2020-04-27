import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import './RegistroCliente.scss'
const RegistroCliente = (props) => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [number, setNumber] = useState("")

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
            <div class="or-seperator"><i>or</i></div>
            <div className="login-form">
                <button class="loginBtn loginBtn--facebook">
                    Login with Facebook
                </button>

                <button class="loginBtn loginBtn--google">
                    Login with Google
                </button>
            </div>
        </section>
    )
}

export default RegistroCliente

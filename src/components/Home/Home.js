import React, { useState } from 'react';

import Button from '../UI/Button/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import './Home.scss';


const Home = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let credentials = null;

    const onLogin = () => {

        if (username !== "" && password !== "") {
            credentials = {
                username: username,
                password: password
            }

            props.login(credentials);
        }

    }




    return (
        <div className='home'>
            <div className='home-container'>
                <div className='home-container__logo'>
                    <img src="./logo.png" alt="logo mexico en casa" />
                </div>
                <div className='home-container__login'>
                    <h3>Iniciar sesi&oacute;n</h3>
                    <TextField
                        label="Ingresa tu usuario"
                        id="filled-margin-normal"
                        margin="normal"
                        variant="filled"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                        label="Ingresa tu contraseña"
                        id="filled-margin-normal"
                        margin="normal"
                        variant="filled"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button btnType='Success' onClick={() => onLogin()}>Entrar</Button>
                    <Button btnType='Danger' >Unirme</Button>
                </div>
                <div>

                </div>
            </div>

        </div>
    );
};

const mapStateToProps = state => {
    return {
        token: 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (credentials) => dispatch(actions.login(credentials))
    }
}



export default connect(null, mapDispatchToProps)(Home);
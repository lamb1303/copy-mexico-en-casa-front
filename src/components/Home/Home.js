import React from 'react';

import './Home.scss';

const Home = () => (
    <div className='home'>
        <div className='home-container'>
            <div className='home-container__logo'>
                <img src="./logo.png" alt="logo mexico en casa" />
            </div>
            <div className='home-container__login'>
                <form>
                    <input type="text" name="username" placeholder="Ingresa tu usuario" />
                    <input type="text" name="password" placeholder="Ingresa tu password" />
                    <input type="submit" value="Entrar" />
                </form>
            </div>
            <div>
                <button>Unirme</button>
            </div>
        </div>

    </div>
);

export default Home;
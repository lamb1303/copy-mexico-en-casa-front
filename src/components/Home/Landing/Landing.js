import React from 'react';
import Button from '../../UI/Button/Button';

import './Landing.scss';

import { NavLink } from 'react-router-dom';
import Slidehow from './Slidehow/Slidehow';


const Flayer = () => {


    return (
        <div className='flayer slideshow'>
            <Slidehow />
            <div className='flayer__mission'>
                <h2 className='information'>
                </h2>

            </div>
            <div className='flayer__buttons'>
                <NavLink to='/Home'><Button btnType='Success'>Comenzar</Button></NavLink>
            </div>
        </div>
    );

}

export default Flayer;
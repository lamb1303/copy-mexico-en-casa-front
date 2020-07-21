import React from 'react';

import './Slidehow.scss';

import Closed from '../../../../assets/Landing/close_due_to_covid.jpg';
import Azteca from '../../../../assets/Landing/grayscale-photograph-of-two-people-standing-in-front-of-food-1264937.jpg';
import Business from '../../../../assets/Landing/pequeño-negocio.jpg';
import Pizza from '../../../../assets/Landing/pizza.jpg';
import Propa from '../../../../assets/Landing/tj-dragotta-wGm2-XxaDCY-unsplash.jpg';
import Logo from '../../../../assets/Landing/imagen_mexico_en_casa.png';

const imageToFade = [
    {
        url: Closed,
        name: 'Cerrado_debido_al_Covid',
    },
    {
        url: Azteca,
        name: 'Azteca_truck',
    },
    {
        url: Business,
        name: 'Pequenio_negocio',
    },
    {
        url: Pizza,
        name: 'Rebanadas_pizza',
    },
    {
        url: Propa,
        name: 'Bote_para_propina'
    },
    {
        url: Logo,
        name: 'Logo_mexico_en_casa'
    },

]

const Slidehow = () => {
    return (
        <div className="slide-container">
            <div className='slide__images'>
                {imageToFade.map(image =>
                    <img src={image.url} alt={image.name} />
                )}
            </div>
        </div>
    )
}

export default Slidehow;
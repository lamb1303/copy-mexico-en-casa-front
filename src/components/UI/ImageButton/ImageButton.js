import React from 'react';
import './Imagebutton.scss'
const ImageButton = props => {

    return (
        <div className='imageButton'>
            <input type="file"></input>
            <img src={props.image} />
            <span>{props.description}</span>
        </div>
    )
}

export default ImageButton
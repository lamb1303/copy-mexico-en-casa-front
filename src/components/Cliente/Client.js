import React from 'react';
import Search from './Search/Search';
import classes from './Client.module.css';
import PlaceCards from './PlaceCards/PlaceCards';

const Client2 = () => {
    return (
        <div className={classes.client} >
            <Search />
            <PlaceCards />
        </div>
    )
}

export default Client2;
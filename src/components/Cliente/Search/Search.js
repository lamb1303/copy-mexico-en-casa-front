import React from 'react';
import { ReactComponent as Lupa } from './lupa.svg';
import classes from './Search.module.css';

const Search = () => {
    return (
        <div className={classes.Search_section} >
            <input type='text' />
            <Lupa />
        </div>
    )
}

export default Search;
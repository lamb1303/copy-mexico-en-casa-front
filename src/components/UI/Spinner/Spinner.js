import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => (
    <div className={[classes.sk_chase, classes['spinner']].join(' ')}>
        <div className={classes.sk_chase_dot}></div>
        <div className={classes.sk_chase_dot}></div>
        <div className={classes.sk_chase_dot}></div>
        <div className={classes.sk_chase_dot}></div>
        <div className={classes.sk_chase_dot}></div>
        <div className={classes.sk_chase_dot}></div>
    </div>
)

export default Spinner;
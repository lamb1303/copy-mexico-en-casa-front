import React from 'react';
import { ReactComponent as AddProd } from '../../../../../assets/cliente/plus.svg';
import { ReactComponent as DelProd } from '../../../../../assets/cliente/minus.svg';
import classes from './Hidden.module.css';
import * as actions from '../../../../../store/actions';
import { connect } from 'react-redux';

const Hidden = props => {

    let show = 'hidden';
    if (props.selected) {
        show = 'showIt';
    };
    const handleDelProd = () => {
        if (props.amount !== 0) {
            props.onDelOneProduct(props.product, props.price, props.img)
        }
    }

    return (
        <div className={[classes.options, classes[show]].join(' ')} >
            <AddProd onClick={() => props.onAddOneProduct(props.product, props.price, props.img)} className={classes.addOne} />
            <div className={classes.amount} > {props.amount} </div>
            <DelProd className={classes.delOne} onClick={() => handleDelProd()} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAddOneProduct: (product, price, img) => dispatch(actions.AddOneToSelectedProduct(product, price, img)),
        onDelOneProduct: (name, price, img) => dispatch(actions.DelOneToSelectedProduct(name, price, img))
    }
}

export default connect(null, mapDispatchToProps)(Hidden);
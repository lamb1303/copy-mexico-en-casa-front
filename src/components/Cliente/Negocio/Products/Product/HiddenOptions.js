import React from 'react';
import { ReactComponent as AddProd } from '../../../assets/plus.svg';
import { ReactComponent as DelProd } from '../../../assets/minus.svg';
import classes from './Hidden.module.css';
import * as actions from '../../../../../store/actions';
import { connect } from 'react-redux';

const Hidden = props => {

    let show = 'hidden';
    if (props.selected) {
        show = 'showIt';
    };
    const handleDelProd = () => {
        if (props.count !== 0) {
            props.onDelOneProduct(props.product, props.price)
        }
    }

    return (
        <div className={[classes.options, classes[show]].join(' ')} >
            <AddProd onClick={() => props.onAddOneProduct(props.product, props.price, props.img)} className={classes.addOne} />
            <div className={classes.amount} > {props.count} </div>
            <DelProd className={classes.delOne} onClick={() => handleDelProd()} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAddOneProduct: (product, price, img) => dispatch(actions.AddOneToSelectedProduct(product, price, img)),
        onDelOneProduct: (name, price) => dispatch(actions.DelOneToSelectedProduct(name, price))
    }
}

export default connect(null, mapDispatchToProps)(Hidden);
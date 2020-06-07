import React, { Component } from 'react';
import Product from './Product/Product';
import classes from './Products.module.css';
import { connect } from 'react-redux';
import * as action from '../../../../store/actions'

class Products extends Component {
    
    render() {
        
        return (
            <div className={classes.products} >
               
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
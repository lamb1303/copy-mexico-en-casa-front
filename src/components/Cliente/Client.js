import React, { Component } from 'react';
import Search from './Search/Search';
import classes from './Client.module.css';
import PlaceCards from './PlaceCards/PlaceCards';
import { connect } from 'react-redux';
import * as action from '../../store/actions'

class Client2 extends Component {

    componentDidMount() {
        // this.props.getBusinesses()
        this.props.getClient(this.props.id);
    }

    render() {
        return (
            <div className={classes.client} >
                <Search businesses={this.props.businesses} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        businesses: state.cliente.businesses,
        id: state.home.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBusinesses: () => dispatch(action.getBusinesses()),
        getClient: (id) => dispatch(action.getClient(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client2);
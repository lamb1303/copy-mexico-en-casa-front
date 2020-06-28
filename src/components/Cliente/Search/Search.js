import React, { useState } from 'react';
import { ReactComponent as Lupa } from './lupa.svg';
import classes from './Search.module.css';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import PlaceCard from '../PlaceCards/PlaceCard/PlaceCard';
// import Pagination from './Pagination/Pagination'
import * as action from '../../../store/actions'
import { NavLink } from 'react-router-dom';
const Search = (props) => {

    const [businessDesc, typeBusiness] = useState("");
    // const [currentPage, setCurrentPage] = useState(1)
    // const [postsPerPage] = useState(6)
    // const indexOfLastPost = currentPage * postsPerPage
    // const indexOfFirstPost = indexOfLastPost - postsPerPage

    const selectedBusiness = (business) => {
        localStorage.setItem("businessId", business.key)
        props.clienteSelectedBusiness(business)
    }

    let businesses = Object.values(props.businesses).map(
        business => {

            if (business.desc.includes(businessDesc)) {
                return <div key={business.key} className={classes.businessContainer} >
                    <NavLink
                        onClick={() => selectedBusiness(business)}
                        to={{
                            pathname: "/VerNegocio",
                            photoBusiness: business.photoBusiness
                        }}>
                        <PlaceCard
                            businessId={business.key}
                            name={business.name}
                            isToGo={business.delivery.isToGo}
                            isToTake={business.delivery.isToTake}
                            cash={business.payment.cash}
                            creditCard={business.payment.creditCard}
                            rate={business.rate}
                            photoBusiness={business.photoBusiness}
                            desc={business.desc}
                            distance={business.distance}
                            horaAbierto={business.schedule.horaAbierto}
                            horaCerrado={business.schedule.horaCerrado}
                        />
                    </NavLink>
                </div>
            } else {
                return <h4 style={{ textAlign: "center" }}>Negocios fuera de tu locación</h4>
            }
        }
    )
    // const paginate = (pageNumber) => {
    //     setCurrentPage(pageNumber)
    // }
    // if (businesses.length === 0) {
    //     businesses = <h4 style={{textAlign: "center"}}>Negocios fuera de tu locación</h4>
    // }
    return (
        <>
            <div className={classes.Search_section} >
                <TextField
                    style={{
                        left: "4em"
                    }}
                    type='text'
                    label="Buscar Negocio"
                    value={businessDesc}
                    onChange={(event) => {
                        typeBusiness(event.target.value)
                    }} />
                <Lupa />
            </div>
            <div className={classes.Search_container}>
                {businesses &&
                    businesses}
            </div>
            {/* <Pagination
                postPerPage={postsPerPage}
                paginate={paginate}
                totalPosts={props.businesses.length} /> */}

        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        clienteSelectedBusiness: (business) => dispatch(action.clienteSelectedBusiness(business)),
    }
}

export default connect(null, mapDispatchToProps)(Search);
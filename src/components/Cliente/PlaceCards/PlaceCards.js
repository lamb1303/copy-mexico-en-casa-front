import React, { Component } from 'react';
import PlaceCard from './PlaceCard/PlaceCard';
import axios from 'axios'

class PlaceCards extends Component {
    state = {
        businesses: {}
    }
    componentDidMount() {
        //id product
        axios.get(`${process.env.REACT_APP_API_URL}/Business/businesses`).then(
            response => {
                const businesses = response.data.businesses

                const Updatedbusinesses = Object.keys(businesses).map(igKey => {
                    return [...Array(businesses[igKey])].map((_, i) => {
                        return {
                            key: igKey,
                            name: _.businessName,
                            desc: _.businessDesc,
                            payment: {
                                cash: _.payment.cash
                            },
                            delivery: {
                                isToGo: _.delivery.isToGo
                            },
                            rate: [_.rate],
                            photoBusiness: _.photoBusiness
                        }
                    })
                }).reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
                console.log(Updatedbusinesses)
                this.setState({ businesses: Updatedbusinesses })
            }
        ).catch(e => console.log(e))
    }
    render() {
        const businesses = Object.values(this.state.businesses).map(
            business => {
                return <PlaceCard
                    key={business.key}
                    businessId={business.key}
                    name={business.name}
                    isToGo={business.delivery.isToGo}
                    rate={business.rate}
                    photoBusiness={business.photoBusiness}
                    desc={business.desc}
                />
            }
        )
        return (
            <div>
                {businesses}
            </div>
        )
    }
}

export default PlaceCards;
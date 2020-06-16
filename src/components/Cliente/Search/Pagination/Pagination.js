import React from 'react'
import './Pagination.scss'
const Pagination = ({ postPerPage, totalPosts, paginate }) => {

    const pageNumbers = []
    for (let index = 1; index <= Math.ceil(totalPosts / postPerPage); index++) {
        pageNumbers.push(index)
    }

    return (
        <div className="pagination">
            {pageNumbers.map(number => (
                <div  key={number}  className="container">
                    <a className="" onClick={() => paginate(number)} href="#">
                        {number}
                    </a>
                </div>
            ))}
        </div>
    )

}

export default Pagination
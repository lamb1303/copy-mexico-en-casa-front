import React from 'react'
import './Pagination.scss'
const Pagination = ({ postPerPage, totalPosts, paginate }) => {

    // const [currentPage, setCurrentPage] = useState(1)
    // const [postsPerPage] = useState(6)
    // const indexOfLastPost = currentPage * postsPerPage
    // const indexOfFirstPost = indexOfLastPost - postsPerPage
    // const paginate = (page    {eNumber)
    // }
    /* <Pagination
                   postPerPage={postsPerPage}
                   paginate={paginate}
                   totalPosts={props.businesses.length} /> */
    const pageNumbers = []
    for (let index = 1; index <= Math.ceil(totalPosts / postPerPage); index++) {
        pageNumbers.push(index)
    }

    return (
        <div className="pagination">
            {pageNumbers.map(number => (
                <div key={number} className="container">
                    <a className="" onClick={() => paginate(number)} href="#">
                        {number}
                    </a>
                </div>
            ))}
        </div>
    )

}

export default Pagination
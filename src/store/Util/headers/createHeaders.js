

const createHeaders = (headers, data) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const REACT_APP_AUTH = user ? { Authorization: `Bearer ${user.token}` } : "";

    return data ?
        {

            headers: {
                ...REACT_APP_AUTH,
                ...headers
            },
            data: {
                ...data,
            }
        }
        :
        {
            headers: {
                ...REACT_APP_AUTH,
                ...headers
            },
        }

}

export default createHeaders;
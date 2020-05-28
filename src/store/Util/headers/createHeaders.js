

const createHeaders = (headers) => {

const user = JSON.parse(localStorage.getItem('user'));
const REACT_APP_AUTH = user ? { Authorization: `Bearer ${user.token}` } : "" ;
console.log(REACT_APP_AUTH);
    return {
        headers: { 
            ...REACT_APP_AUTH,
            ...headers
        }
    }
}

export default createHeaders;
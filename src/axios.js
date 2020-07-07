import axios from 'axios';

const instance = axios.create({
    timeout: 50000
});

export default instance;
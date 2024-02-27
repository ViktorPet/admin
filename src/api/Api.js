import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';

const Api = axios.create({
    baseURL: baseUrl
});


export default Api;
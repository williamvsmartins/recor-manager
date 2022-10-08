import axios from 'axios';
import {BASEURL} from '@env'


const api = axios.create({
    baseURL: `${BASEURL}`
});

export default api;
import axios from 'axios';
import {message} from 'antd'

axios.defaults.withCredentials = true;
axios.interceptors.response.use((response) => {
    const data = response.data;
    
    if (response.status === 200 && data.code === 200 || response.status === 204) {
        return Promise.resolve(data);
    }

    return Promise.reject(data);
}, (err) => {
    return Promise.reject(err);
})

export default axios;
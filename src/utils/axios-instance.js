import axios from "axios";

const instance = axios.create({
    baseURL: 'http://188.166.106.66/api',
    // baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;
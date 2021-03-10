import axios from 'axios';

// const web = process.env.SERVER_WEB_HOST;
// const portServer = process.env.SERVER_PORT;  

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;
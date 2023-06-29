import axios from 'axios';

// development environment baseUrl
axios.defaults.baseURL = 'http://localhost:5000/api/';

// production environment baseUrl
// axios.defaults.baseURL = "https://react-node-u6i6.onrender.com/api/";

const user = JSON.parse(localStorage.getItem('user'));

const TOKEN = user?.accessToken;

// axios request for api calls without token/headers configuration
export const generalRequest = axios.create({});

// axios request for api calls with token/headers configuration
export const userRequest = axios.create({
  headers: { token: `Bearer ${TOKEN}` },
});
//

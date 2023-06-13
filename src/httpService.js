import axios from "axios";

axios.defaults.baseURL = "https://react-node-u6i6.onrender.com/api";

const user = JSON.parse(localStorage.getItem("user"));

const TOKEN = user?.accessToken;

export const generalRequest = axios.create({});

export const userRequest = axios.create({
  headers: { token: `Bearer ${TOKEN}` },
});

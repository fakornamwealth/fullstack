import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";

const user = JSON.parse(localStorage.getItem("user"));

const TOKEN = user?.accessToken;

export const generalRequest = axios.create({});

export const userRequest = axios.create({
  headers: { token: `Bearer ${TOKEN}` },
});

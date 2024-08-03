import axios from "axios";


const AxiosJson = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


const AxiosForm = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const Axios = {AxiosForm, AxiosJson}

export default Axios
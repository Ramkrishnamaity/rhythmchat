import axios from "axios";
// import { useAppSelector } from "../../redux/hooks";

// const {token} = useAppSelector(state => state.user)


const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token') ?? ''
  },
  
});

// token ?? (Axios.defaults.headers.common['Authorization'] = token)

export default Axios;
import axios from 'axios';

const instanceAxios = axios.create({
  withCredentials: true, 
});

export default instanceAxios;
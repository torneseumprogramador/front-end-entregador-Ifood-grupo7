import axios from "axios";
import getToken from "./getToken";

const axiosConfig = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    Authorization: getToken(),
  },
});

export default axiosConfig;

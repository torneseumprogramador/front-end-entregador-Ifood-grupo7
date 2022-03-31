import axios from "axios";
import getToken from "./getToken";

const axiosConfig = axios.create({
  baseURL: "https://drivers-tracking.herokuapp.com/",
  headers: {
    Authorization: getToken(),
  },
});

export default axiosConfig;

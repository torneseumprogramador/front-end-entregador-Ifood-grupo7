import getToken from "./getToken";
import jtwDecoder from "jwt-decode";

export default () => {
  if (!getToken()) {
    return null;
  }

  const token = getToken().replace("Bearer ", "");
  const driverLogged = jtwDecoder(token);

  return driverLogged;
};

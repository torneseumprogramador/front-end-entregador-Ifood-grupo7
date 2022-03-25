import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import getToken from "../utils/getToken";
export default function PrivateRoute() {
  const token = getToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token && pathname !== "/login") {
      return navigate("/login");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

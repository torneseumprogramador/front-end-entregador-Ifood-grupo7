import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoute() {
  const token = window.localStorage.getItem("ksToken");
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

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (false && pathname !== "/login") {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

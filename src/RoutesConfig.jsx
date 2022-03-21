import { Routes, Route } from "react-router-dom";

import Orders from "./pages/Orders";
import OrderTraking from "./pages/OrderTraking";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";

function RoutesConfig() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Orders />} />

        <Route path="/:pedidoid" element={<OrderTraking />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default RoutesConfig;

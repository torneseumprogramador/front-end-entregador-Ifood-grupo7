import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import OrderTraking from "./pages/OrderTraking";
import PrivateRoute from "./pages/PrivateRoute";
import { TrackingPulseProvider } from "./utils/contexts/TrackingPulse";

function RoutesConfig() {
  return (
    <Routes>
      <Route element={<TrackingPulseProvider />}>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Orders />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/:orderid" element={<OrderTraking />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default RoutesConfig;

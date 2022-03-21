import { Link } from "react-router-dom";

import ordersList from "../utils/fakeOrders";

export default function Orders() {
  return (
    <ul>
      {ordersList.map((order) => {
        return (
          <li key={order.id}>
            <Link to={`/${order.id}`}>{order.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

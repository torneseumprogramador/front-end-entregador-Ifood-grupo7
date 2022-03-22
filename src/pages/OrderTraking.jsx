import { useParams } from "react-router-dom";

export default function OrderTraking() {
  const params = useParams();

  return <div>PedidoTraking {params.orderid}</div>;
}

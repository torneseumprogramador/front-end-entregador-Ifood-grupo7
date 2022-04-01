import axios from "../axiosConfig";

export default async (orderId) => {
  const response = await axios.put(`orders/${orderId}/status/3`);
  return response.data;
};

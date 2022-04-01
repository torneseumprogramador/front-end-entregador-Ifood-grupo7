import {
  Box,
  Link,
  List,
  ListItem,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { useQuery } from "react-query";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import getOrdersHome from "../utils/api/getOrdersHome";
import { TrackingPulse } from "../utils/contexts/TrackingPulse";

export default function Orders() {
  const navigate = useNavigate();
  const {
    pulseTracking,
    startPulseTracking,
    stopPulseTracking,
    setPulseTrackingOrderId,
  } = React.useContext(TrackingPulse);
  const [intransit, setIntransit] = React.useState(false);
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery("orders", getOrdersHome, { cacheTime: 0 });

  React.useEffect(() => {
    const findInTransit = orders?.findIndex((order) => order.status === 2);

    if (findInTransit > -1) {
      setIntransit(true);
      if (pulseTracking === false) {
        setPulseTrackingOrderId(orders[findInTransit].orderId);
        startPulseTracking(true);
      }
    } else {
      setIntransit(false);
    }
  }, [orders]);

  function logOut() {
    localStorage.removeItem("ksToken");
    navigate("/login");
  }

  return (
    <Box minHeight="100vh" bg="gray.100">
      <Box
        borderBottom="1px"
        border
        borderColor="blackAlpha.200"
        py={5}
        bg="white"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={4}
      >
        <span></span>
        <Text
          align="center"
          fontSize="1rem"
          fontWeight="medium"
          casing="uppercase"
        >
          Pedidos
        </Text>

        <Icon
          icon="ic:outline-exit-to-app"
          fontSize="1.5rem"
          onClick={logOut}
        />
      </Box>

      {isLoading && (
        <Stack px={4} mt={4} spacing={4}>
          {Array.apply(null, Array(5)).map((item, index) => (
            <Skeleton height={12} key={"skeleton" + index} />
          ))}
        </Stack>
      )}

      {!isLoading && (
        <Box padding="1rem .5rem">
          <List listStyleType="none">
            {orders.map((order) => {
              return (
                <ListItem key={order.orderId} mb={2} borderRadius={6} _disabled>
                  <Link
                    as={RouterLink}
                    to={`/${order.orderId}`}
                    fontWeight="medium"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                    p={4}
                    borderRadius={10}
                    bg={order.status === 2 ? "primary" : "white"}
                    color={order.status === 2 ? "white" : "currentcolor"}
                    pointerEvents={order.status !== 2 && intransit && "none"}
                    opacity={order.status !== 2 && intransit && ".3"}
                  >
                    {order.status === 2 && (
                      <Icon icon="ph:map-pin-line-duotone" fontSize="1.3rem" />
                    )}
                    <Text flexGrow={1}>Pedido {order.orderId}</Text>

                    <Icon icon="ic:baseline-chevron-right" fontSize="2rem" />
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}

      {orders?.length == 0 && (
        <Text textAlign="center" fontWeight="bold">
          Nenhum pedido disponível
        </Text>
      )}
    </Box>
  );
}

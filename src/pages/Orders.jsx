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
import { Link as RouterLink } from "react-router-dom";
import axios from "../utils/axiosConfig";

export default function Orders() {
  const [intransit, setIntransit] = React.useState(false);
  const { data, isLoading, isError } = useQuery(
    "orders",
    async () => {
      const response = await axios.get("orders");
      const existsInTransit = response.data.find(
        (order) => order.status === "EM_TRANSITO"
      );

      if (existsInTransit) {
        setIntransit(true);

        return response.data.sort((a, b) => {
          if (a.status === "EM_TRANSITO") {
            return -1;
          }
          return 0;
        });
      } else {
        setIntransit(false);
      }

      return response.data;
    },
    { cacheTime: 0 }
  );

  return (
    <Box minHeight="100vh" bg="gray.100">
      <Box
        borderBottom="1px"
        border
        borderColor="blackAlpha.200"
        py={5}
        bg="white"
      >
        <Text
          align="center"
          fontSize="1rem"
          fontWeight="medium"
          casing="uppercase"
        >
          Pedidos
        </Text>
      </Box>

      {isLoading && (
        <Stack px={4} mt={4} spacing={4}>
          {Array.apply(null, Array(5)).map((item, index) => (
            <Skeleton height={12} key={index} />
          ))}
        </Stack>
      )}

      {!isLoading && (
        <Box padding="1rem .5rem">
          <List listStyleType="none">
            {data.map((order) => {
              return (
                <ListItem key={order.id} mb={2} borderRadius={6} _disabled>
                  <Link
                    as={RouterLink}
                    to={`/${order.id}`}
                    fontWeight="medium"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                    p={4}
                    borderRadius={10}
                    bg={order.status === "EM_TRANSITO" ? "primary" : "white"}
                    color={
                      order.status === "EM_TRANSITO" ? "white" : "currentcolor"
                    }
                    pointerEvents={
                      order.status !== "EM_TRANSITO" && intransit && "none"
                    }
                    opacity={
                      order.status !== "EM_TRANSITO" && intransit && ".3"
                    }
                  >
                    {order.status === "EM_TRANSITO" && (
                      <Icon icon="ph:map-pin-line-duotone" fontSize="1.3rem" />
                    )}
                    <Text flexGrow={1}>Pedido {order.id}</Text>

                    <Icon icon="ic:baseline-chevron-right" fontSize="2rem" />
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </Box>
  );
}

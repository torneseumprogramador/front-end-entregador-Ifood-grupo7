import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Text,
  Skeleton,
  Stack,
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

import ordersList from "../utils/fakeOrders";

export default function Orders() {
  const [isLoading, setIsLoading] = React.useState(false);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

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
          {Array.apply(null, Array(6)).map((item, index) => (
            <Skeleton height={10} key={index} />
          ))}
        </Stack>
      )}

      {!isLoading && (
        <Box padding="1rem .5rem">
          <List listStyleType="none">
            {ordersList.map((order) => {
              return (
                <ListItem key={order.id} mb={2} borderRadius={6}>
                  <Link
                    as={RouterLink}
                    to={`/${order.id}`}
                    fontWeight="medium"
                    bg="white"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={4}
                    borderRadius={10}
                  >
                    Pedido {order.id}
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

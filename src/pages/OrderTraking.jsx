import React from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function OrderTraking() {
  const [loading, setLoading] = React.useState();
  const params = useParams();

  function getGeoLocation() {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLoading(false);
        alert(position.coords.latitude + " " + position.coords.longitude);
      });
    } else {
      alert("O serviço de geolocalização não é suportado pelo seu navegador.");
    }
  }

  return (
    <Box minHeight="100vh" bg="gray.100">
      <Box
        borderBottom="1px"
        borderColor="blackAlpha.200"
        py={4}
        px={4}
        mb={4}
        bg="white"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link as={RouterLink} to={`/`} color="primary">
          <Icon icon="ic:baseline-chevron-left" fontSize="2rem" />
        </Link>
        <Text
          align="center"
          fontSize="1rem"
          fontWeight="medium"
          casing="uppercase"
          marginLeft={-4}
        >
          Pedido {params.orderid}
        </Text>
        <span></span>
      </Box>

      <Box px={4}>
        <Button w="full" onClick={getGeoLocation} isLoading={loading}>
          Iniciar Tracking
        </Button>
      </Box>
    </Box>
  );
}

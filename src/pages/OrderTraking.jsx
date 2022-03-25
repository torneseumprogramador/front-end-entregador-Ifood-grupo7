import React from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Link, Button, position } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function OrderTraking() {
  const [loading, setLoading] = React.useState();
  const [trakingHistory, setTrakingHistory] = React.useState([]);
  const params = useParams();

  React.useEffect(async () => {
    if (trakingHistory.length > 0) {
      setTimeout(() => {
        addTrack();
      }, 10000);
    }
  }, [trakingHistory]);

  async function getGeoLocation() {
    const coordinates = await getCoordinates();

    return {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
      timestamp: coordinates.timestamp,
    };
  }

  function getCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function addTrack() {
    setLoading(true);
    const geolocation = await getGeoLocation();

    setTrakingHistory([
      {
        timestamp: geolocation.timestamp,
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
      },
      ...trakingHistory,
    ]);
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
        position="sticky"
        top={0}
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

      <Box>
        {trakingHistory.length > 0 && (
          <>
            <Box></Box>
            <Box px={4} minHeight="100vh">
              {trakingHistory.map((track, index) => {
                return (
                  <Box
                    key={track.timestamp}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    mb={4}
                    pb={4}
                    borderBottom="1px"
                    borderColor="gray.300"
                  >
                    <Box
                      boxSize={10}
                      bg="gray.200"
                      rounded="full"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color="primary"
                    >
                      <Icon icon="ph:map-pin-line-duotone" fontSize="1.5rem" />
                    </Box>

                    <Box flexGrow={1}>
                      <Text>
                        <Text
                          as="span"
                          fontSize="0.6rem"
                          fontWeight="bold"
                          color="gray.500"
                        >
                          LAT:
                        </Text>{" "}
                        {track.latitude}
                      </Text>

                      <Text>
                        <Text
                          as="span"
                          fontSize="0.6rem"
                          fontWeight="bold"
                          color="gray.500"
                        >
                          LON:
                        </Text>{" "}
                        {track.longitude}
                      </Text>
                    </Box>

                    <Text
                      fontSize="0.8rem"
                      fontWeight="medium"
                      color="gray.600"
                    >
                      {new Date(track.timestamp).toLocaleTimeString()}
                    </Text>
                  </Box>
                );
              })}
            </Box>

            <Box
              position="sticky"
              bottom="0"
              px={4}
              py={3}
              bg="white"
              borderTop="1px"
              borderColor="blackAlpha.200"
              display="flex"
              gap={4}
            >
              <Button flexGrow={1}>Concluir</Button>
              <Button flexGrow={1} bg="gray.500">
                Cancelar
              </Button>
            </Box>
          </>
        )}

        {trakingHistory.length === 0 && (
          <Box px={4}>
            <Button w="full" onClick={addTrack} isLoading={loading}>
              Iniciar Tracking
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

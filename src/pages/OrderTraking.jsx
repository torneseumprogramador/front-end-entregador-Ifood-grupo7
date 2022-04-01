import { Box, Button, Link, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link as RouterLink, useParams } from "react-router-dom";
import cancelOrder from "../utils/api/cancelOrder";
import completeOrder from "../utils/api/completeOrder";
import startOrderTracking from "../utils/api/startOrderTracking.js";
import axios from "../utils/axiosConfig";
import { TrackingPulse } from "../utils/contexts/TrackingPulse";

export default function OrderTraking() {
  const {
    pulseTracking,
    startPulseTracking,
    stopPulseTracking,
    setPulseTrackingOrderId,
  } = React.useContext(TrackingPulse);
  const [loadingButtons, setLoadingButtons] = React.useState(false);
  const params = useParams();
  const { data, isLoading, isError } = useQuery(
    "order",
    async () => {
      const response = await axios.get(`orders/${params.orderid}`);
      response.data.trackingList.sort((a, b) => {
        if (Number(a.timestamp) < Number(b.timestamp)) {
          return 1;
        }
        if (Number(a.timestamp) > Number(b.timestamp)) {
          return -1;
        }
        return 0;
      });
      if (response.data.status === 2 && pulseTracking === false) {
        setPulseTrackingOrderId(response.data.orderId);
        startPulseTracking(true);
      }
      return response.data;
    },
    { cacheTime: 0 }
  );

  const queryClient = useQueryClient();
  // inicia o tracking
  async function start() {
    setLoadingButtons(true);
    setPulseTrackingOrderId(data.orderId);

    const response = await startOrderTracking(data.orderId);

    queryClient.invalidateQueries(["order"]);
    startPulseTracking();
    setLoadingButtons(false);
  }

  // conclui
  async function complete() {
    setLoadingButtons(true);
    stopPulseTracking();
    const response = await completeOrder(data.orderId);
    queryClient.invalidateQueries(["order"]);
    setPulseTrackingOrderId(null);
    setLoadingButtons(false);
  }

  // cancela
  async function cancel() {
    setLoadingButtons(true);
    stopPulseTracking();
    const response = await cancelOrder(data.orderId);
    queryClient.invalidateQueries(["order"]);
    setPulseTrackingOrderId(null);
    setLoadingButtons(false);
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

      {isLoading && <Text textAlign="center">Carregando...</Text>}

      {data?.status === 2 && (
        <Box display="flex" justifyContent="center">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Box>
      )}

      {/* caso status concluido */}
      {data?.status === 3 && (
        <Text textAlign="center" mb={4} fontSize="1.2rem" fontWeight="bold">
          Pedido concluido
        </Text>
      )}

      {/* caso status cancelado */}
      {data?.status === 4 && (
        <Text textAlign="center" mb={4} fontSize="1.2rem" fontWeight="bold">
          Pedido cancelado
        </Text>
      )}

      {isError && (
        <Text textAlign="center" mb={4} fontSize="1.2rem" fontWeight="bold">
          Pedido não encontrado
        </Text>
      )}

      <Box>
        {/* caso possua um histórico de tracking */}
        {data?.trackingList.length > 0 && (
          <>
            <Box></Box>
            <Box px={4}>
              {data.trackingList.map((track, index) => {
                return (
                  <Box
                    key={track.id}
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
                      {new Date(Number(track.timestamp)).toLocaleTimeString()}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          </>
        )}

        {/* caso status em espera */}
        {data?.status === 1 && (
          <Box px={4}>
            <Button w="full" onClick={start} isLoading={loadingButtons}>
              Iniciar Tracking
            </Button>
          </Box>
        )}

        {/* caso status em transito */}
        {data?.status === 2 && (
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
            <Button flexGrow={1} onClick={complete} isLoading={loadingButtons}>
              Concluir
            </Button>
            <Button
              flexGrow={1}
              bg="gray.500"
              _hover={{ bg: "gray.600" }}
              _focus={{ bg: "gray.600" }}
              _active={{ bg: "gray.600" }}
              isLoading={loadingButtons}
              onClick={cancel}
            >
              Cancelar
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  Radio,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiDraftFill,
} from "react-icons/ri";
import { useDispatch } from "react-redux";
import { BackButton } from "../../../components/intranet/BackButton";
import { showHideSideBar } from "../../../redux/actions/sideBarActions";
import { S3_URL } from "../../../utils/constant";
import { useGetStringId } from "../../../utils/useGetStringId";

const Quizz: React.FC<{}> = ({}) => {
  const id = useGetStringId();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showHideSideBar(true)); // hides sidebar when loading
    return () => {
      dispatch(showHideSideBar(false)); // shows sidebar when unmounting
    };
  }, [id]);
  return (
    <SimpleGrid columns={12}>
      <GridItem
        colSpan={4}
        px={16}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        height="100vh"
        borderRight="1px solid"
        borderRightColor="blue.800"
      >
        <BackButton text="Volver al curso" />
        <HStack color="white" mb={8} mt={4}>
          <Icon as={RiDraftFill} fontSize="x-large" />
          <Heading fontSize="28px">Examen</Heading>
        </HStack>
        <Text fontSize="x-large">Diseño de diques rompeolas con cubípodos</Text>
        <Stack borderRadius="md" bg="blue.700" p={4} mt={8}>
          <Text>Comentarios del profesor:</Text>
          <Text>
            Tienes un máximo de 3 intentos. No está permitido copiar de otros
            asistenteso de apuntes del curso u otra bibliografía. La
            calificación será de 0 a 20. Cada respuesta correcta equivale a 04
            puntos.
          </Text>
        </Stack>
      </GridItem>
      <GridItem
        colSpan={8}
        background={`url(${S3_URL}/public-assets/courseBg.png)`}
        backgroundRepeat="no-repeat"
        display="flex"
        justifyContent="center"
        position="relative"
        borderRight="1px solid"
        borderRightColor="blue.800"
      >
        <Stack
          h="full"
          w="70%"
          justifyContent="center"
          color="white"
          spacing={4}
        >
          <Box ml="auto" opacity="0.7">
            Pregunta 4 de 12
          </Box>
          <HStack spacing={1}>
            <Box w="64px" h="6px" bg="blue.500" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.500" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.500" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.500" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.600" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.600" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.600" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.600" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.600" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.600" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.600" borderRadius="4px" />
            <Box w="64px" h="6px" bg="blue.600" borderRadius="4px" />
          </HStack>
          <Text color="white" fontSize="20px" fontWeight="bold">
            4. Cite y explique 05 razones por las cuales los proyectos de
            gestión y conservación de carreteras por niveles de servicio, no son
            iguales.
          </Text>
          <Box opacity="0.7">Escoge una de las opciones debajo</Box>
          <Stack spacing={3}>
            <Flex
              p={4}
              bg="rgba(20, 136, 243, 0.15)"
              borderRadius="4px"
              border="2px solid"
              borderColor="blue.500"
            >
              <Box fontWeight="bold">A.</Box>
              <Box ml="2">Escoge una de las cuatro opciones</Box>
              <Box ml="auto">
                <Radio isChecked />
              </Box>
            </Flex>
            <Flex
              p={4}
              bg="blue.700"
              borderRadius="4px"
              border="2px solid"
              borderColor="blue.400"
            >
              <Box fontWeight="bold">B.</Box>
              <Box ml="2">Escoge una de las cuatro opciones</Box>
            </Flex>
            <Flex
              p={4}
              bg="blue.700"
              borderRadius="4px"
              border="2px solid"
              borderColor="blue.400"
            >
              <Box fontWeight="bold">C.</Box>
              <Box ml="2">Escoge una de las cuatro opciones</Box>
            </Flex>
            <Flex
              p={4}
              bg="blue.700"
              borderRadius="4px"
              border="2px solid"
              borderColor="blue.400"
            >
              <Box fontWeight="bold">D.</Box>
              <Box ml="2">Escoge una de las cuatro opciones</Box>
            </Flex>
          </Stack>
          <Flex justifyContent="flex-end">
            <HStack cursor="pointer">
              <Icon as={RiArrowLeftSLine} fontSize="x-large" />
              <Box>Anterior</Box>
            </HStack>
            <HStack ml={4} cursor="pointer">
              <Box>Siguiente</Box>
              <Icon as={RiArrowRightSLine} fontSize="x-large" />
            </HStack>
          </Flex>
          <HStack
            position="absolute"
            py={4}
            bg="blue.900"
            bottom="0"
            borderTop="1px solid"
            borderTopColor="blue.800"
            left="0"
            w="full"
            justifyContent="center"
            zIndex={1}
          >
            <HStack w="70%" spacing="auto">
              <Stack>
                <Text opacity="0.7">Te quedan</Text>
                <Text fontWeight="bold">19:35 min</Text>
              </Stack>
              <Box>
                <Flex justifyContent="flex-end">
                  <Button variant="green">Terminar examen</Button>
                </Flex>
              </Box>
            </HStack>
          </HStack>
        </Stack>
      </GridItem>
    </SimpleGrid>
  );
};

export default Quizz;

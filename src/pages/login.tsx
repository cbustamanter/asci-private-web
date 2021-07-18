import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  LightMode,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { RiFacebookBoxLine, RiLinkedinBoxLine } from "react-icons/ri";
import { AlertWrapper } from "../components/AlertWrapper";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { LoginHeader } from "../components/LoginHeader";
import { LoginWrapper } from "../components/LoginWrapper";
import { useLoginMutation } from "../generated/graphql";
import { S3_URL } from "../utils/constant";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Container
      background={`url(${S3_URL}/public-assets/bg-1.png)`}
      backgroundRepeat="no-repeat"
      backgroundColor="rgba(27, 35, 62, 1)"
      backgroundBlendMode="color-dodge"
      backgroundSize="contain"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight="100vh"
    >
      <Stack color="white" alignItems="center">
        <Box>
          <Heading fontSize="18px" lineHeight="24px" fontWeight="400">
            Bienvenido a
          </Heading>
        </Box>
        <Box>
          <Heading fontSize="32px" lineHeight="40px">
            ASCI PERÚ
          </Heading>
        </Box>
        <Box w="44px" h="4px" bg="blue.500"></Box>
      </Stack>
      <LoginWrapper p={6}>
        <LoginHeader />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            const response = await login(values);
            if (response.data?.login?.errors) {
              const errorMap = toErrorMap(response.data?.login?.errors);
              if ("email" in errorMap) {
                setTokenError(errorMap.email);
              }
            } else if (response.data?.login?.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                console.log(response.data.login.user.role);
                if (response.data.login.user.role === 1) {
                  router.push("/");
                } else {
                  router.push("/admin");
                }
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {tokenError ? (
                <AlertWrapper error="Usuario o contraseña incorrectos" />
              ) : null}
              <InputField
                label="Correo electrónico"
                onInput={() => setTokenError("")}
                name="email"
                placeholder="Ejemplo@culqi.com"
              />
              <Box my={4}>
                <InputField
                  label="Contraseña"
                  onInput={() => setTokenError("")}
                  name="password"
                  type="password"
                  placeholder="Escribe tu contraseña"
                />
              </Box>
              <Flex mb={6}>
                <Text color="platedark" mr={1}>
                  ¿Olvidaste tu contraseña?
                </Text>
                <NextLink href="/forgot-password">
                  <Text as={Link} color="blue.500" fontWeight="bold">
                    Recupérala aquí
                  </Text>
                </NextLink>
              </Flex>
              <LightMode>
                <Button isLoading={isSubmitting} type="submit" width="100%">
                  Iniciar sesión
                </Button>
              </LightMode>
              <Flex mt={4} flexDirection="column" alignItems="center">
                <Box color="platedark">
                  ¿No tienes cuenta? Compra un curso y accede
                </Box>
                <Box mt={2}>
                  <Text as="u" color="blue.500" fontWeight="bold">
                    Ver cursos disponibles
                  </Text>
                </Box>
              </Flex>
            </Form>
          )}
        </Formik>
      </LoginWrapper>
      <Stack color="blue.500">
        <Stack direction="row" justifyContent="center">
          <Box>
            <Icon as={RiFacebookBoxLine} fontSize="xx-large" />
          </Box>
          <Box>
            <Icon as={RiLinkedinBoxLine} fontSize="xx-large" />
          </Box>
        </Stack>
        <Text color="gray.500">www.asciperu.com</Text>
      </Stack>
    </Container>
  );
};
export default withUrqlClient(createUrqlClient)(Login);

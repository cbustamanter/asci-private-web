import { Box, Button, Flex, LightMode, Link, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { AlertWrapper } from "../components/AlertWrapper";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { LoginHeader } from "../components/LoginHeader";
import { LoginWrapper } from "../components/LoginWrapper";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Container alignItems="center" justifyContent="center" minHeight="100vh">
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
    </Container>
  );
};
export default withUrqlClient(createUrqlClient)(Login);

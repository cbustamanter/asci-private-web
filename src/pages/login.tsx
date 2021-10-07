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
  Image,
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
import { NextSeo } from "next-seo";
import { LoginContainer } from "../components/LoginContainer";

interface loginProps {}
const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <LoginContainer>
      <NextSeo title="Ingresar | ASCI" description="Ingresa a ASCI" />
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
                placeholder="Ejemplo@asciperu.com"
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
                <Box>
                  <Link
                    href="https://api.whatsapp.com/send?phone=+51946628729"
                    isExternal
                  >
                    <Text as="u" color="blue.500" fontWeight="bold">
                      Contáctanos para más cursos
                    </Text>
                  </Link>
                </Box>
              </Flex>
            </Form>
          )}
        </Formik>
      </LoginWrapper>
    </LoginContainer>
  );
};
export default withUrqlClient(createUrqlClient)(Login);

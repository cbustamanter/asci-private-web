import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, LightMode, Link, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { LoginWrapper } from "../components/LoginWrapper";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const router = useRouter();
  return (
    <Container minHeight="100vh" justifyContent="center">
      <LoginWrapper p={6}>
        <Flex
          as={Link}
          textTransform="uppercase"
          onClick={() => router.back()}
          color="darkplate"
          alignItems="center"
          fontWeight="bold"
          mb={4}
          fontSize={12}
        >
          <ChevronLeftIcon w={5} h={5} />
          volver
        </Flex>
        <Flex flexDirection="column" mb={6}>
          <Text
            mb={1}
            fontSize={20}
            fontWeight="bold"
            lineHeight="28px"
            color="platedarker"
          >
            ¿Olvidaste tu contraseña?
          </Text>
          <Text
            maxWidth="xs"
            fontWeight="20px"
            color="platedark"
            fontSize={14.5}
          >
            Ingresa tu correo y te enviaremos instrucciones para que puedas
            restablecerla.
          </Text>
        </Flex>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                label="Correo electrónico"
                name="email"
                placeholder="Ejemplo@culqi.com"
              />
              <LightMode>
                <Button mt={6} type="submit" width="100%">
                  Enviar
                </Button>
              </LightMode>
            </Form>
          )}
        </Formik>
      </LoginWrapper>
    </Container>
  );
};
export default ForgotPassword;

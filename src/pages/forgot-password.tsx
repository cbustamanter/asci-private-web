import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, LightMode, Link, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { SectionDescLogin } from "../components/SectionDescLogin";
import { SectionHeadingLogin } from "../components/SectionHeadingLogin";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { LoginWrapper } from "../components/LoginWrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const router = useRouter();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Container minHeight="100vh" alignItems="center" justifyContent="center">
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
        {!isSent ? (
          <>
            <Flex flexDirection="column" mb={6}>
              <SectionHeadingLogin title="¿Olvidaste tu contraseña?" />
              <SectionDescLogin
                desc="Ingresa tu correo y te enviaremos instrucciones para que puedas
                restablecerla."
              />
            </Flex>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await forgotPassword(values);
                if (response.data?.forgotPassword.errors) {
                  setErrors(toErrorMap(response.data.forgotPassword.errors));
                } else {
                  setEmail(values.email);
                  setIsSent(true);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    label="Correo electrónico"
                    name="email"
                    placeholder="Ejemplo@culqi.com"
                    type="email"
                  />
                  <LightMode>
                    <Button
                      mt={6}
                      type="submit"
                      isLoading={isSubmitting}
                      width="100%"
                    >
                      Enviar
                    </Button>
                  </LightMode>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <Flex flexDirection="column" mb={6}>
              <SectionHeadingLogin title="Email enviado" />
              <SectionDescLogin
                desc={`Hemos enviado un correo a ${email} con las instrucciones para
                restablecer tu contraseña`}
              />
            </Flex>
          </>
        )}
      </LoginWrapper>
    </Container>
  );
};
export default withUrqlClient(createUrqlClient)(ForgotPassword);

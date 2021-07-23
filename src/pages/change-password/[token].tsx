import { Box, Button, LightMode } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AlertWrapper } from "../../components/AlertWrapper";
import { Container } from "../../components/Container";
import { InputField } from "../../components/InputField";
import { InputFloatingButton } from "../../components/InputFloatingButton";
import { LoginWrapper } from "../../components/LoginWrapper";
import { SectionDescLogin } from "../../components/SectionDescLogin";
import { SectionHeadingLogin } from "../../components/SectionHeadingLogin";
import { useChangePasswordMutation } from "../../generated/graphql";
import { S3_URL } from "../../utils/constant";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { NextSeo } from "next-seo";

const ChangePassword: React.FC<{}> = ({}) => {
  const router = useRouter();
  const token = router.query.token;
  const [firstP, setFirstP] = useState<string>("password");
  const [secondP, setSecondP] = useState<string>("password");
  const [tokenError, setTokenError] = useState("");
  const [, changePassword] = useChangePasswordMutation();
  const showHideFirstP = () => {
    const type = firstP === "password" ? "" : "password";
    setFirstP(type);
  };
  const showHideSecondP = () => {
    const type = secondP === "password" ? "" : "password";
    setSecondP(type);
  };
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
      <NextSeo title="Cambiar contraseña | ASCI" />
      <LoginWrapper p={6}>
        <SectionHeadingLogin title="Restablecer Contraseña" />
        <SectionDescLogin
          desc="Crea una nueva contraseña y empieza a aprender con nosotros."
          mb={6}
        />
        <Formik
          initialValues={{ password: "", newPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            if (values.password !== values.newPassword) {
              setTokenError("Las contraseñas deben coincidir.");
              return;
            }
            const response = await changePassword({
              newPassword: values.newPassword,
              token: typeof token === "string" ? token : "",
            });
            if (response.data?.changePassword?.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword?.user) {
              router.replace("/login");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {tokenError ? <AlertWrapper error={tokenError} /> : null}
              <Box position="relative">
                <InputField
                  label="Nueva contraseña"
                  name="password"
                  onInput={() => setTokenError("")}
                  type={firstP}
                  placeholder="Escribe tu contraseña"
                />
                <InputFloatingButton
                  aria-label="eye1"
                  onClick={() => showHideFirstP()}
                />
              </Box>
              <Box mt={4} position="relative">
                <InputField
                  label="Repite tu contraseña"
                  name="newPassword"
                  onInput={() => setTokenError("")}
                  type={secondP}
                  placeholder="Escribe tu contraseña"
                />
                <InputFloatingButton
                  aria-label="eye2"
                  onClick={() => showHideSecondP()}
                />
              </Box>
              <LightMode>
                <Button
                  mt={6}
                  type="submit"
                  width="100%"
                  isLoading={isSubmitting}
                >
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
export default withUrqlClient(createUrqlClient)(ChangePassword);

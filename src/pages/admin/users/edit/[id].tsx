import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { countries } from "country-data";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SectionHeading } from "../../../../components/admin/SectionHeading";
import { Wrapper } from "../../../../components/admin/Wrapper";
import { InputField } from "../../../../components/InputField";
import { SelectField } from "../../../../components/SelectField";
import { useUpdateUserMutation } from "../../../../generated/graphql";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { toErrorMap } from "../../../../utils/toErrorMap";
import { useGetStringId } from "../../../../utils/useGetStringId";
import { useGetUserFromUrl } from "../../../../utils/useGetUserFromUrl";

interface EditProps {}

const Edit: React.FC<EditProps> = ({}) => {
  const [{ data, fetching }] = useGetUserFromUrl();
  const id = useGetStringId();
  const [, updateUser] = useUpdateUserMutation();

  if (fetching) {
    return (
      <Wrapper>
        <Box>Cargando..</Box>
      </Wrapper>
    );
  }
  if (!data?.getUser) {
    return (
      <Wrapper>
        <Box>No se pudo encontrar información</Box>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <SectionHeading title="Editar estudiante" mb={[4, 8]} />
      <Formik
        initialValues={{
          names: data.getUser.names,
          surnames: data.getUser.surnames,
          email: data.getUser.email,
          cellphone: data.getUser.cellphone,
          country: data.getUser.country,
          gender: data.getUser.gender,
        }}
        onSubmit={async (values, { setErrors, setFieldValue }) => {
          const response = await updateUser({
            id,
            input: {
              ...values,
              gender:
                values.gender < 0
                  ? undefined
                  : parseInt(values.gender.toString()),
            },
          });
          if (response.data?.updateUser.errors) {
            setErrors(toErrorMap(response.data.updateUser.errors));
          } else {
            router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection="column" maxWidth="600px" width="100%">
              <SimpleGrid columns={[1, 2]} spacing={10}>
                <InputField
                  label="Nombre"
                  name="names"
                  placeholder="Ingresa un nombre"
                />
                <InputField
                  label="Apellidos"
                  name="surnames"
                  placeholder="Ingresa un apellido"
                />
                <InputField
                  label="Correo"
                  name="email"
                  type="email"
                  placeholder="Ingresa un correo"
                />
                <InputField
                  label="Celular"
                  name="cellphone"
                  placeholder="Ingresa un celular"
                />
                <SelectField
                  label="País"
                  name="country"
                  placeholder="Selecciona un país"
                >
                  {countries.all.map((country, idx) => (
                    <option key={idx} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </SelectField>
                <SelectField
                  name="gender"
                  label="Género"
                  placeholder="Selecciona un género"
                >
                  <option value={0}>Femenino</option>
                  <option value={1}>Masculino</option>
                </SelectField>
              </SimpleGrid>
              <Flex
                ml={[0, "auto"]}
                mt={4}
                flexDirection={["column-reverse", "row"]}
              >
                <Button colorScheme="gray">Cancelar</Button>
                <Button
                  isLoading={isSubmitting}
                  ml={[0, 4]}
                  mb={[4, 0]}
                  type="submit"
                >
                  Guardar cambios
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(Edit);

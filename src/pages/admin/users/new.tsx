import { Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { countries } from "country-data";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SectionHeading } from "../../../components/admin/SectionHeading";
import { Wrapper } from "../../../components/admin/Wrapper";
import { InputField } from "../../../components/InputField";
import { SelectField } from "../../../components/SelectField";
import { useCreateUserMutation } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { toErrorMap } from "../../../utils/toErrorMap";

const New: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [genderValue, setGender] = useState<number>();
  const [, createUser] = useCreateUserMutation();
  return (
    <Wrapper>
      <SectionHeading title="Crear estudiante" mb={[4, 8]} />
      <Formik
        initialValues={{
          names: "",
          surnames: "",
          email: "",
          cellphone: "",
          country: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createUser({
            input: { ...values, gender: genderValue },
          });
          if (response.data?.createUser.errors) {
            setErrors(toErrorMap(response.data.createUser.errors));
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
                  onChange={(e) => setGender(parseInt(e.target.value))}
                >
                  <option value={0}>Femenino</option>
                  <option value={1}>Masculino</option>
                </SelectField>
              </SimpleGrid>
              <Text
                color="platedark"
                fontSize="14.5px"
                lineHeight="20px"
                mt={[4]}
              >
                Al crear un estudiante se le envía al correo una contraseña
                automática. Recuerda asignarle un curso a este nuevo estudiante.
              </Text>
              <Flex
                ml={[0, "auto"]}
                mt={4}
                flexDirection={["column-reverse", "row"]}
              >
                <Button colorScheme="gray" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button
                  isLoading={isSubmitting}
                  ml={[0, 4]}
                  mb={[4, 0]}
                  type="submit"
                >
                  Crear estudiante
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(New);

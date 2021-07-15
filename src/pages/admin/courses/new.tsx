import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik, useField } from "formik";
import router from "next/router";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { AddSessionFiles } from "../../../components/AddSessionFiles";
import { SectionHeading } from "../../../components/admin/SectionHeading";
import { Wrapper } from "../../../components/admin/Wrapper";
import { DatePickerField } from "../../../components/DatePickerField";
import { InputField } from "../../../components/InputField";
import { RegularDropzone } from "../../../components/RegularDropzone";
import { useCreateCourseMutation } from "../../../generated/graphql";
import { CourseSessions } from "../../../types/courseTypes";

const New: React.FC<{}> = ({}) => {
  const sessionObject: CourseSessions = {
    name: "",
    startTime: new Date(),
    endTime: new Date(),
    recordingUrl: "",
    files: undefined,
  };
  const [hasTest, setHasTest] = useState(true);
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const [, createCourse] = useCreateCourseMutation();
  const bg = useColorModeValue("#F7F9FB", "gray.800");
  const filesBg = useColorModeValue("#E6EAED", "gray.600");

  const handleCoverPhoto = (files: File[]) => {
    setCoverPhoto(files[0]);
  };
  return (
    <Wrapper>
      <SectionHeading title="Crear curso" />
      <Formik
        initialValues={{
          name: "",
          description: "",
          classUrl: "",
          startDate: new Date(),
          endDate: new Date(),
          courseSessions: [sessionObject],
        }}
        onSubmit={async (values, { setErrors }) => {
          values.courseSessions.map((t) => {
            t.files = t.files?.flat();
            return t;
          });
          const response = await createCourse({
            courseDetail: {
              hasTest,
              classUrl: values.classUrl,
              coverPhoto,
              description: values.description,
              name: values.name,
              startDate: values.startDate,
              endDate: values.endDate,
            },
            courseSessions: values.courseSessions,
          });
          if (!response.error) {
            router.replace("/admin/courses");
          } else {
            console.log(values.courseSessions);
            console.log(response.error);
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Flex flexDirection="column" maxWidth="600px" width="100%" mt={4}>
              <SimpleGrid columns={1} spacing={4}>
                <Heading size="md">Detalles del curso</Heading>
                <InputField
                  label="Nombre del curso"
                  name="name"
                  placeholder="Ingresa un nombre"
                />
                <InputField
                  label="URL clase en vivo"
                  name="classUrl"
                  placeholder="Ingresa URL"
                />
                <InputField
                  label="Descripción del curso del curso"
                  textarea
                  name="description"
                  placeholder="Ingresa una descripción"
                />
                <RegularDropzone complete={handleCoverPhoto} />
                {coverPhoto ? (
                  <Box p={4} bg={filesBg}>
                    {coverPhoto.name}
                  </Box>
                ) : null}

                <SimpleGrid columns={2} spacing={4}>
                  <DatePickerField
                    name="startDate"
                    label="Fecha de Inicio"
                    minDate={new Date()}
                    showPopperArrow={true}
                  />
                  <DatePickerField
                    name="endDate"
                    label="Fecha de Fin"
                    minDate={values.startDate}
                    showPopperArrow={true}
                  />
                </SimpleGrid>
              </SimpleGrid>
              <SimpleGrid columns={1} spacing={4} mt={4}>
                <Heading size="md">Sesiones del curso</Heading>
                <FieldArray name="courseSessions">
                  {({ push, remove }) => (
                    <>
                      {values.courseSessions.map((v, idx) => {
                        return (
                          <SimpleGrid columns={1} spacing={4} key={idx}>
                            <Flex key={idx}>
                              <Heading fontSize="16px">
                                Sesión {idx + 1}
                              </Heading>
                              <Button
                                ml="auto"
                                variant="link"
                                colorScheme="red"
                                onClick={() => remove(idx)}
                              >
                                Eliminar sesión
                              </Button>
                            </Flex>
                            <SimpleGrid
                              columns={1}
                              spacing={4}
                              p={4}
                              backgroundColor={bg}
                              borderRadius="lg"
                              border="1px solid"
                              borderColor="#D4D8DD"
                            >
                              <InputField
                                label="Nombre de la sesión"
                                name={`courseSessions.${idx}.name`}
                                placeholder="Nombre de la sesión"
                              />
                              <SimpleGrid columns={2} spacing={4}>
                                <DatePickerField
                                  name={`courseSessions.${idx}.startTime`}
                                  label="Hora Inicio"
                                  dateFormat="h:mm aa"
                                  showTimeSelect
                                  showTimeSelectOnly
                                  showPopperArrow={true}
                                />
                                <DatePickerField
                                  name={`courseSessions.${idx}.endTime`}
                                  label="Hora Fin"
                                  dateFormat="h:mm aa"
                                  showTimeSelect
                                  showTimeSelectOnly
                                  showPopperArrow={true}
                                />
                              </SimpleGrid>
                              <InputField
                                label="URL de la grabación"
                                name={`courseSessions.${idx}.recordingUrl`}
                                placeholder="URL de la grabación"
                              />
                              <Flex flexDirection="column">
                                <DidacticMaterial
                                  name={`courseSessions.${idx}.files`}
                                />
                              </Flex>
                            </SimpleGrid>
                          </SimpleGrid>
                        );
                      })}
                      <Button
                        variant="link"
                        width="fit-content"
                        onClick={() => push(sessionObject)}
                      >
                        + Añadir sesión
                      </Button>
                    </>
                  )}
                </FieldArray>
              </SimpleGrid>
              <Flex alignItems="center" mt={4}>
                <Heading size="md">Examen del curso</Heading>
                <Switch
                  size="md"
                  ml={4}
                  isChecked={hasTest}
                  onChange={() => setHasTest(!hasTest)}
                />
              </Flex>
              <Text
                color="platedark"
                fontSize="14.5px"
                lineHeight="20px"
                mt={[4]}
              >
                Recuerda que debes crear el examen desde la sección Exámenes. El
                estudiante recibirá su certificado luego concluir su examen con
                una nota aprobatoria.
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
                  Crear curso
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

interface DidacticMaterial {
  name: string;
}

//TODO: TYPE THIS
export const DidacticMaterial: React.FC<DidacticMaterial> = ({
  children,
  ...props
}) => {
  const [field] = useField(props);
  const filesBg = useColorModeValue("#E6EAED", "gray.600");
  const value = field.value;
  return (
    <FieldArray name={`${field.name}`}>
      {({ push }) => (
        <>
          {!value?.length
            ? null
            : value?.map((v: []) => {
                if (v.length) {
                  return v.map((file: any) => (
                    <Box key={file.name} backgroundColor={filesBg} p={2} mt={3}>
                      {file.name}
                    </Box>
                  ));
                }
              })}
          <AddSessionFiles complete={(test) => push(test)} />
        </>
      )}
    </FieldArray>
  );
};

export default New;

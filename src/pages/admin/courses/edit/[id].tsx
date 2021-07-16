import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import { SectionHeading } from "../../../../components/admin/SectionHeading";
import { Wrapper } from "../../../../components/admin/Wrapper";
import { DatePickerField } from "../../../../components/DatePickerField";
import { DidacticMaterial } from "../../../../components/DidacticMaterial";
import { InputField } from "../../../../components/InputField";
import { RegularDropzone } from "../../../../components/RegularDropzone";
import { SkeletonPage } from "../../../../components/SkeletonPage";
import { useCourseQuery } from "../../../../generated/graphql";
import { S3_URL } from "../../../../utils/constant";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { isServer } from "../../../../utils/isServer";
import { useGetStringId } from "../../../../utils/useGetStringId";
import { sessionObject } from "../new";

interface IFiles {
  filename?: string;
  id?: string;
}
interface Files {
  oldFiles?: IFiles[];
  newFiles?: File[];
}

interface Sessions extends Files {
  id: string;
  name: string;
  recordingUrl: string;
  startTime: Date;
  endTime: Date;
}

const EditCourse: React.FC<{}> = ({}) => {
  const id = useGetStringId();
  const [{ data, fetching }] = useCourseQuery({
    pause: isServer(),
    variables: { id },
  });

  const bg = useColorModeValue("#F7F9FB", "gray.800");
  const filesBg = useColorModeValue("#E6EAED", "gray.600");

  return (
    <Wrapper>
      <SectionHeading title="Editar curso" />
      {fetching && !data ? (
        <SkeletonPage sections={3} itemPerSection={4} />
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            name: data?.course.courseDetail.name,
            description: data?.course.courseDetail.description,
            classUrl: data?.course.courseDetail.classUrl,
            startDate: data?.course.courseDetail.startDate,
            endDate: data?.course.courseDetail.endDate,
            hasTest: data?.course.hasTest,
            courseSession: data?.course.courseDetail.courseSessions || [],
            coverPhoto: data?.course.courseDetail.coverPhoto || ({} as File),
          }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            //     const response = await createCourse({
            //       courseDetail: {
            //         hasTest,
            //         classUrl: values.classUrl,
            //         coverPhoto,
            //         description: values.description,
            //         name: values.name,
            //         startDate: values.startDate,
            //         endDate: values.endDate,
            //       },
            //       courseSessions: sessions,
            //     });
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
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
                  <RegularDropzone
                    complete={(files) => setFieldValue("coverPhoto", files[0])}
                  />
                  {values.coverPhoto && typeof values.coverPhoto === "string" && (
                    <Box backgroundColor={filesBg} p={2}>
                      <Link href={`${S3_URL}${values.coverPhoto}`} isExternal>
                        {values.coverPhoto?.replace("/cover-photos/", "")}
                      </Link>
                    </Box>
                  )}
                  {values.coverPhoto && typeof values.coverPhoto !== "string" && (
                    <Box backgroundColor={filesBg} p={2}>
                      {values.coverPhoto.name}
                    </Box>
                  )}
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
                      minDate={new Date(values.startDate)}
                      showPopperArrow={true}
                    />
                  </SimpleGrid>
                </SimpleGrid>
                <SimpleGrid columns={1} spacing={4} mt={4}>
                  <Heading size="md">Sesiones del curso</Heading>
                  <FieldArray name="courseSession">
                    {({ push, remove }) => (
                      <>
                        {values.courseSession.map((v, idx) => {
                          return (
                            <SimpleGrid columns={1} spacing={4} key={idx}>
                              <Flex key={idx}>
                                <Heading fontSize="16px">
                                  Sesión: {v.name}
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
                                  name={`courseSession.${idx}.name`}
                                  placeholder="Nombre de la sesión"
                                />
                                <DatePickerField
                                  name={`courseSession.${idx}.startTime`}
                                  label="Hora Inicio"
                                  dateFormat="h:mm aa"
                                  showTimeSelect
                                  showPopperArrow={true}
                                />
                                <DatePickerField
                                  name={`courseSession.${idx}.endTime`}
                                  label="Hora Fin"
                                  dateFormat="h:mm aa"
                                  showTimeSelect
                                  showPopperArrow={true}
                                />
                                <InputField
                                  label="URL de la grabación"
                                  name={`courseSession.${idx}.recordingUrl`}
                                  placeholder="URL de la grabación"
                                />
                                <Flex flexDirection="column">
                                  <DidacticMaterial
                                    name={`courseSession.${idx}.sessionFiles`}
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
                    name="hasTest"
                    ml={4}
                    isChecked={values.hasTest}
                    onChange={() => setFieldValue("hasTest", !values.hasTest)}
                  />
                </Flex>
                <Text
                  color="platedark"
                  fontSize="14.5px"
                  lineHeight="20px"
                  mt={[4]}
                >
                  Recuerda que debes crear el examen desde la sección Exámenes.
                  El estudiante recibirá su certificado luego concluir su examen
                  con una nota aprobatoria.
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
                    Actualizar curso
                  </Button>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(EditCourse);

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
  useDisclosure,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useState } from "react";
import { SectionHeading } from "../../../../components/admin/SectionHeading";
import { Wrapper } from "../../../../components/admin/Wrapper";
import { DatePickerField } from "../../../../components/DatePickerField";
import { DeleteDialog } from "../../../../components/DeleteDialog";
import { DidacticMaterial } from "../../../../components/DidacticMaterial";
import { InputField } from "../../../../components/InputField";
import { RegularDropzone } from "../../../../components/RegularDropzone";
import { SkeletonPage } from "../../../../components/SkeletonPage";
import {
  useCourseQuery,
  useDeleteSessionMutation,
  useUpdateCourseMutation,
} from "../../../../generated/graphql";
import { S3_URL } from "../../../../utils/constant";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { useGetStringId } from "../../../../utils/useGetStringId";
import { courseSchema, sessionObject } from "../new";

const EditCourse: React.FC<{}> = ({}) => {
  const id = useGetStringId();
  const [, updateCourse] = useUpdateCourseMutation();
  const [, deleteSession] = useDeleteSessionMutation();
  const [{ data, fetching }] = useCourseQuery({
    // pause: isServer(),
    variables: { id },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sessionId, setSessionId] = useState<string>();
  const bg = useColorModeValue("#F7F9FB", "gray.800");
  const filesBg = useColorModeValue("#E6EAED", "gray.600");

  const handleDeleteSession = async (sessionId: any) => {
    await deleteSession({ id: sessionId });
    onClose();
  };

  const handleDeleteDialog = (id: string, remove: any, idx: number) => {
    if (!id) {
      remove(idx);
      return;
    }
    setSessionId(id);
    onOpen();
  };

  return (
    <Wrapper>
      <DeleteDialog
        onClose={onClose}
        onConfirm={handleDeleteSession}
        params={sessionId}
        isOpen={isOpen}
        header="¿Eliminar sesión?"
        body="¿Está seguro que quiere eliminar esta sesión?"
      />
      <SectionHeading title="Editar curso" />
      {fetching && !data ? (
        <SkeletonPage sections={3} itemPerSection={4} />
      ) : (
        <Formik
          enableReinitialize
          validationSchema={courseSchema}
          initialValues={{
            name: data?.course?.courseDetail.name,
            description: data?.course?.courseDetail.description,
            classUrl: data?.course?.courseDetail.classUrl,
            startDate: data?.course?.courseDetail.startDate,
            endDate: data?.course?.courseDetail.endDate,
            hasTest: data?.course?.courseDetail.hasTest,
            courseSession: data?.course?.courseDetail.courseSessions || [],
            coverPhoto: data?.course?.courseDetail.coverPhoto || ({} as File),
          }}
          onSubmit={async (values, { setErrors }) => {
            values.courseSession.map((v) => {
              delete v.__typename;
              v.courseSessionFiles?.map((f) => delete f.__typename);
            });
            const response = await updateCourse({
              id,
              courseDetail: {
                name: values.name,
                description: values.description,
                classUrl: values.classUrl,
                startDate: values.startDate,
                endDate: values.endDate,
                hasTest: values.hasTest,
                coverPhoto:
                  values.coverPhoto instanceof File
                    ? values.coverPhoto
                    : undefined,
              },
              courseSessions: values.courseSession,
            });
            if (response.data?.updateCourse) {
              router.replace("/admin/courses");
            } else {
              console.log(response.error);
            }
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
                      <Link
                        href={`${S3_URL}/cover-photos/${values.coverPhoto}`}
                        isExternal
                      >
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
                                  onClick={() =>
                                    handleDeleteDialog(v.id, remove, idx)
                                  }
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
                                  minDate={new Date(values.startDate)}
                                  dateFormat="yyyy-MM-d h:mm aa"
                                  showTimeSelect
                                  showPopperArrow={true}
                                />
                                <DatePickerField
                                  name={`courseSession.${idx}.endTime`}
                                  label="Hora Fin"
                                  dateFormat="yyyy-MM-d h:mm aa"
                                  minDate={
                                    new Date(
                                      values.courseSession[idx].startTime
                                    )
                                  }
                                  maxDate={
                                    new Date(
                                      values.courseSession[idx].startTime
                                    )
                                  }
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
                                    name={`courseSession.${idx}.courseSessionFiles`}
                                    hasAddFiles={false}
                                  />
                                  <DidacticMaterial
                                    name={`courseSession.${idx}.files`}
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

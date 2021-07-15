import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { DropEvent } from "react-dropzone";
import { TiDelete } from "react-icons/ti";
import { AddSessionFiles } from "../../../../components/AddSessionFiles";
import { SectionHeading } from "../../../../components/admin/SectionHeading";
import { Wrapper } from "../../../../components/admin/Wrapper";
import { DatePickerField } from "../../../../components/DatePickerField";
import { InputField } from "../../../../components/InputField";
import { RegularDropzone } from "../../../../components/RegularDropzone";
import { SkeletonPage } from "../../../../components/SkeletonPage";
import {
  useCourseQuery,
  useRemoveSessionFileMutation,
} from "../../../../generated/graphql";
import {
  CourseSessionGraph,
  CourseType,
  SessionFilesType,
  SessionObject,
  SessionTimesType,
} from "../../../../types/courseTypes";
import { S3_URL } from "../../../../utils/constant";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { isServer } from "../../../../utils/isServer";
import { useGetStringId } from "../../../../utils/useGetStringId";

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
  const [, removeSessionFile] = useRemoveSessionFileMutation();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [hasTest, setHasTest] = useState<boolean>();
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const bg = useColorModeValue("#F7F9FB", "gray.800");
  const filesBg = useColorModeValue("#E6EAED", "gray.600");
  const [sessions, setSessions] = useState<CourseSessionGraph>([]);
  const [newSession, setNewSession] = useState<Sessions[]>([]);

  const sessionOject: Sessions = {
    id: "",
    name: "",
    recordingUrl: "",
    startTime: new Date(),
    endTime: new Date(),
  };

  const addSession = () => {
    setSessions([...newSession, sessionOject]);
  };
  const handleChangeInput = (
    index: number,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const values = [...sessions];
    const fieldName = event.target.name as CourseType;
    values[index][fieldName] = event.target.value;
    setSessions(values);
  };
  const handleChangeTime = (
    date: Date,
    elementName: SessionTimesType,
    idx: number
  ) => {
    const values = [...sessions];
    values[idx][elementName] = date;
    setSessions(values);
  };
  const uploadFiles = (files: File[], event: DropEvent) => {
    const values = [...newSession];
    // const element = (event.target as HTMLInputElement).name as SessionFilesType;
    // values[idx]["newFiles"] = files;
    // setNewSession(values);
  };
  const removeFile = (
    sessionIdx: number,
    fileIdx: number,
    id: string,
    courseSessionId: string
  ) => {
    // removeSessionFile({ courseSessionId, id });
    const values = [...sessions];
    const files = values[sessionIdx].sessionFiles;
    if (files) {
      files.splice(fileIdx, 1);
    }
    setSessions(values);
  };
  const handleCoverPhoto = (files: File[]) => {
    setCoverPhoto(files[0]);
  };
  useEffect(() => {
    if (!fetching && data) {
      const sessionsData = data.course.courseDetail.courseSessions;
      if (sessionsData) {
        setSessions(sessionsData);
      }
      setHasTest(data.course.hasTest);
      setStartDate(new Date(data.course.courseDetail.startDate));
      setEndDate(new Date(data.course.courseDetail.endDate));
      const lanew = data.course.courseDetail.courseSessions.map(
        (s) =>
          ({
            id: s.id,
            name: s.name,
            recordingUrl: s.recordingUrl,
            startTime: new Date(s.startTime),
            endTime: new Date(s.endTime),
            oldFiles: s.sessionFiles,
          } as Sessions)
      );
      setNewSession(lanew);
    }
  }, [data]);
  return (
    <Wrapper>
      <SectionHeading title="Editar curso" />
      {/* {JSON.stringify(newSession)} */}
      {fetching && !data ? (
        <SkeletonPage sections={3} itemPerSection={4} />
      ) : (
        <Formik
          initialValues={{
            name: data?.course.courseDetail.name,
            description: data?.course.courseDetail.description,
            classUrl: data?.course.courseDetail.classUrl,
            startDate: data?.course.courseDetail.startDate,
            endDate: data?.course.courseDetail.endDate,
            courseSession: data?.course.courseDetail.courseSessions || [],
          }}
          onSubmit={async (values, { setErrors }) => {
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
                  <Box backgroundColor={filesBg} p={2}>
                    <Link
                      href={`${S3_URL}${data?.course.courseDetail.coverPhoto}`}
                      isExternal
                    >
                      {data?.course.courseDetail.coverPhoto.replace(
                        "/cover-photos/",
                        ""
                      )}
                    </Link>
                  </Box>

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
                      minDate={startDate}
                      showPopperArrow={true}
                    />
                  </SimpleGrid>
                </SimpleGrid>
                <SimpleGrid columns={1} spacing={4} mt={4}>
                  <Heading size="md">Sesiones del curso</Heading>
                  <FieldArray name="courseSession">
                    {({ push }) => (
                      <>
                        {values.courseSession.map((v, idx) => {
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
                                  // onClick={() => removeSession(idx)}
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
                                <SimpleGrid columns={2} spacing={4}>
                                  <DatePickerField
                                    name={`courseSession.${idx}.startTime`}
                                    label="Hora Inicio"
                                    dateFormat="h:mm aa"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    showPopperArrow={true}
                                  />
                                  <DatePickerField
                                    name={`courseSession.${idx}.endTime`}
                                    label="Hora Fin"
                                    dateFormat="h:mm aa"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    showPopperArrow={true}
                                  />
                                </SimpleGrid>
                                <InputField
                                  label="URL de la grabación"
                                  name={`courseSession.${idx}.recordingUrl`}
                                  placeholder="URL de la grabación"
                                  onChange={(event) =>
                                    handleChangeInput(idx, event)
                                  }
                                />
                                <Flex flexDirection="column">
                                  {/* {sessions.?.map((file, index) => (
                                    <Box
                                      key={file.name}
                                      backgroundColor={filesBg}
                                      p={2}
                                      mt={3}
                                      width="100%"
                                      position="relative"
                                    >
                                      {file.name}
                                      <Icon
                                        as={TiDelete}
                                        position="absolute"
                                        right={2}
                                        top={2}
                                        fontSize="x-large"
                                        cursor="pointer"
                                      />
                                    </Box>
                                  ))} */}
                                  {v.sessionFiles?.map((file, index) => (
                                    <Box
                                      key={file.filename}
                                      backgroundColor={filesBg}
                                      p={2}
                                      mt={3}
                                      width="100%"
                                      position="relative"
                                    >
                                      <Link
                                        href={`${S3_URL}${file.filename}`}
                                        isExternal
                                      >
                                        {file.filename?.replace(
                                          "/sessions/",
                                          ""
                                        )}
                                      </Link>
                                      <Icon
                                        as={TiDelete}
                                        position="absolute"
                                        right={2}
                                        top={2}
                                        fontSize="x-large"
                                        cursor="pointer"
                                        // onClick={() =>
                                        //   removeFile(idx, index, file.id, v.id)
                                        // }
                                      />
                                    </Box>
                                  ))}
                                  <AddSessionFiles
                                    complete={uploadFiles}
                                    name="files"
                                  />
                                </Flex>
                              </SimpleGrid>
                            </SimpleGrid>
                          );
                        })}
                      </>
                    )}
                  </FieldArray>
                  <Button
                    variant="link"
                    width="fit-content"
                    onClick={() => addSession()}
                  >
                    + Añadir sesión
                  </Button>
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

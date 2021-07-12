import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Switch,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DropEvent } from "react-dropzone";
import { AddSessionFiles } from "../../../components/AddSessionFiles";
import { SectionHeading } from "../../../components/admin/SectionHeading";
import { Wrapper } from "../../../components/admin/Wrapper";
import { DatePickerField } from "../../../components/DatePickerField";
import { InputField } from "../../../components/InputField";
import { RegularDropzone } from "../../../components/RegularDropzone";
import { useCreateCourseMutation } from "../../../generated/graphql";
import {
  CourseSessions,
  CourseType,
  SessionFilesType,
  SessionTimesType,
} from "../../../types/courseTypes";

const New: React.FC<{}> = ({}) => {
  const sessionObject = {
    name: "",
    startTime: new Date(),
    endTime: new Date(),
    recordingUrl: "",
  };
  const [sessions, setSessions] = useState<CourseSessions[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [hasTest, setHasTest] = useState(true);
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const [, createCourse] = useCreateCourseMutation();
  const bg = useColorModeValue("#F7F9FB", "gray.800");
  const filesBg = useColorModeValue("#E6EAED", "gray.600");
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
  const addSession = () => {
    setSessions([...sessions, sessionObject]);
  };
  const removeSession = (idx: number) => {
    const values = [...sessions];
    values.splice(idx, 1);
    setSessions(values);
  };
  const uploadFiles = (files: File[], event: DropEvent, idx: number) => {
    const values = [...sessions];
    const element = (event.target as HTMLInputElement).name as SessionFilesType;
    values[idx][element] = files;
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
          startDate,
          endDate,
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(sessions);
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
            courseSessions: sessions,
          });
          console.log(response.error?.message);
        }}
      >
        {({ isSubmitting }) => (
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
                    selectedDate={startDate}
                    minDate={new Date()}
                    onChange={(d) => setStartDate(d as Date)}
                    showPopperArrow={true}
                  />
                  <DatePickerField
                    name="endDate"
                    label="Fecha de Fin"
                    selectedDate={endDate}
                    minDate={startDate}
                    onChange={(d) => setEndDate(d as Date)}
                    showPopperArrow={true}
                  />
                </SimpleGrid>
              </SimpleGrid>
              <SimpleGrid columns={1} spacing={4} mt={4}>
                <Heading size="md">Sesiones del curso</Heading>
                {sessions?.map((v, idx) => (
                  <SimpleGrid columns={1} spacing={4} key={idx}>
                    <Flex key={idx}>
                      <Heading fontSize="16px">Sesión {idx + 1}</Heading>
                      <Button
                        ml="auto"
                        variant="link"
                        colorScheme="red"
                        onClick={() => removeSession(idx)}
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
                        name="name"
                        value={v.name}
                        placeholder="Nombre de la sesión"
                        onChange={(event) => handleChangeInput(idx, event)}
                      />
                      <SimpleGrid columns={2} spacing={4}>
                        <DatePickerField
                          name="startTime"
                          label="Hora Inicio"
                          selectedDate={v.startTime}
                          dateFormat="h:mm aa"
                          showTimeSelect
                          showTimeSelectOnly
                          onChange={(d) =>
                            handleChangeTime(d as Date, "startTime", idx)
                          }
                          showPopperArrow={true}
                        />
                        <DatePickerField
                          name="endTime"
                          label="Hora Fin"
                          selectedDate={v.endTime}
                          dateFormat="h:mm aa"
                          showTimeSelect
                          showTimeSelectOnly
                          onChange={(d) =>
                            handleChangeTime(d as Date, "endTime", idx)
                          }
                          showPopperArrow={true}
                        />
                      </SimpleGrid>
                      <InputField
                        label="URL de la grabación"
                        name="recordingUrl"
                        value={v.recordingUrl}
                        placeholder="URL de la grabación"
                        onChange={(event) => handleChangeInput(idx, event)}
                      />
                      <Flex flexDirection="column">
                        {v.files?.map((v) => (
                          <Box
                            key={v.name}
                            backgroundColor={filesBg}
                            p={2}
                            mt={3}
                          >
                            {v.name}
                          </Box>
                        ))}
                        <AddSessionFiles
                          complete={uploadFiles}
                          idx={idx}
                          name="files"
                        />
                      </Flex>
                    </SimpleGrid>
                  </SimpleGrid>
                ))}
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

export default New;

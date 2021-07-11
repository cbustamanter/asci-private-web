import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React, { useState } from "react";
import { AddSessionFiles } from "../../../components/AddSessionFiles";
import { SectionHeading } from "../../../components/admin/SectionHeading";
import { Wrapper } from "../../../components/admin/Wrapper";
import { InputField } from "../../../components/InputField";

interface SessionFiles {
  filename: string;
}

interface CourseSessions {
  sessionName: string;
  sessionUrl: string;
  startTime: string;
  endTime: string;
  recordingUrl: string;
  //   sessionFiles?: [SessionFiles];
}

type CourseType = keyof CourseSessions;
const New: React.FC<{}> = ({}) => {
  const sessionObject = {
    sessionName: "",
    sessionUrl: "",
    startTime: "",
    endTime: "",
    recordingUrl: "",
  };
  const [sessions, setSessions] = useState<CourseSessions[]>([sessionObject]);
  const bg = useColorModeValue("#F7F9FB", "gray.800");
  const filesBg = useColorModeValue("#E6EAED", "gray.600");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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
  const files = uploadedFiles.map((file) => (
    <Box key={file.name} backgroundColor={filesBg} p={2} mt={3}>
      {file.name}
    </Box>
  ));
  const uploadFiles = (files: File[]) => {
    setUploadedFiles(files);
  };
  return (
    <Wrapper>
      <SectionHeading title="Crear curso" />

      <Formik
        initialValues={{
          names: "",
          surnames: "",
          email: "",
          cellphone: "",
          country: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection="column" maxWidth="600px" width="100%" mt={4}>
              <SimpleGrid columns={1} spacing={4}>
                <Heading size="md">Detalles del curso</Heading>
                <InputField
                  label="Nombre del curso"
                  name="coursename"
                  placeholder="Ingresa un nombre"
                />
                <InputField
                  label="Descripción del curso del curso"
                  textarea
                  name="coursedescription"
                  placeholder="Ingresa una descripción"
                />
                <SimpleGrid columns={2} spacing={4}>
                  <InputField
                    label="Fecha de Inicio"
                    name="courseStartDate"
                    placeholder="Fecha de inicio"
                  />
                  <InputField
                    label="Fecha de Fin"
                    name="courseEndDate"
                    placeholder="Fecha de Fin"
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
                        name="sessionName"
                        value={v.sessionName}
                        placeholder="Nombre de la sesión"
                        onChange={(event) => handleChangeInput(idx, event)}
                      />
                      <InputField
                        label="Url de clase en vivo"
                        name="sessionUrl"
                        value={v.sessionUrl}
                        placeholder="Url de clase en vivo"
                        onChange={(event) => handleChangeInput(idx, event)}
                      />
                      <SimpleGrid columns={2} spacing={4}>
                        <InputField
                          label="Hora Inicio"
                          name="startTime"
                          value={v.startTime}
                          placeholder="Hora Inicio"
                          onChange={(event) => handleChangeInput(idx, event)}
                        />
                        <InputField
                          label="Hora Fin"
                          name="endTime"
                          value={v.endTime}
                          placeholder="Hora Fin"
                          onChange={(event) => handleChangeInput(idx, event)}
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
                        {files}
                        <AddSessionFiles complete={uploadFiles} />
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

export default New;

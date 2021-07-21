import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  GridItem,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Switch,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import { SectionHeading } from "../../../../components/admin/SectionHeading";
import { Wrapper } from "../../../../components/admin/Wrapper";
import { InputField } from "../../../../components/InputField";
import { NumberInputFieldText } from "../../../../components/NumberInputFieldText";
import { SkeletonPage } from "../../../../components/SkeletonPage";
import {
  useQuizzQuery,
  useUpdateQuizzMutation,
} from "../../../../generated/graphql";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { isServer } from "../../../../utils/isServer";
import { useGetStringId } from "../../../../utils/useGetStringId";

//TODO: Create a component to display Errors
const Edit: React.FC<{}> = ({}) => {
  const id = useGetStringId();
  const [{ data, fetching, error }] = useQuizzQuery({
    pause: isServer(),
    variables: { id },
  });
  const toast = useToast();
  const [, update] = useUpdateQuizzMutation();
  const bg = useColorModeValue("#F7F9FB", "gray.800");

  let body;
  const answerObject = { text: "", isCorrect: false };
  const questionObject = { statement: "", score: 0, answers: [answerObject] };
  if (!fetching && !data) {
    body = (
      <Box>
        Oops! Error
        {error?.message}
      </Box>
    );
  } else if (fetching && !data) {
    body = <SkeletonPage sections={3} itemPerSection={4} />;
  } else if (!fetching && data)
    body = (
      <>
        <SectionHeading title="Editar Examen" />
        <Formik
          enableReinitialize
          initialValues={{
            description: data.quizz.quizzDetail?.description || "",
            availableTime: data.quizz.quizzDetail?.availableTime || 0,
            timeToComplete: data.quizz.quizzDetail?.timeToComplete || 0,
            questions: data.quizz.quizzDetail?.questions,
            status: !!data.quizz.status,
          }}
          onSubmit={async (values) => {
            values.questions?.map((q) => {
              delete q.__typename;
              q.answers?.map((a) => delete a.__typename);
            });
            const totalScore = values.questions?.reduce(
              (a, b) => a + b.score,
              0
            );
            if (totalScore && totalScore != 20) {
              toast({
                title: "Puntaje",
                description: "El puntaje debe ser igual a 20.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            }
            const response = await update({
              args: {
                id,
                availableTime: values.availableTime,
                description: values.description,
                timeToComplete: values.timeToComplete,
                questions: values.questions,
              },
            });
            if (response.error) {
              toast({
                title: "Error",
                description: "Oops. Algo salió mal.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else if (response.data?.updateQuizz) {
              toast({
                title: "Actualización",
                description: "Examen actualizado.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              router.replace("/admin/quizzes");
            }
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <Flex flexDirection="column" maxWidth="600px" width="100%" mt={4}>
                <Heading size="md">
                  Curso: {data.quizz.course.courseDetail.name}
                </Heading>
                <SimpleGrid columns={1} spacing={4} mt={4}>
                  <InputField
                    label="Descripción del examen"
                    name="description"
                  />
                  <NumberInputFieldText
                    label="Tiempo para completar (en minutos)"
                    name="timeToComplete"
                  />
                  <NumberInputFieldText
                    label="Plazo de disponibilidad (días)"
                    name="availableTime"
                  />
                  <HStack>
                    <Heading size="md">Examen del curso</Heading>
                    <Switch
                      size="md"
                      name="status"
                      ml={4}
                      isChecked={values.status}
                      onChange={() => setFieldValue("hasTest", !values.status)}
                    />
                  </HStack>
                  <HStack spacing="auto">
                    <Heading size="md">Preguntas del examen</Heading>
                    <Heading size="md">
                      {values.questions?.reduce((a, b) => a + b.score, 0)}
                      /20
                    </Heading>
                  </HStack>
                  <FieldArray name="questions">
                    {({ push, remove }) => (
                      <>
                        {values.questions?.map((q, idx) => (
                          <SimpleGrid key={idx} columns={1} spacing={4}>
                            <HStack spacing="auto">
                              <Heading size="sm">Pregunta {idx + 1}</Heading>
                              <Button
                                variant="link"
                                colorScheme="red"
                                onClick={() => remove(idx)}
                              >
                                Eliminar pregunta
                              </Button>
                            </HStack>
                            <SimpleGrid
                              columns={1}
                              spacing={4}
                              p={4}
                              backgroundColor={bg}
                              borderRadius="lg"
                              border="1px solid"
                              borderColor="#D4D8DD"
                            >
                              <GridItem colSpan={2}>
                                <Heading size="sm">
                                  Puntaje de esta pregunta
                                </Heading>
                                <Box my={4}>
                                  <NumberInputFieldText
                                    name={`questions.${idx}.score`}
                                    label="Ingresa el puntaje"
                                  />
                                </Box>
                                <Heading size="sm" mb={4}>
                                  Enunciado
                                </Heading>
                                <InputField
                                  name={`questions.${idx}.statement`}
                                  label="Ingresa el enunciado"
                                  textarea
                                />
                                <Heading size="sm" mb={2} mt={4}>
                                  Opciones de respuesta
                                </Heading>
                                <Text color="platelight" size="sm" mb={4}>
                                  Redacta las opciones y selecciona la opción
                                  correcta.
                                </Text>
                              </GridItem>
                              <FieldArray name={`questions.${idx}.answers`}>
                                {({ push, remove }) => (
                                  <>
                                    {q.answers?.map((a, index) => (
                                      <GridItem colSpan={2} key={index}>
                                        <SimpleGrid
                                          spacing={4}
                                          columns={12}
                                          alignItems="center"
                                        >
                                          <GridItem colSpan={1} mt={4}>
                                            <Checkbox
                                              isChecked={a.isCorrect}
                                              colorScheme="whatsapp"
                                              size="lg"
                                              onChange={(v) => {
                                                q.answers?.map(
                                                  (val) =>
                                                    (val.isCorrect = false)
                                                );
                                                setFieldValue(
                                                  `questions.${idx}.answers.${index}.isCorrect`,
                                                  v.target.checked
                                                );
                                              }}
                                            />
                                          </GridItem>
                                          <GridItem colSpan={10}>
                                            <InputField
                                              name={`questions.${idx}.answers.${index}.text`}
                                              label="Opción de Respuesta"
                                            />
                                          </GridItem>
                                          <GridItem colSpan={1} mt={4}>
                                            <IconButton
                                              aria-label="delete"
                                              variant="unstyled"
                                              icon={
                                                <DeleteIcon color="red.400" />
                                              }
                                              onClick={() => remove(index)}
                                            />
                                          </GridItem>
                                        </SimpleGrid>
                                      </GridItem>
                                    ))}
                                    <GridItem colSpan={1}>
                                      <Button
                                        variant="link"
                                        width="fit-content"
                                        onClick={() => push(answerObject)}
                                      >
                                        Agrega otra opción
                                      </Button>
                                    </GridItem>
                                  </>
                                )}
                              </FieldArray>
                            </SimpleGrid>
                          </SimpleGrid>
                        ))}
                        <Button
                          variant="link"
                          width="fit-content"
                          onClick={() => push(questionObject)}
                        >
                          + Añadir Pregunta
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </SimpleGrid>
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
                    Actualizar examen
                  </Button>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      </>
    );
  return <Wrapper>{body}</Wrapper>;
};

export default withUrqlClient(createUrqlClient)(Edit);

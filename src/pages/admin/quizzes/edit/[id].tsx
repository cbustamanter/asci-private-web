import {
  Box,
  Button,
  Checkbox,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import { SectionHeading } from "../../../../components/admin/SectionHeading";
import { Wrapper } from "../../../../components/admin/Wrapper";
import { DatePickerField } from "../../../../components/DatePickerField";
import { InputField } from "../../../../components/InputField";
import { NumberInputFieldText } from "../../../../components/NumberInputFieldText";
import { SkeletonPage } from "../../../../components/SkeletonPage";
import { useQuizzQuery } from "../../../../generated/graphql";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { useGetStringId } from "../../../../utils/useGetStringId";

//TODO: Create a component to display Errors
const Edit: React.FC<{}> = ({}) => {
  const id = useGetStringId();
  const [{ data, fetching, error }] = useQuizzQuery({ variables: { id } });
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
            startDate: data.quizz.course.courseDetail.endDate,
            endDate: data.quizz.quizzDetail?.endDate || new Date(),
            timeToComplete: data.quizz.quizzDetail?.timeToComplete || "",
            questions: data.quizz.quizzDetail?.questions,
          }}
          onSubmit={async (values) => {
            console.log(values);
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
                  <SimpleGrid columns={2} spacing={4}>
                    <DatePickerField
                      disabled={true}
                      label="Fecha de inicio"
                      name="startDate"
                    />
                    <DatePickerField label="Fecha de Fin" name="endDate" />
                  </SimpleGrid>
                  <NumberInputFieldText
                    label="Tiempo para completar (en minutos)"
                    name="timeToComplete"
                  />
                  <Heading size="md">Preguntas</Heading>
                  <FieldArray name="questions">
                    {({ push, remove }) => (
                      <>
                        {values.questions?.map((q, idx) => (
                          <SimpleGrid key={idx} columns={2} spacing={4}>
                            <Heading size="md ">Pregunta {idx + 1}</Heading>
                            <Button
                              ml="auto"
                              variant="link"
                              colorScheme="red"
                              onClick={() => remove(idx)}
                            >
                              Eliminar
                            </Button>
                            <InputField
                              name={`questions.${idx}.statement`}
                              label="Enunciado"
                            />
                            <NumberInputFieldText
                              name={`questions.${idx}.score`}
                              label="Puntaje"
                            />
                            <FieldArray name={`questions.${idx}.answers`}>
                              {({ push, remove }) => (
                                <>
                                  {q.answers?.map((a, index) => (
                                    <GridItem colSpan={2} key={index}>
                                      <SimpleGrid spacing={4} columns={2}>
                                        <InputField
                                          name={`questions.${idx}.answers.${index}.text`}
                                          label="Respuesta"
                                        />
                                        <Checkbox
                                          isChecked={a.isCorrect}
                                          onChange={(v) =>
                                            setFieldValue(
                                              `questions.${idx}.answers.${index}.isCorrect`,
                                              v.target.checked
                                            )
                                          }
                                        >
                                          Correcta
                                        </Checkbox>
                                      </SimpleGrid>
                                    </GridItem>
                                  ))}
                                  <Button
                                    variant="link"
                                    width="fit-content"
                                    onClick={() => push(answerObject)}
                                  >
                                    + Añadir respuesta
                                  </Button>
                                </>
                              )}
                            </FieldArray>
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

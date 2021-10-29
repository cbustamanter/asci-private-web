import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiDraftFill,
} from "react-icons/ri";
import { useDispatch } from "react-redux";
import { ConfirmQuizz } from "../../../components/ConfirmQuizz";
import { CopperMedalIcon } from "../../../components/Icons/CopperMedalIcon";
import { MedalIcon } from "../../../components/Icons/MedalIcon";
import { AnswerOption } from "../../../components/intranet/AnswerOption";
import { BackButton } from "../../../components/intranet/BackButton";
import {
  useGenerateMutation,
  useMeQuery,
  usePerformedQuizzQuery,
  usePerformQuizzMutation,
  useSolveQuizzMutation,
} from "../../../generated/graphql";
import { showHideSideBar } from "../../../redux/actions/sidebarActions";
import { S3_URL } from "../../../utils/constant";
import { getLetter } from "../../../utils/getLetter";
import { isServer } from "../../../utils/isServer";
import { PerformedQuizz } from "../../../utils/PerformedQuizz";
import { useGetStringId } from "../../../utils/useGetStringId";

type PerformedQuizzDetail = {
  questionN: number;
  answerId: string;
};

const Quizz: React.FC<{}> = ({}) => {
  const id = useGetStringId();
  const [{ data: meData }] = useMeQuery();
  const [{ data }] = usePerformedQuizzQuery({
    pause: isServer(),
    variables: { id },
    requestPolicy: "cache-and-network",
  });
  const oPerformedQuizz = new PerformedQuizz(data);

  const [, solveQuizz] = useSolveQuizzMutation();
  const [, performQuizz] = usePerformQuizzMutation();
  const [{ fetching }, generate] = useGenerateMutation();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const [questionN, setQuestionN] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<PerformedQuizzDetail[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showHideSideBar(true)); // hides sidebar when loading
    return () => {
      dispatch(showHideSideBar(false)); // shows sidebar when unmounting
    };
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.performedQuizz.status == 2) {
        setFinished(true);
      }
    }
  }, [data]);

  const handleSelectAnswer = (questionN: number, answerId: string) => {
    const index = answers.findIndex((a) => a.questionN == questionN);
    if (index > -1) {
      const newObject = Object.assign({}, answers[index], {
        questionN,
        answerId,
      });
      setAnswers([
        ...answers.slice(0, index),
        newObject,
        ...answers.slice(index + 1),
      ]);
    } else {
      setAnswers((prevState) => [...prevState, { questionN, answerId }]);
    }
  };
  const handleFinish = () => {
    if (answers.length != oPerformedQuizz.questionsLen) {
      onOpen();
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    await solveQuizz({
      id,
      input: {
        answersIds: answers.map((a) => a.answerId),
      },
    });
    setFinished(true);
  };

  const handleRetry = async () => {
    setFinished(false);
    setAnswers([]);
    setQuestionN(0);
    const response = await performQuizz({
      quizzId: oPerformedQuizz.quizzId,
      userId: meData?.me?.id as string,
    });
    if (response.data) {
      router.push(`/intranet/quizzes/${response.data.performQuizz.id}`);
    }
  };

  return (
    <SimpleGrid columns={12}>
      <GridItem
        colSpan={{ base: 12, sm: 4 }}
        px={{ base: 6, md: 16 }}
        py={{ base: 4, sm: 0 }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        height={{ sm: "100vh" }}
        borderRight="1px solid"
        borderRightColor="blue.800"
      >
        <ConfirmQuizz
          isOpen={isOpen}
          onClose={onClose}
          handleConfirm={handleConfirm}
        />
        <BackButton
          text="Volver al curso"
          route={`/intranet/course/${oPerformedQuizz.courseId}`}
        />
        <HStack color="white" mb={8} mt={4}>
          <Icon as={RiDraftFill} fontSize="x-large" />
          <Heading fontSize="28px">Examen</Heading>
        </HStack>
        <Text fontSize="x-large">{oPerformedQuizz.courseName}</Text>
        <Stack borderRadius="md" bg="blue.700" p={4} mt={8}>
          <Text>Comentarios del profesor:</Text>
          <Text>{oPerformedQuizz.quizzDescription}</Text>
        </Stack>
      </GridItem>
      <GridItem
        colSpan={{ base: 12, sm: 8 }}
        background={`url(${S3_URL}/public-assets/courseBg.png)`}
        backgroundRepeat="no-repeat"
        display="flex"
        justifyContent="center"
        position={{ md: "relative" }}
        borderRight="1px solid"
        borderRightColor="blue.800"
      >
        {oPerformedQuizz.questions && (
          <Stack
            h="full"
            py={{ base: 4, sm: 0 }}
            w={{ base: "90%", sm: "70%" }}
            justifyContent="center"
            color="white"
            spacing={4}
          >
            {!finished ? (
              <>
                <Box ml="auto" opacity="0.7">
                  Pregunta {questionN + 1} de {oPerformedQuizz.questionsLen}
                </Box>
                <HStack spacing={1}>
                  {oPerformedQuizz.questions?.map((q, idx) => (
                    <Box
                      key={q.id}
                      w="full"
                      h="6px"
                      cursor="pointer"
                      bg={idx === questionN ? "blue.500" : "blue.600"}
                      borderRadius="4px"
                      onClick={() => setQuestionN(idx)}
                    />
                  ))}
                </HStack>
                <Text color="white" fontSize="20px" fontWeight="bold">
                  {questionN + 1}.{" "}
                  {oPerformedQuizz.questions[questionN].statement}
                </Text>
                <Box opacity="0.7">Escoge una de las opciones debajo</Box>
                <Stack spacing={3}>
                  {oPerformedQuizz.questions[questionN].answers?.map(
                    (a, index) => (
                      <AnswerOption
                        variant={
                          answers.some((v) => v.answerId === a.id)
                            ? "selected"
                            : ""
                        }
                        key={a.id}
                        letter={`${getLetter(index + 1)}.`}
                        text={a.text}
                        onClick={() => handleSelectAnswer(questionN, a.id)}
                      />
                    )
                  )}
                </Stack>
                <Flex justifyContent="flex-end">
                  {!!questionN && (
                    <HStack
                      cursor="pointer"
                      onClick={() => setQuestionN((prev) => prev - 1)}
                    >
                      <Icon as={RiArrowLeftSLine} fontSize="x-large" />
                      <Box>Anterior</Box>
                    </HStack>
                  )}
                  {questionN < oPerformedQuizz.questionsLen - 1 && (
                    <HStack
                      ml={4}
                      cursor="pointer"
                      onClick={() => setQuestionN((prev) => prev + 1)}
                    >
                      <Box>Siguiente</Box>
                      <Icon as={RiArrowRightSLine} fontSize="x-large" />
                    </HStack>
                  )}
                </Flex>
                <HStack
                  position="absolute"
                  py={4}
                  bg="blue.900"
                  bottom="0"
                  borderTop="1px solid"
                  borderTopColor="blue.800"
                  left="0"
                  w="full"
                  justifyContent="center"
                  zIndex={1}
                >
                  <HStack w="70%" spacing="auto">
                    <Stack>
                      <Text opacity="0.7" fontSize="12px">
                        Te quedan
                      </Text>
                      <Countdown
                        date={oPerformedQuizz.countdown}
                        renderer={(props) => (
                          <Text fontWeight="bold" fontSize="16px">
                            {zeroPad(props.hours)}:{zeroPad(props.minutes)}:
                            {zeroPad(props.seconds)} min
                          </Text>
                        )}
                        onComplete={handleConfirm}
                      />
                    </Stack>
                    <Box>
                      <Flex justifyContent="flex-end">
                        <Button variant="green" onClick={handleFinish}>
                          Terminar examen
                        </Button>
                      </Flex>
                    </Box>
                  </HStack>
                </HStack>
              </>
            ) : (
              <Flex
                borderRadius="lg"
                bg="blue.700"
                align="center"
                flexDirection="column"
                color="darkplate"
                pb={8}
              >
                <Box mt="-2rem" fontSize="4rem">
                  {oPerformedQuizz.approved ? (
                    <MedalIcon />
                  ) : (
                    <CopperMedalIcon />
                  )}
                </Box>
                <Heading fontSize="24px" color="white" mt={3}>
                  {oPerformedQuizz.approvedHeadingText}
                </Heading>
                <Text w="55%" textAlign="center" mt={3}>
                  {oPerformedQuizz.approvedText}
                </Text>
                <Text
                  textTransform="uppercase"
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="0.1em"
                  mt={8}
                >
                  Tu nota es
                </Text>
                <HStack fontSize="36px" fontWeight="bold">
                  <Text
                    color={oPerformedQuizz.approved ? "green" : "disapproved"}
                  >
                    {oPerformedQuizz.finalScore}
                  </Text>
                  <Text>/</Text>
                  <Text>20</Text>
                </HStack>
                <Stack spacing={6} mt={3}>
                  {oPerformedQuizz.approved ? (
                    !oPerformedQuizz.hasCertificate ? (
                      <Button
                        isLoading={fetching}
                        onClick={async () => {
                          await generate({
                            performedQuizzId: oPerformedQuizz.id,
                          });
                        }}
                      >
                        Generar mi certificado
                      </Button>
                    ) : (
                      <Button
                        as={Link}
                        href={oPerformedQuizz.certificateUrl}
                        isExternal
                      >
                        Ver mi certificado
                      </Button>
                    )
                  ) : (
                    <>
                      {!!oPerformedQuizz.attemptsLeft &&
                        !oPerformedQuizz.hasAnyApproved && (
                          <Button onClick={handleRetry}>
                            Volver a intentarlo
                          </Button>
                        )}
                      <Button
                        variant="outline-main"
                        onClick={() => router.replace("/intranet")}
                      >
                        Terminar examen
                      </Button>
                    </>
                  )}
                </Stack>
              </Flex>
            )}
          </Stack>
        )}
      </GridItem>
    </SimpleGrid>
  );
};

export default Quizz;

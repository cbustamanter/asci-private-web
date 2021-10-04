import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Radio,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import getYouTubeID from "get-youtube-id";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useEffect, useState } from "react";
import {
  RiArrowDownFill,
  RiCalendar2Fill,
  RiCheckDoubleLine,
  RiDownload2Fill,
  RiDraftFill,
  RiFolderOpenFill,
} from "react-icons/ri";
import { CourseIcon } from "../../../components/Icons/CourseIcon";
import { BackButton } from "../../../components/intranet/BackButton";
import { IntranetContainer } from "../../../components/intranet/IntranetContainer";
import { LoadingMask } from "../../../components/LoadingMask";
import { ModalDialog } from "../../../components/modals/ModalDialog";
import {
  CustomSesssionFile,
  ModalMaterialBody,
} from "../../../components/modals/ModalMaterialBody";
import {
  useMeQuery,
  usePerformQuizzMutation,
  useSessionQuery,
  useUserCourseQuery,
} from "../../../generated/graphql";
import { S3_URL } from "../../../utils/constant";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { isServer } from "../../../utils/isServer";
import { dateRangeDDMM } from "../../../utils/StringDate";
import { useGetStringId } from "../../../utils/useGetStringId";

const Course: React.FC<{}> = ({}) => {
  const id = useGetStringId();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data: meData }] = useMeQuery({});
  const [active, setActive] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [courseSessionFiles, setCourseSessionFiles] = useState<
    CustomSesssionFile | undefined
  >(undefined);
  const [, performQuizz] = usePerformQuizzMutation();
  const [isQuizzAvailable, setIsQuizzAvailable] = useState(false);
  const [{ data, fetching }] = useUserCourseQuery({
    pause: isServer(),
    variables: { courseId: id },
  });
  const [{ data: sessionData, fetching: isSessionLoading }] = useSessionQuery({
    pause: isServer(),
    variables: { id: sessionId },
  });
  useEffect(() => {
    if (data && !fetching) {
      const sessions = [...data.userCourse.courseDetail.courseSessions];
      const quizz = data.userCourse.quizz;
      const performedQuizz = quizz?.performedQuizz;
      const started = sessions.findIndex((s) => s.condition.status == 2);
      const aboutToStart = sessions.findIndex((s) => s.condition.status == 3);
      const upcoming = sessions.findIndex((s) => s.condition.status == 4);
      const availability = data.userCourse.quizz?.quizzDetail?.availableTime; // in days
      const courseEndDate = moment(
        data.userCourse.courseDetail.endDate
      ).toDate();
      const quizzAvailability = moment(courseEndDate)
        .add(availability, "d")
        .toDate();
      const now = moment().toDate();
      if (started > -1) {
        setActive(started);
        setSessionId(sessions[started].id);
      } else if (aboutToStart > -1) {
        setActive(aboutToStart);
        setSessionId(sessions[aboutToStart].id);
      } else if (upcoming > -1) {
        setActive(upcoming);
        setSessionId(sessions[upcoming].id);
      }

      if (now > courseEndDate && now <= quizzAvailability) {
        if (performedQuizz && performedQuizz.length < 3) {
          console.log(`por aca`, performedQuizz);
          const anyApproved = performedQuizz.find(
            (p) => p.finalScore > (quizz?.quizzDetail?.minScore as number)
          );
          if (!anyApproved) {
            setIsQuizzAvailable(true);
          }
        }
      }
    }
  }, [data]);

  const is2or3 = (status: number): boolean => {
    return status == 2 || status == 3;
  };
  const is3or4 = (status: number): boolean => {
    return status == 3 || status == 4;
  };

  const handlePerformQuizz = async () => {
    const response = await performQuizz({
      quizzId: data?.userCourse.quizz?.id as string,
      userId: meData?.me?.id as string,
    });
    if (response.data) {
      router.replace(`/intranet/quizzes/${response.data.performQuizz.id}`);
    }
  };

  return (
    <IntranetContainer
      py={8}
      px={6}
      background={`url(${S3_URL}/public-assets/courseBg.png)`}
      backgroundRepeat="no-repeat"
    >
      <ModalDialog onClose={onClose} isOpen={isOpen} title="Materiales">
        <ModalMaterialBody data={courseSessionFiles} />
      </ModalDialog>
      {data && !fetching && (
        <>
          <BackButton text="Regresar" route="/intranet" />
          <Heading mt={4} color="white" fontSize="x-large">
            {data?.userCourse.courseDetail.name}
          </Heading>
          {isQuizzAvailable && (
            <Flex justifyContent="flex-end">
              <Button variant="green" onClick={() => handlePerformQuizz()}>
                Realizar examen
              </Button>
            </Flex>
          )}

          <SimpleGrid columns={12} spacing={4} mt={4} pb={6}>
            <GridItem
              order={{ base: 2, md: 1 }}
              colSpan={{ base: 12, md: 7 }}
              maxHeight="384px"
              minHeight="384px"
              background={`url(${S3_URL}/public-assets/courseVideoBg.png)`}
              backgroundRepeat="no-repeat"
              borderRadius={3}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                height="100%"
                position="relative"
              >
                {!sessionData && isSessionLoading ? (
                  <LoadingMask />
                ) : sessionData && !isSessionLoading ? (
                  <>
                    {sessionData.session?.condition.status == 2 && (
                      <VStack spacing={3}>
                        <CourseIcon fontSize="4rem" />
                        <Text fontSize="18px" color="white" fontWeight="bold">
                          La sesión {active + 1} ha empezado
                        </Text>
                        <Text>
                          Ingresa a la clase y aprende junto a nosotros
                        </Text>
                        <Link
                          isExternal
                          variant="button"
                          href={sessionData.session.courseDetail.classUrl}
                        >
                          Clase en vivo
                        </Link>
                      </VStack>
                    )}
                    {is3or4(
                      sessionData.session?.condition.status as number
                    ) && (
                      <VStack spacing={3}>
                        <CourseIcon fontSize="4rem" />
                        <Text fontSize="18px" color="white" fontWeight="bold">
                          Esta sesión aún no empieza
                        </Text>
                        <Text>
                          Esta clase inicia el{" "}
                          {moment(sessionData.session?.startTime).format(
                            "LLLL"
                          )}
                        </Text>
                      </VStack>
                    )}
                    {sessionData.session?.condition.status == 1 && (
                      <>
                        {sessionData.session.recordingUrl ? (
                          <iframe
                            height="384px"
                            width="100%"
                            src={`https://www.youtube.com/embed/${getYouTubeID(
                              sessionData.session.recordingUrl
                            )}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                          />
                        ) : (
                          <VStack spacing={3}>
                            <CourseIcon fontSize="4rem" />
                            <Text
                              fontSize="18px"
                              color="white"
                              fontWeight="bold"
                            >
                              Grabación no está disponible
                            </Text>
                            <Text maxW="50%">
                              La grabación de esta clase aún no ha sido subida,
                              vuelve a intentarlo en unas horas.
                            </Text>
                          </VStack>
                        )}
                      </>
                    )}
                  </>
                ) : null}
              </Stack>
            </GridItem>
            <GridItem
              order={{ base: 1, md: 2 }}
              colSpan={{ base: 12, md: 5 }}
              bg="blue.800"
              borderRadius={3}
              maxHeight={{ base: "210px", md: "384px" }}
              minHeight={{ base: "100px", md: "384px" }}
              overflowY="auto"
            >
              {data?.userCourse.courseDetail.courseSessions.map((s, idx) => (
                <Stack
                  p={4}
                  key={s.id}
                  bg={active == idx ? "blue.700" : "inherit"}
                  borderLeft={active == idx ? "4px solid" : "0px solid"}
                  borderLeftColor="blue.500"
                  borderBottom="1px solid"
                  borderBottomColor="blue.400"
                  cursor="pointer"
                  onClick={() => {
                    setActive(idx);
                    setSessionId(s.id);
                  }}
                >
                  <HStack spacing="auto">
                    <Radio isChecked={s.condition.status == 1}>
                      <HStack spacing={1}>
                        <Text
                          fontWeight="bold"
                          color="white"
                          fontSize="md"
                          mr={2}
                        >
                          Sesión {idx + 1}
                        </Text>
                        {!!s.courseSessionFiles?.length && (
                          <>
                            <HStack color="green" spacing={1}>
                              <Icon as={RiFolderOpenFill} fontSize="15px" />
                              <Text
                                fontWeight="bold"
                                fontSize="14.5px"
                                cursor="pointer"
                                onClick={() => {
                                  setCourseSessionFiles(s.courseSessionFiles);
                                  onOpen();
                                }}
                              >
                                Materiales
                              </Text>
                              <Icon as={RiArrowDownFill} fontSize="12px" />
                            </HStack>
                          </>
                        )}
                      </HStack>
                    </Radio>
                    <HStack>
                      <Text
                        fontSize="12.5px"
                        fontWeight={
                          is2or3(s.condition.status) ? "bold" : "normal"
                        }
                        color={
                          is2or3(s.condition.status) ? "blue.500" : "inherit"
                        }
                      >
                        {s.condition.text}
                      </Text>
                      {s.condition.status == 1 && (
                        <Icon as={RiCheckDoubleLine} />
                      )}
                      {s.condition.status == 4 && <Icon as={RiCalendar2Fill} />}
                    </HStack>
                  </HStack>
                  <Box px={6}>
                    <HStack>
                      <Icon as={RiDraftFill} />
                      <Text fontSize="12.5px">{s.name}</Text>
                    </HStack>
                  </Box>
                </Stack>
              ))}
            </GridItem>
          </SimpleGrid>
          <SimpleGrid
            columns={12}
            pt={6}
            borderTop="1px solid"
            borderTopColor="blue.400"
            spacing={5}
          >
            <GridItem colSpan={{ base: 12, md: 4 }}>
              <Stack position="relative" align="center" justifyContent="center">
                <Image
                  src={`${S3_URL}/cover-photos/${data?.userCourse.courseDetail.coverPhoto}`}
                  maxH="142px"
                  borderRadius="md"
                  w="full"
                />
                <Stack
                  bg="rgba(27, 35, 62, 0.85)"
                  p={4}
                  position="absolute"
                  borderRadius="md"
                >
                  <Text fontWeight="bold" color="white" fontSize="md">
                    {data.userCourse.courseDetail.name}
                  </Text>
                </Stack>
              </Stack>
              <Stack mt={4}>
                <HStack spacing="auto" p={2} bg="blue.700" borderRadius="sm">
                  <HStack fontWeight="bold">
                    <Icon as={RiCalendar2Fill} />
                    <Text>Duración</Text>
                  </HStack>
                  <Text>
                    {dateRangeDDMM(
                      data?.userCourse.courseDetail.startDate,
                      data?.userCourse.courseDetail.endDate
                    )}
                  </Text>
                </HStack>
              </Stack>
            </GridItem>
            <GridItem colSpan={{ base: 12, md: 8 }}>
              <HStack
                borderLeft="4px solid"
                borderLeftColor="blue.500"
                borderRadius="md"
                bg="blue.800"
                py={3}
                px={4}
                mb={4}
                color="white"
                fontSize="md"
                fontWeight="700"
              >
                <Icon as={RiDraftFill} />
                {data?.userCourse.courseDetail.hasTest ? (
                  <Text>
                    Al finalizar el curso y aprobar el examen, recibirás un
                    certificado de ASCI Perú.
                  </Text>
                ) : (
                  <Text>
                    Al finalizar el curso, recibirás un certificado de ASCI
                    Perú.
                  </Text>
                )}
              </HStack>
              <Text whiteSpace="break-spaces">
                {data?.userCourse.courseDetail.description}
              </Text>
            </GridItem>
          </SimpleGrid>
        </>
      )}
    </IntranetContainer>
  );
};

export default withUrqlClient(createUrqlClient)(Course);

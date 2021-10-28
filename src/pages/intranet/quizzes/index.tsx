import { NextSeo } from "next-seo";
import React from "react";
import { HeadingSection } from "../../../components/intranet/HeadingSection";
import { IntraCard } from "../../../components/intranet/IntraCard";
import { IntranetContainer } from "../../../components/intranet/IntranetContainer";
import { useUserQuizzesQuery } from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";

const Index: React.FC<{}> = ({}) => {
  const [{ data }] = useUserQuizzesQuery({
    pause: isServer(),
    requestPolicy: "cache-and-network",
  });
  return (
    <IntranetContainer py={8} px={6}>
      <NextSeo title="Mis exámenes | ASCI" description="Todos mis exámenes" />
      <HeadingSection
        title="Mis exámenes"
        subtitle="Realiza los exámenes disponibles de tus cursos completados"
      />
      {data?.userQuizzes.map((q) => (
        <IntraCard
          key={q.id}
          title={q.quizz.course.courseDetail.name}
          description={q.quizz.course.courseDetail.description}
          coverPhoto={q.quizz.course.courseDetail.coverPhoto as string}
          btnDir={`/intranet/quizzes/${q.id}`}
          btnText="Ver examen"
          date={q.updatedAt}
          id={q.id}
        />
      ))}
    </IntranetContainer>
  );
};

export default Index;

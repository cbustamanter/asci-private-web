import { NextSeo } from "next-seo";
import React from "react";
import { HeadingSection } from "../../../components/intranet/HeadingSection";
import { IntranetContainer } from "../../../components/intranet/IntranetContainer";

const Index: React.FC<{}> = ({}) => {
  return (
    <IntranetContainer py={8} px={6}>
      <NextSeo title="Mis exámenes | ASCI" description="Todos mis exámenes" />
      <HeadingSection
        title="Mis exámenes"
        subtitle="Realiza los exámenes disponibles de tus cursos completados"
      />
    </IntranetContainer>
  );
};

export default Index;

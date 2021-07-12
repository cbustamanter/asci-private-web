import { Maybe } from "graphql/jsutils/Maybe";
import { CourseSession, SessionFile } from "../generated/graphql";

interface Files {
  files?: File[];
}
interface SessionTimes {
  startTime: Date;
  endTime: Date;
}

interface CourseSessionsGeneric {
  name: string;
  recordingUrl: string;
}

export type CourseSessions = CourseSessionsGeneric & SessionTimes & Files;
export type CourseType = keyof CourseSessionsGeneric;
export type SessionFilesType = keyof Files;
export type SessionTimesType = keyof SessionTimes;
export type CourseSessionGraph = Array<
  { __typename?: "CourseSession" } & Pick<
    CourseSession,
    "id" | "name" | "startTime" | "endTime" | "recordingUrl"
  > & {
      sessionFiles?: Maybe<
        Array<
          { __typename?: "SessionFile" } & Pick<SessionFile, "id" | "filename">
        >
      >;
    }
>;

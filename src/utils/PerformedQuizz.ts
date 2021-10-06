import moment from "moment";
import { PerformedQuizzQuery } from "../generated/graphql";

export class PerformedQuizz {
  private data: PerformedQuizzQuery | undefined;
  constructor(data: PerformedQuizzQuery | undefined) {
    this.data = data;
  }

  get id() {
    return this.data?.performedQuizz.id as string;
  }
  get questionsLen() {
    return this.data?.performedQuizz.quizz.quizzDetail?.questions
      .length as number;
  }

  get questions() {
    return this.data?.performedQuizz.quizz.quizzDetail?.questions;
  }

  get countdown() {
    const expirationDate = moment(
      parseInt(this.data?.performedQuizz.expirationDate || "0")
    )
      .toDate()
      .getTime();
    const availableTime =
      (this.data?.performedQuizz.quizz.quizzDetail?.availableTime as number) *
      6000; // minutes to ms
    return expirationDate + availableTime;
  }

  get quizzId() {
    return this.data?.performedQuizz.quizz.id as string;
  }

  get courseId() {
    return this.data?.performedQuizz.quizz.course.id as string;
  }

  get courseName() {
    return this.data?.performedQuizz.quizz.course.courseDetail.name;
  }

  get quizzDescription() {
    return this.data?.performedQuizz.quizz.quizzDetail?.description;
  }

  get approved() {
    return (
      (this.data?.performedQuizz.finalScore as number) >=
      (this.data?.performedQuizz.quizz.quizzDetail?.minScore as number)
    );
  }
  get hasCertificate() {
    return this.data?.performedQuizz.certificateUrl ? true : false;
  }

  get certificateUrl() {
    return this.data?.performedQuizz.certificateUrl as string;
  }

  get approvedHeadingText() {
    return this.approved
      ? "¡Felicidades, aprobaste!"
      : "Obtuviste una nota desaprobatoria";
  }

  get approvedText() {
    return this.approved
      ? "Alcanzaste una nota aprobatoria y obtuviste el certificado del curso."
      : this.hasAnyApproved
      ? ""
      : `No te preocupes, aún te quedan ${this.data?.performedQuizz.quizz.attemptsLeft} intento(s), vuelve a dar el examen cuando te sientas listo.`;
  }

  get hasAnyApproved() {
    return this.data?.performedQuizz.hasAnyApproved as boolean;
  }

  get finalScore() {
    return this.data?.performedQuizz.finalScore;
  }

  get attemptsLeft() {
    return this.data?.performedQuizz.quizz.attemptsLeft;
  }
}

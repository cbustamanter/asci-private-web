import moment from "moment";

moment.locale("es");
export const dateRangeDDMM = (start: Date, end: Date): String => {
  const startDay = moment(start).format("DD");
  const startMonth = moment(start).format("MMMM");
  const endDay = moment(end).format("DD");
  const endMonth = moment(end).format("MMMM");
  return `${startDay} de ${startMonth} al ${endDay} de ${endMonth}`;
};

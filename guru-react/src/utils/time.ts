import moment, { Moment } from "moment";

export const getDateString = (date: string | Moment, addGMT: boolean = false) =>
  `${moment(date).format("ll")} at ${moment(date).format("LT")} ${
    addGMT ? "GMT" : ""
  }`;

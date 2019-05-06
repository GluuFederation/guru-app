import moment from "moment-timezone";
import countryList from "country-list";

export const countries = countryList;
export const countriesNameList = countries.getNames();
export const countriesCodeList = countries.getCodes();
export const countryChoiceValidator = value =>
  countriesCodeList.includes(value);

export const timezoneList = moment.tz.names();
export const timezoneChoiceValidator = value => timezoneList.includes(value);

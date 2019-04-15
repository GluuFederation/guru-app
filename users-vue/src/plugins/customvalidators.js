import moment from 'moment-timezone'
export const countries = require('country-list')()
export const countriesNameList = countries.getNames()
export const countriesCodeList = countries.getCodes()
export const countryChoiceValidator = (value) => countriesCodeList.includes(value)

export const timezoneList = moment.tz.names()
export const timezoneChoiceValidator = (value) => timezoneList.includes(value)

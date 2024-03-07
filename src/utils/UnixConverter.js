import moment from "moment";

function convertUnixToTimeDayMonth(unixtimestamp) {
  return moment(unixtimestamp * 1000).format("hh:mm A ddd MMM Do");
}

function convertUnixToDayMonthYear(unixtimestamp) {
  return moment(unixtimestamp * 1000).format("dddd, D MMMM YYYY");
}

export {
  convertUnixToTimeDayMonth,
  convertUnixToDayMonthYear,
};
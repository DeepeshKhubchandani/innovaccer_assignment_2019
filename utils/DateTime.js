const moment = require("moment-timezone");

exports.getDate = function() {
  let timeDate = moment()
    .tz("Asia/Calcutta")
    .format();
  const date = timeDate.substring(0, 10);
  return date;
};

exports.getTime = function() {
  let timeDate = moment()
    .tz("Asia/Calcutta")
    .format();
  const time = timeDate.substring(11, 16);
  return time;
};

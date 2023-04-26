module.exports.getDate = function () {
  var today = new Date();
  var options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  var day = today.toLocaleDateString("en-US", options);
  return day;
};

module.exports.getDay = function () {
  var today = new Date();
  var options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", options);
};

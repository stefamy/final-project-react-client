export const time12Hour = function(timeStr) {

  var time = timeStr.split(":");
  var hour = time[0]
  var mins = time[1]

  var ampm = "am";
  if (hour > 12) {
    hour -= 12;
    ampm = "pm";
  } else if (hour < 10) {
    hour = hour.substring(1);
  }

  return hour + ":" + mins + " " + ampm;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export const littleDate = function(str) {
  const d = new Date(str);
  const year = d.getFullYear();
  const date = d.getDate();
  const month = d.getMonth() + 1; // month is 0 indexed
  return month + "/" + date + "/" + year;
}

export const longDate = function(str) {
  const d = new Date(str);
  const year = d.getFullYear();
  const date = d.getDate();
  const month = months[d.getMonth()];
  const day = d.getDay();
  return days[day] + ", " + month + " " + date + ", " + year;
}


//input

let day = document.querySelector("#day");
let month = document.querySelector("#month");
let year = document.querySelector("#year");

//error

let error = document.querySelectorAll("small");

//form
const form = document.querySelector("form");

//output

let outputDay = document.querySelector("#days");
let outputMonth = document.querySelector("#months");
let outputYear = document.querySelector("#years");
let labels = document.querySelectorAll("label");

let dateObj = new Date();

let currentYear = dateObj.getFullYear();
let currentMonth = dateObj.getMonth() + 1;
let currentDay = dateObj.getDate();

const typeOfError = [
  "",
  "This field is required",
  "Must be a valid day",
  "Must be a valid month",
  "Must be a valid year",
  "Must be a valid date",
];

const errorState = (numberOfError, typeOfDate, typeOfError, color) => {
  error[numberOfError].innerText = typeOfError;
  labels[numberOfError].style.color = color;
  typeOfDate.style.borderColor = color;
};

const isLeapYear = (year) => {
  let leapYear = new Date(year, 1, 29);
  return leapYear.getDate() == 29 && leapYear.getMonth() == 1;
};

const subtractAge = () => {
  let newYear = Math.abs(currentYear - year.value);

  let newMonth = 0;
  if (currentMonth >= month.value) {
    newMonth = currentMonth - month.value;
  } else {
    newYear--;
    newMonth = 12 + currentMonth - month.value;
  }

  let newDay = 0;
  if (currentDay >= day.value) {
    newDay = currentDay - day.value;
  } else {
    newMonth--;
    newDay = 30 + currentDay - day.value;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    if (newMonth < currentMonth) {
      newDay--;
    }
  }
  outputDay.innerText = newDay;
  outputMonth.innerText = newMonth;
  outputYear.innerText = newYear;
};

const isDayCorrect = () => {
  if (day.value == "") {
    errorState(0, day, typeOfError[1], "hsl(0, 100%, 67%)");
    return false;
  } else if (day.value <= 0 || day.value > 31) {
    errorState(0, day, typeOfError[2], "hsl(0, 100%, 67%)");
    return false;
  } else if (isLeapYear(year.value) && month.value == 2 && day.value > 29) {
    errorState(0, day, typeOfError[2], "hsl(0, 100%, 67%)");
    return false;
  }else if(isLeapYear(year.value) == false && month.value == 2 && day.value > 28) {
    errorState(0, day, typeOfError[2], "hsl(0, 100%, 67%)")
  } else {
    errorState(0, day, typeOfError[0], "");
    return true;
  }
};

const isMonthCorrect = () => {
  if (month.value == "") {
    errorState(1, month, typeOfError[1], "hsl(0, 100%, 67%)");
    return false;
  } else if (month.value <= 0 || month.value > 12) {
    errorState(1, month, typeOfError[3], "hsl(0, 100%, 67%)");
    return false;
  } else {
    errorState(1, month, typeOfError[0], "");
    return true;
  }
};

const isYearCorrect = () => {
  if (year.value == "") {
    errorState(2, year, typeOfError[1], "hsl(0, 100%, 67%)");
    return false;
  } else if (year.value > currentYear) {
    errorState(2, year, typeOfError[4], "hsl(0, 100%, 67%)");
    return false;
  } else if (year.value == currentYear && month.value > currentMonth) {
    errorState(1, month, typeOfError[3], "hsl(0, 100%, 67%)");
    return false;
  } else if (
    year.value == currentYear &&
    month.value == currentMonth &&
    day.value > currentDay
  ) {
    errorState(0, day, typeOfError[2], "hsl(0, 100%, 67%)");
    return false;
  } else {
    errorState(0, year, typeOfError[0], "");
    return true;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isDayValid = isDayCorrect();
  let isMonthValid = isMonthCorrect();
  let isYearValid = isYearCorrect();
  if (isDayValid && isMonthValid && isYearValid) {
    subtractAge();
  }
});

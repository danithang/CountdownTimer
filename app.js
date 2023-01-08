const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
// grabbing all from the deadline-format class and all of the h4s
const items = document.querySelectorAll(".deadline-format h4");

// using a temp date to get current date and adding 10 days to the current date to always make sure the timer works for demo purposes
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// creating the end date of contest...months and weekdays start with the 0 index...order is year, month, date, hours, mins, secs, millisecs
// let futureDate = new Date(2023, 0, 10, 8, 0, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 8, 00, 0);
// calling getFullYear and other methods and passing in the giveway variable to add textcontent so each component of the date will show up on the page
const year = futureDate.getFullYear();
const date = futureDate.getDate();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();

// accessing the array holding the months/weekday and making month/weekday equal the array and the month/weekday established in futureDate variable
let month = months[futureDate.getMonth()];
let weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveway ends on ${weekday}, ${month} ${date} ${year} ${hours}:${mins}0am`;

// future time in ms...futureDate is going to be subtracted from current date to get remaining time
const futureTime = futureDate.getTime();

function getRemainingTime(){
  const today = new Date().getTime();
  const remainingTime = futureTime - today;
  
  // 1s = 1000ms, 1m = 60secs, 1hr = 60mins, 1d = 24hrs
  // values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
// calculate all values
  let days = remainingTime/oneDay;
  days = Math.floor(days);
  // using the module operator to get the remainder of days leftover after we checked how many full days left then divide the remainder by oneHour variable
  let hours = Math.floor((remainingTime % oneDay) / oneHour);
  let mins = Math.floor((remainingTime % oneHour) / oneMin);
  // divide by 1000 because 1s = 1000ms
  let secs = Math.floor((remainingTime % oneMin) / 1000);

  // set values array
  const values = [days, hours, mins, secs];
  
  // creating a function for the format so if items are less than 10 then there will be a 0 in front else item will return as is
  function format(item){
    if (item < 10) {
      return item = `0${item}`;
    }; 
      return item;
    
  };
  // iterating over each item in the items variable and the values array because it's the same setup and ultimately adding the matched variables to the html
  items.forEach(function(item, index) {
    item.innerHTML = format(values[index]);
  });
  // adding this to the getRemainingTime function so the countdown will be cleared and deadline will give a message
  if (remainingTime < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`
  };
};
// countdown...setInterval will take countdown and keep refreshing on its on every 1 sec instead of manually refreshing the page
let countdown = setInterval(getRemainingTime, 1000);
// need to invoke this function after countdown to have access to clearInterval method
getRemainingTime();





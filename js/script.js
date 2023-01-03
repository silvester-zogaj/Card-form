"use-strict";

// VARIABLES

const form = document.getElementById("form");
const cardholderName = document.getElementById("cardholder-name");
const cardholderNumber = document.getElementById("cardholder-number");
const cardExpiryMonth = document.getElementById("card-expiry-month");
const cardExpiryYear = document.getElementById("card-expiry-year");
const cardCvc = document.getElementById("card-cvc");

const cardName = document.querySelector(".card-name");
const cardNumber = document.querySelector(".card-number");
const cardDateMonth = document.querySelector(".card-date-month");
const cardDateYear = document.querySelector(".card-date-year");
const cvcNumber = document.querySelector(".cvc-number");

const submitted = document.getElementById("submitted");
const continueBtn = document.querySelector(".continue-btn");

// CARD FUNCTIONALITY

function cardholderNameKeyPress() {
  cardName.innerHTML = cardholderName.value;
}

function cardholderNumberKeyPress() {
  cardNumber.innerHTML = cardholderNumber.value;
}

function monthKeyPress() {
  cardDateMonth.innerHTML = cardExpiryMonth.value;
}

function yearKeyPress() {
  cardDateYear.innerHTML = cardExpiryYear.value;
}

function cvcKeyPress() {
  cvcNumber.innerHTML = cardCvc.value;
}

// FORM FUNCTIONALITY
let a, b, c, d; //To be used to assign values within the else/false statement within checkInputs

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkInputs();
  if (a === 0 && b === 0 && c === 0 && d === 0) {
    form.style.display = "none";
    submitted.style.display = "block";
  } else {
    return;
  }
  a = b = c = d = 1; // setting the values to not '0'. So the form resets it's IF statement within the checkInputs function.
});

function checkInputs() {
  //getting values of inputs
  const cardNameValue = cardholderName.value.trim();
  const cardNumberValue = cardholderNumber.value.trim();
  const cardMonthValue = cardExpiryMonth.value.trim();
  const cardYearValue = cardExpiryYear.value.trim();
  const cardCvcValue = cardCvc.value.trim();

  if (cardNameValue === "") {
    // show error message
    //add error class
    setErrorFor(cardholderName, "Can't be blank");
  } else if (ifContainsNumbers(cardNameValue)) {
    setErrorFor(cardholderName, "Wrong format, letters only");
  } else {
    setSuccessFor(cardholderName);
    a = 0; // setting 'a' with a value that will be recognised as false
  }

  if (cardNumberValue === "") {
    // show error message
    //add error class
    setErrorFor(cardholderNumber, "Can't be blank");
  } else if (ifContainsLetters(cardNumberValue)) {
    setErrorFor(cardholderNumber, "Wrong format, numbers only");
  } else {
    setSuccessFor(cardholderNumber);
    b = 0; // setting 'b' with a value that will be recognised as false
  }

  if (cardMonthValue === "") {
    // show error message
    //add error class
    setErrorFor(cardExpiryMonth, "Can't be blank");
  } else if (cardYearValue === "") {
    // show error message
    //add error class
    setErrorFor(cardExpiryYear, "Can't be blank");
  } else if (ifContainsLetters(cardYearValue)) {
    setErrorFor(cardExpiryYear, "Wrong format, numbers only");
  } else if (ifContainsLetters(cardMonthValue)) {
    setErrorFor(cardExpiryMonth, "Wrong format, numbers only");
  } else {
    setSuccessFor(cardExpiryMonth);
    setSuccessFor(cardExpiryYear);
    c = 0; // setting 'c' with a value that will be recognised as false
  }

  if (cardCvcValue === "") {
    // show error message
    //add error class
    setErrorFor(cardCvc, "Can't be blank");
  } else if (ifContainsLetters(cardCvcValue)) {
    setErrorFor(cardCvc, "Wrong format, numbers only");
  } else {
    setSuccessFor(cardCvc);
    d = 0; // setting 'd' with a value that will be recognised as false
  }
}

// UTILITY FUNCTIONS

continueBtn.addEventListener("click", function () {
  resetForm();
  // function that resets the form after it has been submitted
});

function resetForm() {
  submitted.style.display = "none";
  form.style.display = "block";

  cardName.innerHTML = "John Smith";
  cardholderName.value = "";

  cardNumber.innerHTML = "0000 0000 0000 0000";
  cardholderNumber.value = "";

  cardDateMonth.innerHTML = "MM";
  cardExpiryMonth.value = "";

  cardDateYear.innerHTML = "YY";
  cardExpiryYear.value = "";

  cvcNumber.innerHTML = "e.g. 123";
  cardCvc.value = "";
}

function setErrorFor(input, message) {
  const formInput = input.parentElement;
  // input is cardholderName at this point, and its parent is the class .form-input

  const small = formInput.querySelector("small");
  // formInput is now established, so we can use it as the source to pull the query from, so we pull the element small from it to add the error message to it.

  small.innerText = message;
  // the content of the small element will be text. Message is the message parameter in our function. The message will vary depending on the input. So if message is 'I like food' then inside the function small.innerText = 'I like food', as it is the argument for the message parameter

  formInput.className = "form-input error";
  // adding the error class to the form-input, as this is the function that runs if the form doesnt meet our requirements
}

function setSuccessFor(input) {
  const formInput = input.parentElement;
  // input is cardholderName at this point, and its parent is the class .form-input
  formInput.className = "form-input success";
}

function ifContainsLetters(str) {
  return /[a-z]/i.test(str);
} // Checks if the value contains letters

function ifContainsNumbers(str) {
  return /\d/.test(str);
  // Checks if the value contains numbers
}

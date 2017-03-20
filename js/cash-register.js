window.onload = function() {
  "use strict";
  var calculationHappened = false;
  var calculator = new parsingCalculatorModule();
  var decimalIndex = false;
  var numbersArr = [];
  var operatorsArr = [];
  var displayString = "";
  var originalDisplayString = "[$0__________________________]";
  var display = document.getElementById("registerDisplay");
  var number = document.querySelectorAll("span.btn-number");
  var operation = document.querySelectorAll("span.btn-operation");
  display.innerHTML = originalDisplayString;


  function addToDisplay(str) {

    var displayStr;

    if (display.innerHTML === originalDisplayString) {
      display.innerHTML = "";
    }

    displayStr = display.innerHTML.replace(/[\[\]_$'']/g," ").trim();

    // checking if an operator is being added after another
    if (isNaN(Number(str)) && (isNaN(Number(displayStr[displayStr.length-1])) && displayStr[displayStr.length-1] !== ".")) {
      alert("Error: Cannot add one operator after another or add an operator without an argument!");
      clearDisplay();
      return null;
    }

    else if (!isNaN(Number(str)) && displayStr[displayStr.length-1] === ".") {
      displayStr = displayStr.substr(0, displayStr.length-1);
    }

    else if (isNaN(Number(str))) {
      if (str === ".") {
        displayStr += ".";
      } else {
        displayStr += " " + str;
      }
    }

    else if (isNaN(Number(displayStr[displayStr.length-1])) && !isNaN(Number(str)) && displayStr[displayStr.length-1] !== ".") {
      displayStr += " " + str;
    }

    else if ((!isNaN(Number(displayStr[displayStr.length-1])) || displayStr[displayStr.length-1] === ".") && !isNaN(Number(str))) {
      displayStr += str;
    }

    display.innerHTML = displayStr;

  }

  function updateDisplay() {

    }

  function clearDisplay() {
      display.innerHTML = originalDisplayString;
      decimal = false;
      decimalIndex = 0;
  }

  function parseDisplay() {
    return display.innerHTML.replace(/[\[\]_$'']/g," ").trim();
  }

  for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(){
      if (calculationHappened) {
        clearDisplay();
      }
      addToDisplay(this.innerHTML.replace(/[\[\]'']/g,""));
    });
  }

  for (let i = 0; i < operation.length; i++) {
    operation[i].addEventListener("click", function(){
      addToDisplay(this.innerHTML.replace(/[\[\]'']/g,""));
    });
  }

};
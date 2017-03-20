window.onload = function() {
  "use strict";
  var calculationHappened = false;
  var decimal = false;
  var calculator = new parsingCalculatorModule();
  var displayString = "";
  var originalDisplayString = "[$0__________________________]";
  var display = document.getElementById("registerDisplay");
  var number = document.querySelectorAll("span.btn-number");
  var operation = document.querySelectorAll("span.btn-operation");
  
  function addToDisplay(str) {

    var displayStr;

    if (display.innerHTML === originalDisplayString || parseDisplay() === "0" || parseDisplay() === "Infinity") {
      display.innerHTML = "";
    }

    displayStr = parseDisplay();

    if (str === "." && displayStr === "") {
      displayStr = "0.";
      decimal = true;
    }

    // checking if an operator is being added after another
    else if (isNaN(Number(str)) && (isNaN(Number(displayStr[displayStr.length-1])) && displayStr[displayStr.length-1] !== ".")) {
      if (str === ".") {
        displayStr += " 0.";
        decimal = true;
      } else {
        alert("Error: Cannot add one operator after another or add an operator without an argument!");
        clearDisplay();
        return null;
      }
    }

    else if (isNaN(Number(str)) && displayStr[displayStr.length-1] === ".") {
      displayStr = displayStr.substr(0, displayStr.length-1);
    }

    else if (isNaN(Number(str))) {
      if (str === ".") {
        if (!decimal) {
          if (calculationHappened && Math.round(Number(parseDisplay())) === Number(parseDisplay())) {
            displayStr += ".";
            decimal = true;
            calculationHappened = false;
          }
          else if (!calculationHappened) {
            displayStr += ".";
            decimal = true;
          }
        }
      } else {
        displayStr += " " + str;
        decimal = false;
        calculationHappened = false;
      }
    }

    else if (isNaN(Number(displayStr[displayStr.length-1])) && !isNaN(Number(str)) && displayStr[displayStr.length-1] !== ".") {
      displayStr += " " + str;
    }

    else if ((!isNaN(Number(displayStr[displayStr.length-1])) || displayStr[displayStr.length-1] === ".") && !isNaN(Number(str))) {
      if (calculationHappened) {
        calculationHappened = false;
        displayStr = "";
      }
      displayStr += str;
    }

    display.innerHTML = displayStr;

  }

  function updateDisplay() {

    }

  function clearDisplay() {
      display.innerHTML = originalDisplayString;
      decimal = false;
      calculationHappened = false;
  }

  function parseDisplay() {
    return display.innerHTML.replace(/[\[\]_$'']/g," ").trim();
  }

  for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(){
      if (calculationHappened && this.id !== "buttonDecimal") {
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

  document.querySelector("#buttonClear").addEventListener("click", function(){
    clearDisplay();
  });
  document.querySelector("#buttonEquals").addEventListener("click", function(){
    var total = calculator.calculate(parseDisplay());
    clearDisplay();
    calculationHappened = true;
    decimal = false;
    addToDisplay(String(total));
  });
  document.querySelector("#buttonAns").addEventListener("click", function(){
    clearDisplay();
    decimal = false;
    addToDisplay(calculator.getAnswer());
  });


  display.innerHTML = originalDisplayString;

};
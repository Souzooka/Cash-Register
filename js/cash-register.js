window.onload = function() {
  "use strict";
  var calculator = calculatorModule();
  var calculatorFunction = null;
  var display = document.getElementById("registerDisplay");
  var money = 0;
  var storedMoney = 0;
  var negative = "";
  var displayDollars = "0";
  var displayCents = "00";
  var tempDisplay = 0;
  var tempDisplayActive = true;
  var decimal = false;
  var decimalIndex = 0;
  var operatorPressed = false;
  calculator.load(0);

  function displayTempMoney() {
    tempDisplay = calculator.getTotal();
    display.innerHTML = `$${tempDisplay.toFixed(2)}`;
    tempDisplayActive = true;
  }

  function updateMoney() {
    money = Number(displayDollars) + Number(displayCents / 100);
    if (negative === "") {
      return money;
    } else {
      return money * -1;
    }
  }
  function updateMoneyString() {
    if (money >= 0) {
      displayDollars = String((Math.floor(money)));
      displayCents = String((money - Math.floor(money)) * 100);
    } else {
      money = Math.abs(money);
      negative = "-";
      displayDollars = String((Math.floor(money)));
      displayCents = String((money - Math.floor(money)) * 100);
      money *= -1;
    }
    displayCents = Math.round(displayCents);
    if (displayCents < 10) {
      displayCents = "0" + String(displayCents);
    }
    updateDisplay();
  }
  function checkLeadingNumbers() {
    if (decimalIndex > 1) {
      return false;
    } else {
      return true;
    }
  }
  function updateDisplay(numStr) {

    if (tempDisplayActive) {
      display.innerHTML = "$0.00";
      displayCents = "00";
      displayDollars = "0";
      tempDisplayActive = false;
    }

    if (numStr) {
      if (decimal && checkLeadingNumbers()) {
        displayCents = String(displayCents).substr(0, decimalIndex) + numStr + String(displayCents).substr(decimalIndex + 1);
        if (numStr === "0" && decimalIndex <= 1) {
          decimalIndex++;
        }
        else if (numStr !== "0") {
          decimalIndex++;
        }
        if (numStr === "00") {
          decimalIndex += 2;
        }
      }
      else if (!decimal) {
        displayDollars += numStr;
      }

    }
    display.innerHTML = `${negative}$${Number(displayDollars)}.${displayCents}`;
  }
  function clearDisplay() {
  displayDollars = "0";
  displayCents = "00";
  decimal = false;
  decimalIndex = 0;
  negative = "";
  display.innerHTML = `$${Number(displayDollars)}.${displayCents}`;
  }
  document.getElementById("buttonDecimal").addEventListener("click", function(){
    decimal = true;
  });
  for (var i = 0; i < document.getElementsByClassName("btn-number").length; i++) {
    document.getElementsByClassName("btn-number")[i].addEventListener("click", function(){
      if (String(this.id.slice(6)) !== "Decimal") {
        updateDisplay(String(this.id.slice(6)));
      }
    });
  }
  document.getElementById("buttonClear").addEventListener("click", function(){
    clearDisplay();

    // CALC LOGIC
    calculator.load(0);
    calculator.saveMemory();


  });
  document.getElementById("buttonEquals").addEventListener("click", function(){
    if (calculatorFunction === null) {
      clearDisplay();
    } else {
      if (calculatorFunction === calculator.divide && updateMoney() === 0) {
        alert("User attempted to divide by 0, authorities alerted.") /* a wild inline comment appeared */;
        calculatorFunction = null;
        return -1;
      }

      calculator.load(calculator.recallMemory());
      calculatorFunction(updateMoney());

      money = calculator.getTotal();
      updateMoneyString();
      decimal = false;
      decimalIndex = 0;
      calculatorFunction = null;
      operatorPressed = false;

      calculator.load(0);
      calculator.saveMemory();
    }
  });
  document.getElementById("buttonAdd").addEventListener("click", function(){

    // FIRST TIME USE AFTER CLEAR/EQUALS OR if operating off of number 0, 0 isn't important
    if (calculator.recallMemory() === 0) {
      // inject this shit directly into memory
      calculator.loadMemory(updateMoney());
      calculatorFunction = calculator.add;
      displayTempMoney();
      return null;
    }

    if (updateMoney() === 0 && calculatorFunction === calculator.divide) {
      calculatorFunction = calculator.add;
      window.location = "http://i.imgur.com/6nU4X8Q.jpg";
      return null;
    }

    if (calculatorFunction !== calculator.add) {
      calculator.load(calculator.recallMemory());
      calculatorFunction(updateMoney());
      calculator.saveMemory();
      calculatorFunction = calculator.add;
      displayTempMoney();
      return null;
    }

    // WE SHOULD ONLY REACH THIS POINT IF WE HAVE CLICKED ON ADD, AND OUR PREVIOUS ACTION WAS TO ADD

    calculator.load(calculator.recallMemory());
    calculatorFunction(updateMoney());
    calculator.saveMemory();

    displayTempMoney();
  });
  document.getElementById("buttonMultiply").addEventListener("click", function(){

    if (calculator.recallMemory() === 0) {
      calculator.loadMemory(updateMoney());
      calculatorFunction = calculator.multiply;
      displayTempMoney();
      return null;
    }

    if (updateMoney() === 0 && calculatorFunction === calculator.divide) {
      calculatorFunction = calculator.multiply;
      window.location = "http://i.imgur.com/6nU4X8Q.jpg";
      return null;
    }

    if (calculatorFunction !== calculator.multiply) {
      calculator.load(calculator.recallMemory());
      calculatorFunction(updateMoney());
      calculator.saveMemory();
      calculatorFunction = calculator.multiply;
      displayTempMoney();
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(updateMoney());
    calculator.saveMemory();

    displayTempMoney();

  });
  document.getElementById("buttonSubtract").addEventListener("click", function(){

    if (calculator.recallMemory() === 0) {
      calculator.loadMemory(updateMoney());
      calculatorFunction = calculator.subtract;
      displayTempMoney();
      return null;
    }

    if (updateMoney() === 0 && calculatorFunction === calculator.divide) {
      calculatorFunction = calculator.subtract;
      window.location = "http://i.imgur.com/6nU4X8Q.jpg";
      return null;
    }

    if (calculatorFunction !== calculator.subtract) {
      calculator.load(calculator.recallMemory());
      calculatorFunction(updateMoney());
      calculator.saveMemory();
      calculatorFunction = calculator.subtract;
      displayTempMoney();
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(updateMoney());
    calculator.saveMemory();

    displayTempMoney();
  });
  document.getElementById("buttonDivide").addEventListener("click", function(){

    if (calculator.recallMemory() === 0) {
      calculator.loadMemory(updateMoney());
      calculatorFunction = calculator.divide;
      displayTempMoney();
      return null;
    }

    if (updateMoney() === 0 && calculatorFunction === calculator.divide) {
      calculatorFunction = calculator.divide;
      window.location = "http://i.imgur.com/6nU4X8Q.jpg";
      return null;
    }

    if (calculatorFunction !== calculator.divide) {
      calculator.load(calculator.recallMemory());
      calculatorFunction(updateMoney());
      calculator.saveMemory();
      calculatorFunction = calculator.divide;
      displayTempMoney();
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(updateMoney());
    calculator.saveMemory();

    displayTempMoney();
  });
  document.getElementById("buttonGetBalance").addEventListener("click", function(){
    money = storedMoney;
    updateMoneyString();
  });
  document.getElementById("buttonDeposit").addEventListener("click", function(){
    if (updateMoney() < 0) {
      alert("Cannot deposit a negative amount!");
    } else {
      storedMoney += updateMoney();
    }
    clearDisplay();
  });
  document.getElementById("buttonWithdraw").addEventListener("click", function(){
    if (storedMoney - updateMoney() < 0) {
      alert("Insufficient funds!");
    }
    else if (updateMoney() < 0) {
      alert("Perhaps you're looking for the \"Deposit Cash\" button?");
    } else {
      storedMoney -= updateMoney();
    }
    clearDisplay();
  });
};
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
  var decimal = false;
  var decimalIndex = 0;
  var operatorPressed = false;
  calculator.load(0);

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

    calculatorFunction = calculator.add;
    if (calculator.recallMemory() === 0) {
      calculator.load(updateMoney());
      calculator.saveMemory();
    } else {
      calculator.load(updateMoney());
      calculatorFunction(calculator.recallMemory());
      calculator.saveMemory();
    }
    clearDisplay();
  });
  document.getElementById("buttonMultiply").addEventListener("click", function(){

    if (calculatorFunction !== calculator.multiply) {
      calculatorFunction(calculator.recallMemory());
      calculatorFunction = calculator.multiply;
      clearDisplay();
      return null;
    }

    calculatorFunction = calculator.multiply;

    if (calculator.recallMemory() === 0) {
      calculator.load(updateMoney());
      calculator.saveMemory();
    } else {
      calculator.load(updateMoney());
      calculatorFunction(calculator.recallMemory());
      calculator.saveMemory();
    }
    clearDisplay();

  });
  document.getElementById("buttonSubtract").addEventListener("click", function(){
    calculator.load(updateMoney());
    calculatorFunction = calculator.subtract;
    clearDisplay();
  });
  document.getElementById("buttonDivide").addEventListener("click", function(){
    calculator.load(updateMoney());
    calculatorFunction = calculator.divide;
    clearDisplay();
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
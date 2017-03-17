window.onload = function() {
  "use strict";
  var calculator = calculatorModule();
  var calculatorFunction = null;
  var display = document.getElementById("registerDisplay");
  var money = 0;
  var negative = "";
  var displayDollars = "0";
  var displayCents = "00";
  var decimal = false;
  var decimalIndex = 0;

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
        return -1;
      }
      calculatorFunction(updateMoney());
      money = calculator.getTotal();
      updateMoneyString();
      decimal = false;
      decimalIndex = 0;
    }
  });
  document.getElementById("buttonAdd").addEventListener("click", function(){
    calculator.load(updateMoney());
    calculatorFunction = calculator.add;
    clearDisplay();
  });
  document.getElementById("buttonMultiply").addEventListener("click", function(){
    calculator.load(updateMoney());
    calculatorFunction = calculator.multiply;
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
    money = calculator.recallMemory();
    calculatorFunction = null;
    updateMoneyString();
  });
  document.getElementById("buttonDeposit").addEventListener("click", function(){
    calculator.addMemory(updateMoney());
    clearDisplay();
  });
  document.getElementById("buttonWithdraw").addEventListener("click", function(){
    calculator.subtractMemory(updateMoney());
    clearDisplay();
  });
};

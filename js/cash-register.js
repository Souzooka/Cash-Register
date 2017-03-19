window.onload = function() {
  "use strict";
  var calculator = calculatorModule();
  var calculatorFunction = null;
  var displayNum = 0;
  var money = 0;
  var storedMoney = 0;
  var moneyStr = "";
  var moneyStrDollars = "0";
  var moneyStrCents = "00";
  var display = document.getElementById("registerDisplay");
  var decimal = false;
  var decimalIndex = 0;
  var originalDisplayStr = "[$0.00_______________________]";
  var calcCheck = false;
  var promptDisplayClear = true;
  var equalsCheck = false;
  var negative = "";

  // if we pass in a number (as a result of calc) as a string, we can load a number straight into the display
  // e.g. updateASCIIDisplay(String(2198.87));
  function updateASCIIDisplay(numStr) {

    if (promptDisplayClear) {
      clearDisplay();
    }

    if (calcCheck) {
       calcCheck = false;
       promptDisplayClear = true;
       display.innerHTML = originalDisplayStr;
    }

    if (Number(numStr) < 0) {
      numStr = String(Number(numStr) * - 1);
      negative = "-";
    } else {
      negative = "";
    }

    if (Number(numStr) !== Math.round(Number(numStr)) && !calcCheck) {
      if (String(numStr).length - String(Math.round(Number(numStr))).length === 3) {
        decimalIndex = 2;
      } else {
        decimalIndex = 1;
      }
      moneyStr = numStr;
      decimal = true;
      calcCheck = true;
    }
    else if (numStr && !decimal) {

      moneyStr = display.innerHTML.slice(2);
      moneyStr = String(parseFloat(moneyStr));

      moneyStr += numStr;
    }
    else if (numStr && decimal && decimalIndex < 2) {
      if (numStr === "00") {
        return null;
      }
      if (decimalIndex === 0) {
        moneyStrCents = numStr + "0";
      } else {
        moneyStrCents = moneyStrCents[0] + numStr;
      }

      moneyStr = display.innerHTML.slice(2);
      moneyStr = parseFloat(moneyStr);
      moneyStr = String(Math.floor(moneyStr).toFixed(0));
      moneyStr = moneyStr + "." + moneyStrCents;

      decimalIndex++;
    }



    if (Number(moneyStr) >= 1e+14 || isNaN(Number(moneyStr))) {
      alert("Buffer Overflow Error!");
      moneyStr = "0";
      calculator.load(0);
      calculator.saveMemory();
    }

    moneyStr = Number(moneyStr).toFixed(2);

    display.innerHTML = `[$${negative}${moneyStr}`;

    // display.length should end with 30, we cap it with a "]"
    while (display.innerHTML.length < 29) {
      display.innerHTML += "_";
    }
    display.innerHTML += "]";

  }

  function clearDisplay() {
    moneyStr = "";
    decimal = false;
    decimalIndex = 0;
    display.innerHTML = originalDisplayStr;
    if (!promptDisplayClear && !equalsCheck) {
      calculator.load(0);
      calculator.saveMemory();
    }
    equalsCheck = true;
    promptDisplayClear = false;
  }

  function parseMoney() {
    return parseFloat(display.innerHTML.slice(2));
  }

  var number = document.querySelectorAll("span.btn-number");

  for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(){
      updateASCIIDisplay(this.innerHTML.replace(/[\[\]'']/g,""));
    });
  }

  document.getElementById("buttonDecimal").addEventListener("click", function(){
    decimal = true;
    calcCheck = false;
    promptDisplayClear = false;
  });
  document.getElementById("buttonClear").addEventListener("click", function(){
    promptDisplayClear = false;
    equalsCheck = false;
    clearDisplay();
  });
  document.getElementById("buttonDeposit").addEventListener("click", function(){
    if (parseMoney() < 0) {
      alert("Cannot deposit a negative amount!");
    } else {
      storedMoney += parseMoney();
    }
    promptDisplayClear = false;
    equalsCheck = false;
    clearDisplay();
  });
  document.getElementById("buttonWithdraw").addEventListener("click", function(){
    if (storedMoney - parseMoney() < 0) {
      alert("Insuffiencient funds. Current funds is " + storedMoney);
    } else {
      storedMoney -= parseMoney();
    }
    promptDisplayClear = false;
    equalsCheck = false;
    clearDisplay();
  });
  document.getElementById("buttonGetBalance").addEventListener("click", function(){
    updateASCIIDisplay(String(storedMoney));
  });
  document.getElementById("buttonMultiply").addEventListener("click", function(){

    if (calculator.recallMemory() === 0) {
      calculator.loadMemory(parseMoney());
      calculatorFunction = calculator.multiply;
      calcCheck = true;
      decimal = false;
      decimalIndex = 0;
      updateASCIIDisplay(String(calculator.getTotal()));

      return null;
    }

    if (parseMoney() === 0 && calculatorFunction === calculator.divide) {
      calculatorFunction = calculator.multiply;
      window.location = "http://i.imgur.com/6nU4X8Q.jpg";
      return null;
    }

    if (calculatorFunction !== calculator.multiply) {
      calculator.load(calculator.recallMemory());
      calculatorFunction(parseMoney());
      calculator.saveMemory();
      calculatorFunction = calculator.multiply;
      calcCheck = true;
      decimal = false;
      decimalIndex = 0;
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(parseMoney());
    calculator.saveMemory();
    calcCheck = true;
    decimal = false;
    decimalIndex = 0;
    updateASCIIDisplay(String(calculator.getTotal()));

  });

  document.getElementById("buttonDivide").addEventListener("click", function(){

    if (calculator.recallMemory() === 0) {
      calculator.loadMemory(parseMoney());
      calculatorFunction = calculator.divide;
      calcCheck = true;
      clearDisplay();
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    if (parseMoney() === 0 && calculatorFunction === calculator.divide) {
      calculatorFunction = calculator.divide;
      window.location = "http://i.imgur.com/6nU4X8Q.jpg";
      return null;
    }

    if (calculatorFunction !== calculator.divide) {
      calculator.load(calculator.recallMemory());
      calculatorFunction(parseMoney());
      calculator.saveMemory();
      calculatorFunction = calculator.divide;
      calcCheck = true;
      decimal = false;
      decimalIndex = 0;
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(parseMoney());
    calculator.saveMemory();
    calcCheck = true;
    decimal = false;
    decimalIndex = 0;
    updateASCIIDisplay(String(calculator.getTotal()));

  });
  document.getElementById("buttonSubtract").addEventListener("click", function(){

    if (calculator.recallMemory() === 0) {
      calculator.loadMemory(parseMoney());
      calculatorFunction = calculator.subtract;
      calcCheck = true;
      clearDisplay();
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    if (parseMoney() === 0 && calculatorFunction === calculator.divide) {
      calculatorFunction = calculator.subtract;
      window.location = "http://i.imgur.com/6nU4X8Q.jpg";
      return null;
    }

    if (calculatorFunction !== calculator.subtract) {
      calculator.load(calculator.recallMemory());
      calculatorFunction(parseMoney());
      calculator.saveMemory();
      calculatorFunction = calculator.subtract;
      calcCheck = true;
      decimal = false;
      decimalIndex = 0;
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(parseMoney());
    calculator.saveMemory();
    calcCheck = true;
    decimal = false;
    decimalIndex = 0;
    updateASCIIDisplay(String(calculator.getTotal()));

  });
  document.getElementById("buttonAdd").addEventListener("click", function(){

    if (calculator.recallMemory() === 0) {
      calculator.loadMemory(parseMoney());
      calculatorFunction = calculator.add;
      calcCheck = true;
      clearDisplay();
      decimal = false;
      decimalIndex = 0;
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    if (parseMoney() === 0 && calculatorFunction === calculator.divide) {
      calculatorFunction = calculator.add;
      window.location = "http://i.imgur.com/6nU4X8Q.jpg";
      return null;
    }

    if (calculatorFunction !== calculator.add) {
      calculator.load(calculator.recallMemory());
      calculatorFunction(parseMoney());
      calculator.saveMemory();
      calculatorFunction = calculator.add;
      calcCheck = true;
      decimal = false;
      decimalIndex = 0;
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(parseMoney());
    calculator.saveMemory();
    calcCheck = true;
    decimal = false;
    decimalIndex = 0;
    updateASCIIDisplay(String(calculator.getTotal()));

  });
  document.getElementById("buttonEquals").addEventListener("click", function(){
    calculator.load(calculator.recallMemory());
    calculatorFunction(parseMoney());
    decimal = false;
    decimalIndex = 0;
    calcCheck = true;
    equalsCheck = true;
    updateASCIIDisplay(String(calculator.getTotal()));
    calculator.load(0);
    calculator.saveMemory();
  });


/*if (calculator.recallMemory() === 0) {
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

    displayTempMoney();*/

};
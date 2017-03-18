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

    if (Number(moneyStr) >= 1e+14) {
      alert("Buffer Overflow Error!");
      money = 0;
      moneyStr = "0";
    }

    moneyStr = Number(moneyStr).toFixed(2);

    display.innerHTML = `[$${moneyStr}`;

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

  updateASCIIDisplay(String(2198.87));


  document.getElementById("button0").addEventListener("click", function(){
    updateASCIIDisplay("0");
  });
  document.getElementById("button00").addEventListener("click", function(){
    updateASCIIDisplay("00");
  });
  document.getElementById("button1").addEventListener("click", function(){
    updateASCIIDisplay("1");
  });
  document.getElementById("button2").addEventListener("click", function(){
    updateASCIIDisplay("2");
  });
  document.getElementById("button3").addEventListener("click", function(){
    updateASCIIDisplay("3");
  });
  document.getElementById("button4").addEventListener("click", function(){
    updateASCIIDisplay("4");
  });
  document.getElementById("button5").addEventListener("click", function(){
    updateASCIIDisplay("5");
  });
  document.getElementById("button6").addEventListener("click", function(){
    updateASCIIDisplay("6");
  });
  document.getElementById("button7").addEventListener("click", function(){
    updateASCIIDisplay("7");
  });
  document.getElementById("button8").addEventListener("click", function(){
    updateASCIIDisplay("8");
  });
  document.getElementById("button9").addEventListener("click", function(){
    updateASCIIDisplay("9");
  });
  document.getElementById("buttonDecimal").addEventListener("click", function(){
    decimal = true;
  });
  document.getElementById("buttonClear").addEventListener("click", function(){
    promptDisplayClear = false;
    equalsCheck = false;
    clearDisplay();
  });
  document.getElementById("buttonDeposit").addEventListener("click", function(){
    storedMoney += parseMoney();
    clearDisplay();
  });
  document.getElementById("buttonWithdraw").addEventListener("click", function(){
    storedMoney -= parseMoney();
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
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(parseMoney());
    calculator.saveMemory();
    calcCheck = true;
    updateASCIIDisplay(String(calculator.getTotal()));

  });

  document.getElementById("buttonDivide").addEventListener("click", function(){

    if (calculator.recallMemory() === 0) {
      calculator.loadMemory(parseMoney());
      calculatorFunction = calculator.divide;
      calcCheck = true;
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
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(parseMoney());
    calculator.saveMemory();
    calcCheck = true;
    updateASCIIDisplay(String(calculator.getTotal()));

  });
  document.getElementById("buttonSubtract").addEventListener("click", function(){

    if (calculator.recallMemory() === 0) {
      calculator.loadMemory(parseMoney());
      calculatorFunction = calculator.subtract;
      calcCheck = true;
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
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(parseMoney());
    calculator.saveMemory();
    calcCheck = true;
    updateASCIIDisplay(String(calculator.getTotal()));

  });
  document.getElementById("buttonAdd").addEventListener("click", function(){

    if (calculator.recallMemory() === 0) {
      calculator.loadMemory(parseMoney());
      calculatorFunction = calculator.add;
      calcCheck = true;
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
      updateASCIIDisplay(String(calculator.getTotal()));
      return null;
    }

    calculator.load(calculator.recallMemory());
    calculatorFunction(parseMoney());
    calculator.saveMemory();
    calcCheck = true;
    updateASCIIDisplay(String(calculator.getTotal()));

  });
  document.getElementById("buttonEquals").addEventListener("click", function(){
    calculator.load(calculator.recallMemory());
    calculatorFunction(parseMoney());
    calculator.saveMemory();
    calcCheck = true;
    equalsCheck = true;
    updateASCIIDisplay(String(calculator.getTotal()));
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
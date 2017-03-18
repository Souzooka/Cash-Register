window.onload = function() {
  "use strict";
  var calculator = calculatorModule();
  var calculatorFunction = null;
  var displayNum = 0;
  var money = 0;
  var moneyStr = "";
  var display = document.getElementById("registerDisplay");
  var decimal = false;
  var originalDisplayStr = "[____________________________]";

  function updateASCIIDisplay(numStr) {

    var numMultiplier;

    moneyStr = display.innerHTML.slice(2);
    moneyStr = String(parseFloat(moneyStr));
    money = Number(moneyStr);

    if (numStr && !decimal) {
      moneyStr += numStr;
    }

    if (Number(moneyStr) >= 1e+20) {
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

  document.getElementById("button8").addEventListener("click", function(){
    updateASCIIDisplay("8");
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
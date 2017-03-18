window.onload = function() {
  "use strict";
  var calculator = calculatorModule();
  var calculatorFunction = null;
  var displayNum = 0;
  var display = document.getElementById("registerDisplay");
  var decimal = false;
  var originalDisplayStr = "[____________________________]";


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
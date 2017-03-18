window.onload = function() {
  "use strict";
  var calculator = calculatorModule();
  var calculatorFunction = null;
  var displayNum = 0;
  var money = 0;
  var storedMoney = 0;
  var moneyStr = "";
  var display = document.getElementById("registerDisplay");
  var decimal = false;
  var originalDisplayStr = "[$0.00_______________________]";

  // if we pass in a number (as a result of calc) as a string, we can load a number straight into the display
  // e.g. updateASCIIDisplay(String(2198.87));
  function updateASCIIDisplay(numStr) {

    if (Number(numStr) !== Math.round(Number(numStr))) {
      moneyStr = numStr;
    }
    else if (numStr && !decimal) {

      moneyStr = display.innerHTML.slice(2);
      moneyStr = String(parseFloat(moneyStr));

      moneyStr += numStr;
    }
    else if (false) {

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

  function clearDisplay() {
    moneyStr = "";
    decimal = false;
    display.innerHTML = originalDisplayStr;
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
  document.getElementById("buttonClear").addEventListener("click", function(){
    clearDisplay();
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
var calculatorScript = require( './calculator.js' );
var calculatorDollars = calculatorScript.calculatorModule();
var calculatorCents = calculatorScript.calculatorModule();

var cashRegisterModule = (function (){

  var _dollars = 0;
  var _cents = 0;

  function getDollars() {
    return _dollars;
  }

  function getCents() {
    return _cents;
  }

  function addMoney(element, operand) {
    //TODO
    var centsToAdd = operand - Math.floor(operand);
    var dollarsToAdd = Math.floor(operand);
  }

  function decimal(element) {
    if (element.innerHTML.search(/\./) === -1) {
      element.innerHTML += ".";
    }
  }

  return {
    getDollars,
    getCents,
    addMoney,
    decimal
  }


});


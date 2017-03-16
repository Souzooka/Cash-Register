
var cashRegisterModule = (function (){

  var _dollars = 0;
  var _cents = 0;
  var _dollarsDisplay = 0;
  var _centsDisplay = 0;
  var _display = "$0.00";
  var _displayElement = null;

  function setDisplayElement(element) {
    _displayElement = element;
  }

  function getDollars() {
    return _dollars;
  }

  function getCents() {
    return _cents;
  }

  function addMoney(operand) {
    //TODO
    var centsToAdd = operand - Math.floor(operand);
    var dollarsToAdd = Math.floor(operand);
  }

  return {
    getDollars,
    getCents,
    addMoney,
}


});
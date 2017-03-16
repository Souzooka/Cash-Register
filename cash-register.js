
var cashRegisterModule = (function (){

  var _dollars = 0;
  var _cents = 0;
  var _dollarsDisplay = 0;
  var _centsDisplay = 0;
  var _display = "$0.00";
  var _displayElement = null;

  function getDollars() {
    return _dollars;
  }

  function getCents() {
    return _cents;
  }

  return {
    getDollars,
    getCents,
}


});
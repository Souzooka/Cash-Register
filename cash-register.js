
var cashRegisterModule = (function (){

  var _cents = 0;
  var _dollars = 0;
  var negativeOperation = false;

  function getDollars() {
    return _dollars;
  }

  function setDollars(value) {
    _dollars = value;

    if (_dollars < 0) {
      _cents = 0;
      _dollars = 0;
    }
  }

  function getCents() {
    return _cents % 100;
  }

  function setCents(value) {
    _cents = value;
  }


  function addMoney(dollars, cents) {

    _cents += cents;
    _dollars += dollars;

    while (_cents >= 100) {
      _cents -= 100;
      _dollars++;
    }
  }

  function subtractMoney(dollars, cents) {

    _cents -= cents;
    _dollars -= dollars;

    while (_cents < 0) {
      _cents += 100;
      _dollars--;
    }

    if (_dollars < 0) {
      _cents = 0;
      _dollars = 0;
    }

  }


  return {
    getDollars,
    setDollars,
    getCents,
    setCents,
    addMoney,
    subtractMoney
};


});
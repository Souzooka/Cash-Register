
var cashRegisterModule = (function (){

  var _dollars = 0;
  var _cents = 0;

  function getDollars() {
    return _dollars;
  }

  function setDollars(value) {
    _dollars = value;
  }

  function getCents() {
    return _cents;
  }

  function setCents(value) {
    _cents = value;
  }

  function addMoney(dollars, cents) {
    _dollars += dollars;
    _cents += cents;
    while (_cents >= 100) {
      _dollars++;
      cents -= 100;
    }
  }

  function subtractMoney(dollars, cents) {
    _dollars -= dollars;
    _cents -= cents;
    while (_cents < 0) {
      _dollars--;
      cents += 100;
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
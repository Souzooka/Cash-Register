
var cashRegisterModule = (function (){

  var _cents = 0;

  function getDollars() {
    if (_cents >= 0) {
      return Math.floor(_cents / 100);
    } else {
      return Math.ceil(_cents / 100);
    }
  }

  function setDollars(value) {
    _cents += (value * 100);
  }

  function getCents() {
    return _cents % 100;
  }

  function setCents(value) {
    _cents = value;
  }


  function addMoney(dollars, cents) {
    var total = cents + (dollars * 100);
    _cents += total;
  }

  function subtractMoney(dollars, cents) {
    var total = cents + (dollars * 100);
    _cents -= total;

    if (_cents < 0) {
      _cents = 0;
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
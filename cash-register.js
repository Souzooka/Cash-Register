
var cashRegisterModule = (function (){

  var _money = 0;

  function getMoney() {
    return _money;
  }

  function setMoney(value) {
    _money = value;
  }

  function addMoney(value) {

    _money += value;
  }

  function subtractMoney(value) {

    _money -= value;

  }


  return {
    getMoney,
    setMoney,
    addMoney,
    subtractMoney
};


});
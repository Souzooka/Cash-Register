/**
 * Declare a function named `calculatorModule`
 * this function will have two private variables declared inside of it.
 * @variable PRIVATE { Number } `memory`
 * @variable PRIVATE { Number } `total`
 * @return {object} `calculator` object that can be used
 */

var calculatorModule = (function(){

  var _memory = 0;
  var _total = 0;

  /**
   * sets the `total` to the number passed in
   * @param  { Number } x
   * @return { Number }    current total
   */

  function load(newTotal) {
    if (_isNumber(newTotal)) {
      _total = newTotal;
    }

    return _total;
  }

  /**
   * Return the value of `total`
   * @return { Number }
   */

  function getTotal() {
    return _total;
  }

  /**
   * Sums the value passed in with `total`
   * @param { Number } x
   */

  function add(operand) {
    if (_isNumber(operand)) {
      _total += operand;
    }
  }

  /**
   * Subtracts the value passed in from `total`
   * @param  { Number } x
   */

  function subtract(operand) {
    if (_isNumber(operand)) {
      _total -= operand;
    }
  }

  /**
   * Multiplies the value by `total`
   * @param  { Number } x
   */

  function multiply(operand) {
    if (_isNumber(operand)) {
      _total *= operand;
    }
  }

  /**
   * Divides the value passing in by `total`
   * @param  { Number } x
   */

  function divide(operand) {
    if (_isNumber(operand)) {
      _total /= operand;
    }
  }

  /**
   * Return the value stored at `memory`
   * @return { Number }
   */

  function recallMemory() {
    return _memory;
  }

  /**
   * Stores the value of `total` to `memory`
   */

  function saveMemory() {
    _memory = _total;
  }

  /**
   * Clear the value stored at `memory`
   */

  function clearMemory() {
    _memory = 0;
  }

  /**
   * Validation
   */

  function _isNumber(testValue) {
    if (typeof testValue === "number") {
      return true;
    }
    throw new Error("Only numbers can be loaded into memory.");
  }

  return {
    load,
    getTotal,
    add,
    subtract,
    multiply,
    divide,
    recallMemory,
    saveMemory,
    clearMemory
  };


});

module.exports = {
  calculatorModule
};
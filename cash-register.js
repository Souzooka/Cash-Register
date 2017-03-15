var calculatorScript = require( './calculator.js' );
var calculator = calculatorScript.calculatorModule();

calculator.add(2);
calculator.multiply(12);
console.log(calculator.getTotal());
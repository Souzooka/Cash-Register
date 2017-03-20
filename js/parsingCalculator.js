// CALCULATOR TWO POINT OH
'use strict';

function parsingCalculatorModule() {

	// input calcString as a whitespace-seperated string, the first part of the string must be a number
	this.calculate = function(calcString) {
		var numArr = [];
		var operationArr = [];
		var total = 0;
		var operator1 = 0;
		var operator2 = 0;
		var operation = "";
		var calculation = null;

		function add(op1, op2) {
			return op1 + op2;
		}

		function subtract(op1, op2) {
			return op1 - op2;
		}

		function divide(op1, op2) {
			return op1 / op2;
		}

		function multiply(op1, op2) {
			return op1 * op2;
		}

		function exponent(op1, op2) {
			return Math.pow(op1, op2);
		}

		calcString = calcString.split(" ");

		for (let i = 0; i < calcString.length; i += 2) {
			numArr.push(Number(calcString[i]));
		}

		for (let i = 1; i < calcString.length; i += 2) {
			operationArr.push(calcString[i]);
		}

		while (numArr.length > 1) {
			operator1 = numArr.shift();
			operator2 = numArr.shift();
			operation = operationArr.shift();

			switch (operation) {
				case "+":
					calculation = add;
					break;
				case "-":
					calculation = subtract;
					break;
				case "*":
					calculation = multiply;
					break;
				case "/":
					calculation = divide;
					break;
				case "^":
					calculation = exponent;
					break;
				default:
					throw new Error("Invalid calculator input!");
			}

			numArr.unshift(calculation(operator1, operator2));
 
		}

		total = numArr[0];
		return total;
	};

	this.calculatePEMDAS = function(calcString) {
		// TODO
		return calcString.split(" ");
	};

}

var calculator = new parsingCalculatorModule();
var calculator2  = new parsingCalculatorModule();

console.log(calculator.calculate("10 ^ 3")); // 7.33 repeating
console.log(calculator2.calculate("8 * 9 + 2 - 2 / 2")); // 36
// CALCULATOR TWO POINT OH
'use strict';

function parsingCalculatorModule() {

	var _answer = 0;

	function _add(op1, op2) {
		return op1 + op2;
	}

	function _subtract(op1, op2) {
		return op1 - op2;
	}

	function _divide(op1, op2) {
		return op1 / op2;
	}

	function _multiply(op1, op2) {
		return op1 * op2;
	}

	function _exponent(op1, op2) {
		return Math.pow(op1, op2);
	}

	function _setAnswer(value) {
		_answer = value;
	}

	this.getAnswer = function() {
		return _answer;
	};

	// input calcString as a whitespace-seperated string, the first part of the string must be a number
	// if calcString ends on an operation (e.g. "10 ^ 3 * 3 + "), it will be ignored.
	this.calculate = function(calcString) {
		var total;
		var operator1;
		var operator2;
		var operation;
		var calculation;
		var numArr = [];
		var operationArr = [];

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
					calculation = _add;
					break;
				case "-":
					calculation = _subtract;
					break;
				case "*":
				case "x":
				case "X":
					calculation = _multiply;
					break;
				case "/":
				case "÷":
					calculation = _divide;
					break;
				case "^":
					calculation = _exponent;
					break;
				default:
					throw new Error("Invalid calculator input!");
			}

			numArr.unshift(calculation(operator1, operator2));
 
		}

		total = numArr[0];
		_setAnswer(total);
		return total;
	};

	this.calculatePEMDAS = function(calcString) {
		// TODO
		return calcString.split(" ");
	};

}
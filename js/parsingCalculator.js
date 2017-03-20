// CALCULATOR TWO POINT OH
'use strict';

function parsingCalculatorModule() {

	var _answer = 0;

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

	this.getAnswer = () => {
		return _answer;
	};

	function setAnswer(value) {
		_answer = value;
	}

	// input calcString as a whitespace-seperated string, the first part of the string must be a number
	// if calcString ends on an operation (e.g. "10 ^ 3 * 3 + "), it will be ignored.
	this.calculate = (calcString) => {
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
		setAnswer(total);
		return total;
	};

	this.calculatePEMDAS = (calcString) => {
		// TODO
		return calcString.split(" ");
	};

}
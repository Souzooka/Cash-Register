// CALCULATOR TWO POINT OH

function parsingCalculatorModule() {

	// input calcString as a whitespace-seperated string, the first part of the string must be a number
	this.calculate = function(calcString) {
		var numArr = [];
		var operationArr = [];
		calcString = calcString.split(" ");

		for (let i = 0; i < calcString.length; i += 2) {
			numArr.push(calcString[i]);
		}

		for (let i = 1; i < calcString.length; i += 2) {
			operationArr.push(calcString[i]);
		}

		return operationArr;

	};

	this.calculatePEMDAS = function(calcString) {
		return calcString.split(" ");
	};

}

var calculator = new parsingCalculatorModule();
var calculator2  = new parsingCalculatorModule();

console.log(calculator.calculate("7 + 7"));
console.log(calculator2.calculate("8 * 8 + 2 - 2 / 2"));
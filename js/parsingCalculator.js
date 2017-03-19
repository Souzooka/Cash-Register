// CALCULATOR TWO POINT OH

function parsingCalculatorModule() {

	// input calcString as a whitespace-seperated string, the first part of the string must be a number
	this.calculate = function(calcString) {
		return calcString.split(" ");
	};

	this.calculatePEMDAS = function(calcString) {
		return calcString.split(" ");
	};

}

var calculator = new parsingCalculatorModule();
var calculator2  = new parsingCalculatorModule();

console.log(calculator.calculate("7 + 7"));
console.log(calculator2.calculate("8 * 8 + 2 - 2 / 2"));
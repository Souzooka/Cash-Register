window.onload = function() {
  "use strict";
  var emptyDisplay = true;
  // we want to truncate display string if it gets too long
  var displayString = "";
  var calculationString = "";
  var originalDisplayString = "[$0.00_______________________]";
  var display = document.getElementById("registerDisplay");
  var number = document.querySelectorAll("span.btn-number");
  var operation = document.querySelectorAll("span.btn-number");


  function addToDisplay(str) {
    displayString = display.innerHTML.replace(/[\[\]_$'']/g," ").trim();
  }

  function updateDisplay() {

  }

  function clearDisplay() {

  }

  for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(){
      addToDisplay(this.innerHTML.replace(/[\[\]'']/g,""));
    });
  }

  for (let i = 0; i < operation.length; i++) {
    number[i].addEventListener("click", function(){
      addToDisplay(this.innerHTML.replace(/[\[\]'']/g,""));
    });
  }

};
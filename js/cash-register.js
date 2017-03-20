window.onload = function() {
  "use strict";
  var emptyDisplay = true;
  var number = document.querySelectorAll("span.btn-number");
  var operation = document.querySelectorAll("span.btn-number");

  for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(){
      addToDisplay(this.innerHTML.replace(/[\[\]'']/g,""));
    });
  }

  for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(){
      addToDisplay(this.innerHTML.replace(/[\[\]'']/g,""));
    });
  }

};
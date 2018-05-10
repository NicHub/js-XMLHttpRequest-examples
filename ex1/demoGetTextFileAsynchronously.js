"use strict";

(function() {

  main();

  function main() {
    getTextFileAsynchronously(displayPlainText, "https://raw.githubusercontent.com/NicHub/ouilogique.com/gh-pages/README.md");
  }

  // Display the data.
  function displayPlainText(success, data) {
    console.log("success " + success);
    var dataPlainText = document.getElementById("dataPlainText");
    if(!success) {
      dataPlainText.innerHTML = "OOPS, something went wrong!";
      return;
    }
    dataPlainText.innerHTML = data;
  }

  // General function to get data asynchronously.
  function getTextFileAsynchronously(callback, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
    xhr.addEventListener("load",  xhrEventListener);
    xhr.addEventListener("error", xhrEventListener);

    function xhrEventListener() {
      var response = "";
      var success = false;

      // Check if an error occured.
      if(this.status>=200 && this.status<400) {
        response = this.responseText;
        success = true;
      }
      else {
        response = "ERROR";
        success = false;
      }

      // Call the callback function.
      if(typeof callback === "function")
        callback(success, response);
    }
  }
})();

function onClick(e) {
  e.preventDefault();
  // get form values
  let number = document.getElementById('number').value;
  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;

  // check if number is empty
  if (number === "") {
    number = "random";
  }

  // setup URL
  let url = "http://numberapi.com/" + number + "/" + type + "?json";
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the Numbers API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
      updateResult(json.text);
    });
}

function updateResult(info) {
  document.getElementById('result').textContent = info;
}

document.getElementById('woo').addEventListener('click', onClick);

function selectorChange() {
  var input = document.getElementById("input");
  input.innerHTML = "";
  if (document.getElementById("selector").value === "random") {
    // Pull up random dish
  } else if (document.getElementById("selector").value === "search") {
    // Make search bar appear
    let search_bar = document.createElement("input");
    search_bar.id = "search-input";
    search_bar.type = "text";
    search_bar.placeholder = "Enter the name of a dish to search!";
    input.appendChild(search_bar);
  } else {
    // https://www.themealdb.com/api/json/v1/1/categories.php
    let categories = document.createElement("select");
    categories.id = "categories";

    let url = "http://www.themealdb.com/api/json/v1/1/categories.php";
    // call API
    

    // <option value="random">Random Dish</option>
    // <select id="selector" onchange="selectorChange()">

    // Make dropdown 2 appear
  }
}

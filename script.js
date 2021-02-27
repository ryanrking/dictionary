function onClick(e) {
  e.preventDefault();
  // Delete this before publishing
  let corsUrl = "https://cors-anywhere.herokuapp.com/"

  // get form values
  let s = document.getElementById("selector");
  let type = s.options[s.selectedIndex].value;
  
  let url = corsUrl + "http://themealdb.com/api/json/v1/1/";
  if (type === "search") {
    url += "search.php?s=" + document.getElementById("search-input").value; 
  } else if (type === "category") {
    //FIXME hardcoded until dropdown working
    url += "filter.php?c=" + "Seafood"

  } else if (type === "random") {
    url += "random.php";
  }

  console.log(url);

  // setup URL
  
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the TheMealDB API service: " + response.statusText
        }
      }
      return response.json();

    }).then(function(json) {
      if (type === "random") {
        recipeResult(json);
      } else {
        listResult(json);
      }
    });
}

function recipeResult(info) {

}

function listResult(info) {
  let results = "<div class='recipe-row'>";
  results += "<p class='recipe-list-title>";

  results += "</p><"
}

function updateResult(info) {
  document.getElementById('result').textContent = info;
}

document.getElementById('search').addEventListener('click', onClick);

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

    let corsUrl = "https://cors-anywhere.herokuapp.com/";
    let cat_url = corsUrl + "http://www.themealdb.com/api/json/v1/1/categories.php";
    // call API
    
    fetch(cat_url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the TheMealDB API service: " + response.statusText
        }
      }
      return response.json();

    }).then(function(json) {
      // update DOM with response
      console.log(json);
      for (let i=0; i < json.categories.length; i++) {
        let item = document.createElement("option");
        item.value = json.categories[i].strCategory;
        item.appendChild(document.createTextNode(json.categories[i].strCategory));
        categories.appendChild(item);
      }
    });
    input.appendChild(categories);

    // <option value="random">Random Dish</option>
    // <select id="selector" onchange="selectorChange()">

    // Make dropdown 2 appear
  }
}

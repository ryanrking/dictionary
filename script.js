function onClick(e) {
  e.preventDefault();
  // Delete this before publishing
  let corsUrl = "https://cors-anywhere.herokuapp.com/"
  // get form values
  let s = document.getElementById("selector");
  let type = s.options[s.selectedIndex].value;

  //FIXME assumes always random
  //if (type === "random")
  
  // setup URL
  let url = corsUrl + "http://themealdb.com/api/json/v1/1/random.php";
  
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
      // update DOM with response
      console.log(json);
    });
}

function recipeDetailed(json) {
  let recipe = document.createElement("div");
  recipe.className = "recipe";

  let header_info = document.createElement("div");
  recipe.className = "recipe-header";

  // Ingredients group
  let ingredients_group = document.createElement("div");
  ingredients_group.className = "recipe-ingreds";

  let ingredients_table = document.createElement("table");
  ingredients_table.className = "recipe-table";

  let row_head = document.createElement("tr");

  let table_title_1 = document.createElement("td");
  table_title_1.appendChild(document.createTextNode("Ingredient"));
  let table_title_2 = document.createElement("td");
  table_title_2.appendChild(document.createTextNode("Measurement"));
  row_head.appendChild(table_title_1);
  row_head.appendChild(table_title_2);

  ingredients_table.appendChild(row_head);

  for (var i = 1; i <= 20; i++) {
    let row = document.createElement("tr");

    if ((str_ingred = json.meals["strIngredients" + i]) !== None) {
      let ingredient = document.createElement("td");
      ingredient.className = "ingredient";
      ingredient.appendChild(document.createTextNode(str_ingred));

      let measurment = document.createElement("td");
      measurment.className = "measurement";
      measurment.appendChild(document.createTextNode(json.meals["strMeasure" + i]));

      row.appendChild(ingredient);
      row.appendChild(measurment);
      ingredients_table.appendChild(row);
    }
  }


  let instructions = document.createElement("div");
  instructions.className = "recipe-instrucs";

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

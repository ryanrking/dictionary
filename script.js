function onClick(e) {
  e.preventDefault();
  // FIXME Delete this before publishing
  let corsUrl = "https://cors-anywhere.herokuapp.com/"

  // get form values
  let s = document.getElementById("selector");
  let type = s.options[s.selectedIndex].value;
  
  let url = corsUrl + "http://themealdb.com/api/json/v1/1/";
  if (type === "search") {
    url += "search.php?s=" + document.getElementById("search-input").value; 
  
  } else if (type === "category") {
    let cat = document.getElementById("categories");
    let catType = cat.options[cat.selectedIndex].value;
    url += "filter.php?c=" + catType

  } else if (type === "random") {
    url += "random.php";
  }

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
        console.log(json);
        listResult(json);
      }
    });
}

function itemClicked(e) {
  e.preventDefault();
  //FIXME delete this
  let corsUrl = "https://cors-anywhere.herokuapp.com/"
  let url = corsUrl + "http://themealdb.com/api/json/v1/1/";
  url += "search.php?s=" + e.target.innerHTML;

  // Add individual recipe showing
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
      recipeResult(json);
  });
}

function recipeResult(json) {
  response = document.getElementById("response");
  response.innerHTML = "";
  for (i = 0; i < json.meals.length; i++) {
    let recipe = document.createElement("div");
    recipe.className = "recipe";

    // Recipe Header Info
    let header_info = document.createElement("div");
    header_info.className = "recipe-header";

    let header_titles = document.createElement("div");
    header_titles.className = "header-titles";
    
    let title = document.createElement("h2");
    title.className = "recipe-title";
    title.appendChild(document.createTextNode(json.meals[i].strMeal));

    let title_category = document.createElement("h4");
    title_category.className = "recipe-sub-title";
    title_category.appendChild(document.createTextNode(json.meals[i].strCategory));

    let title_origin = document.createElement("h4");
    title_origin.className = "recipe-sub-title";
    title_origin.appendChild(document.createTextNode(json.meals[i].strArea));

    let cat_orig_pair = document.createElement("div");
    cat_orig_pair.className = "cat-orig-pair";
    cat_orig_pair.appendChild(title_category);
    cat_orig_pair.appendChild(title_origin)


    let title_tags = document.createElement("h5");
    if (json.meals[i].strTags != null) {
      title_tags.className = "recipe-tags";
      title_tags.appendChild(document.createTextNode(json.meals[i].strTags));
    }

    let video = document.createElement("a");
    if (json.meals[i].strYoutube != null) {
      video.className = "recipe-video";
      video.href = json.meals[i].strYoutube
      video.appendChild(document.createTextNode("Click Here For a Youtube Video"));
    }

    header_titles.appendChild(title);
    // header_titles.appendChild(title_category);
    // header_titles.appendChild(title_origin);
    header_titles.appendChild(cat_orig_pair);
    header_titles.appendChild(title_tags);
    header_titles.appendChild(video);

    let header_picture = document.createElement("img");
    header_picture.className = "header-thumbnail";
    header_picture.src = json.meals[i].strMealThumb;

    header_info.appendChild(header_titles);
    header_info.appendChild(header_picture)


    // Ingredients Info
    let ingredients_group = document.createElement("div");
    ingredients_group.className = "recipe-ingreds";

    let ingred_title = document.createElement("h4");
    ingred_title.appendChild(document.createTextNode("Ingredients"));

    let ingredients_table = document.createElement("table");
    ingredients_table.className = "recipe-table";

    for (var j = 1; j <= 20; j++) {
      let row = document.createElement("tr");

      if ((str_ingred = json.meals[i]["strIngredient" + j]) != "") {
        let ingredient = document.createElement("td");
        ingredient.className = "ingredient";
        str_measure = json.meals[i]["strMeasure" + j];
        ingredient.appendChild(document.createTextNode(str_measure + "  " + str_ingred));

        row.appendChild(ingredient);
        ingredients_table.appendChild(row);
      }
    }
    ingredients_group.appendChild(ingred_title);
    ingredients_group.appendChild(ingredients_table);


    // Instructions info
    let instruct_title = document.createElement("h4");
    instruct_title.appendChild(document.createTextNode("Instructions"));

    let instructions = document.createElement("p");
    instructions.className = "recipe-instrucs";
    instructions.appendChild(instruct_title);
    instructions.appendChild(document.createTextNode(json.meals[i].strInstructions));

    recipe.appendChild(header_info);
    recipe.appendChild(ingredients_group);
    recipe.appendChild(instructions);
    response.appendChild(recipe);
  }
  
  
}

function listResult(json) {
  let results = "<h3 id='search-results-header'> We found the following recipes: </h3>";
  results += "<div class='recipes'>";
  for (let i = 0; i < json.meals.length; i++) {
    results += "<div class='recipe-row'>";
    results += "<a class='recipe-list-title'>";
    results += json.meals[i].strMeal + "</a>";
    results += "<img class='recipe-thumbnail' src='" + json.meals[i].strMealThumb + "'/>";
    results += "</div>"
  }
  results += "</div>";
  document.getElementById("response").innerHTML = results;

  let arr = document.getElementsByClassName("recipe-list-title");
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", itemClicked);
  }
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
    search_bar.placeholder = "Enter the name of a dish";
    input.appendChild(search_bar);

  } else if (document.getElementById("selector").value === "category") {
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



  //   function recipeDetailed(json) {
  //   let recipe = document.createElement("div");
  //   recipe.className = "recipe";
  
  //   let header_info = document.createElement("div");
  //   recipe.className = "recipe-header";
  
  //   // Ingredients group
  //   let ingredients_group = document.createElement("div");
  //   ingredients_group.className = "recipe-ingreds";
  
  //   let ingredients_table = document.createElement("table");
  //   ingredients_table.className = "recipe-table";
  
  //   let row_head = document.createElement("tr");
  
  //   let table_title_1 = document.createElement("td");
  //   table_title_1.appendChild(document.createTextNode("Ingredient"));
  //   let table_title_2 = document.createElement("td");
  //   table_title_2.appendChild(document.createTextNode("Measurement"));
  //   row_head.appendChild(table_title_1);
  //   row_head.appendChild(table_title_2);
  
  //   ingredients_table.appendChild(row_head);
  
  //   for (var i = 1; i <= 20; i++) {
  //     let row = document.createElement("tr");
  
  //     if ((str_ingred = json.meals["strIngredients" + i]) !== None) {
  //       let ingredient = document.createElement("td");
  //       ingredient.className = "ingredient";
  //       ingredient.appendChild(document.createTextNode(str_ingred));
  
  //       let measurment = document.createElement("td");
  //       measurment.className = "measurement";
  //       measurment.appendChild(document.createTextNode(json.meals["strMeasure" + i]));
  
  //       row.appendChild(ingredient);
  //       row.appendChild(measurment);
  //       ingredients_table.appendChild(row);
  //     }
  //   }
  
  
  //   let instructions = document.createElement("div");
  //   instructions.className = "recipe-instrucs";
  // }



  // ingredient.appendChild(document.createTextNode(str_ingred));

        // let measurment = document.createElement("td");
        // measurment.className = "measurement";
        // measurment.appendChild(document.createTextNode(json.meals[i]["strMeasure" + j]));
                // row.appendChild(measurment);


                // let table_title_2 = document.createElement("td");
                // table_title_2.appendChild(document.createTextNode("Measurement"));
                // row_head.appendChild(table_title_2);
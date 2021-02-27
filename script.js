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

function updateResult(info) {
  document.getElementById('result').textContent = info;
}

document.getElementById('search').addEventListener('click', onClick);

function selectorChange() {
  if (document.getElementById("selector").value === "random") {
    // Pull up random dish
  } else if (document.getElementById("selector").value === "search") {
    // Make search bar appear
  } else {
    // Make dropdown 2 appear
  }
}
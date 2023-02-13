//Random Cocktail API call and append function
var stayInBtn = document.getElementById("stay-in-btn");
var cocktailApiDiv = document.getElementById("cocktail-Api");

stayInBtn.addEventListener("click", function() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
      var drink = data.drinks[0];
      var name = drink.strDrink;
      var imageUrl = drink.strDrinkThumb;
      var ingredients = [];
      for (var i = 1; i <= 15; i++) {
        var ingredient = drink[`strIngredient${i}`];
        if (ingredient) {
          ingredients.push(ingredient);
        }
      }

      var cocktailDiv = document.createElement("div");
      cocktailDiv.innerHTML = `
      <h3>${name}</h3>
      <img src="${imageUrl}" alt="${name}" width="100">
        <p>Ingredients: ${ingredients.join(", ")}</p>
      `;

      cocktailApiDiv.appendChild(cocktailDiv);
    })
    .catch(error => {
      console.error("An error occurred:", error);
    });
});

//Random Brewery API call and append function
var goOutButton = document.getElementById("go-out-btn");
var goOutSearch = document.getElementById("brewery-Api");

goOutButton.addEventListener("click", function() {
  if (goOutSearch.innerHTML === "") {
    goOutSearch.innerHTML = `
      <input type="text" id="city-input" placeholder="Enter city">
      <button id="search-button">Search</button>
    `;
  
    var searchButton = document.getElementById("search-button");
    var cityInput = document.getElementById("city-input");
  
    searchButton.addEventListener("click", function() {
      var city = cityInput.value;
      var endpoint = `https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=5`;
  
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          var resultsDiv = document.createElement("div");
          resultsDiv.id = "results";
  
          data.forEach(function(brewery) {
            resultsDiv.innerHTML += `
              <p>
                Name: ${brewery.name}<br>
                Type: ${brewery.brewery_type}<br>
                City: ${brewery.city}<br>
                State: ${brewery.state}
              </p>
            `;
          });
  
          goOutSearch.appendChild(resultsDiv);
        })
        .catch(error => {
          console.error("An error occurred:", error);
        });
    });
  } else {
    goOutSearch.innerHTML = "";
  }
});

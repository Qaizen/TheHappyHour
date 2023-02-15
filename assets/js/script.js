//Random Cocktail API call and append function
var stayInBtn = document.getElementById("stay-in-btn");
var cocktailContainer = document.getElementById("cocktail-container");
var card = document.querySelector(".card.small");

stayInBtn.addEventListener("click", function () {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var drink = data.drinks[0];
      var name = drink.strDrink;
      var imageUrl = drink.strDrinkThumb;
      var ingredients = [];
      var instructions = drink.strInstructions;

      for (var i = 1; i <= 15; i++) {
        var ingredient = drink[`strIngredient${i}`];
        if (ingredient) {
          ingredients.push(ingredient);
        }
      }

      var cocktailDiv = document.createElement("div");
      cocktailDiv.innerHTML = `
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${imageUrl}" alt="${name}">
        </div>
        <div class="card-content">
          <span class="card-title grey-text text-darken-4">${name}</span>
          <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
          </ul>
        </div>
        `;
      var drinkInstructions = document.getElementById("random-drink-instructions");
      drinkInstructions.innerHTML = `${instructions}`;
      cocktailContainer.appendChild(cocktailDiv);

      card.style.display = "block"; // Show the card
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
});


//modal age restriction
document.addEventListener("DOMContentLoaded", function () {
  var mod = document.querySelector(".modal");
  var instance = M.Modal.init(mod);
  instance.open();
});

//Random Brewery API call and append function
var goOutButton = document.getElementById("go-out-btn");
var goOutSearch = document.getElementById("brewery-Api");
goOutSearch.style.display = "none";
goOutButton.addEventListener("click", function () {
  goOutSearch.style.display = "flex";
  goOutSearch.innerHTML = `
    <input type="text" id="city-input" placeholder="Enter city">
    <button id="search-button">Search</button>
  `;

  var searchButton = document.getElementById("search-button");
  var cityInput = document.getElementById("city-input");

  searchButton.addEventListener("click", function () {
    var city = cityInput.value;
    var endpoint = `https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=5`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var resultsDiv = document.createElement("div");
        resultsDiv.id = "results";

        data.forEach(function (brewery) {
          resultsDiv.innerHTML += `
            <p>
              Name: ${brewery.name}<br>
              Website: <a href="${brewery.website_url}">${brewery.website_url}</a><br>
              Address: ${brewery.street}<br>
              State: ${brewery.state}
            </p>
             <br>
          `;
        });

        goOutSearch.style.display = "block";
        goOutSearch.appendChild(resultsDiv);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });
});


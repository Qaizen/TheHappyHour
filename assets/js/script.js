fetch("http://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("An error occurred:", error);
  });

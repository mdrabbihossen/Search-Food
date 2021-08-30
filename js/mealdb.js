const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  searchField.value = "";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResults(data.meals));
};

const displaySearchResults = (meals) => {
  const searchResults = document.getElementById("search-results");
  meals.forEach((meal) => {
    // console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" >
        <div class="card-body">
        <h5 class="card-title"> ${meal.strMeal} </h5>
        <p class="card-text">
        ${meal.strInstructions.slice(0, 200)}
        </p>
        <div class="card-tags"> 
        
         <li style="display-flex"> ${meal.strTags} </li>
        </div> 
    </div>
  </div>
    `;
    searchResults.appendChild(div);
  });
};

const loadMealDetail = (mealID) => {
  // console.log(mealID);

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (meal) => {
  // console.log(meal);
  const mealDetails = document.getElementById("meal-details");
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <img src="${meal.strMealThumb} "  class="card-img-top" width="50px">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">
            ${meal.strInstructions.slice(0, 200)}
          </p>
          <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
  `;
  mealDetails.appendChild(div);
};

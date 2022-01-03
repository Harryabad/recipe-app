const mealsEl = document.getElementById('meals');
const favouriteContainer = document.getElementById('fav-meals');

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const randomBtn = document.getElementById('random');

const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup');
const mealInfoEl = document.getElementById('meal-info')

getRandomMeal();
fetchFavouriteMeals();

async function getRandomMeal() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    const responseData = await response.json();
    const randomMeal = responseData.meals[0];

    //console.log(randomMeal);


    addMeal(randomMeal, true);
}



async function getMealById(id) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);

    const responseData = await response.json();
    const meal = responseData.meals[0];

    return meal;

}

async function getMealBySearch(term) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);

    const responseData = await response.json();
    const meals = responseData.meals;

    return meals;
}

function addMeal(mealData, random = false) {

    //console.log(mealData);
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `

            <div class="meal-header">
                ${random ? `                
                <span class="random">Random Recipe
                 </span>` : ""}
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav-btn"> 
                    <i class="fas fa-heart"></i>
                </button>
            </div>

        `;

    const btn = meal.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", () => {
        if (btn.classList.contains('active')) {
            removeMealFromLocalStorage(mealData.idMeal)
            btn.classList.remove("active");
        } else {
            addMealToLocalStorage(mealData.idMeal)
            btn.classList.add("active");
        }


        fetchFavouriteMeals();
    });

    meal.addEventListener('click', () => {
        showMealInfo(mealData);
    })

    mealsEl.appendChild(meal);
}

function addMealToLocalStorage(mealId) {
    const mealIds = getMealsFromLocalStorage();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLocalStorage(mealId) {
    const mealIds = getMealsFromLocalStorage();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function getMealsFromLocalStorage() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavouriteMeals() {

    // clean container to avoid repetition
    favouriteContainer.innerHTML = "";

    const mealIds = getMealsFromLocalStorage();

    const meals = [];


    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];

        meal = await getMealById(mealId);

        addMealToFavourite(meal);

        ///meals.push(meal); no need to push to array

    }
    ///console.log(meals);

    ///m add to screen
}


function addMealToFavourite(mealData) {



    //console.log(mealData);
    const favMeal = document.createElement('li');


    favMeal.innerHTML = `

    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><span>${mealData.strMeal}</span>
    <button class="clear"><i class="far fa-times-circle"></i></button>

        `;

    const btn = favMeal.querySelector('.clear');

    btn.addEventListener('click', () => {
        removeMealFromLocalStorage(mealData.idMeal);

        fetchFavouriteMeals();
    });

    favMeal.addEventListener('click', () => {
        showMealInfo(mealData);
    })


    favouriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
    // clean mealinfo container
    mealInfoEl.innerHTML = "";

    //update meal info
    const mealEl = document.createElement('div');

    const ingredients = [];
    //get ingredients and measures
    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(`${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`);
        } else {
            break;
        }
    }
    console.log(ingredients);



    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />


        <p>${mealData.strInstructions}</p>

        <h3>Ingredients</h3>
        <ul>
            ${ingredients.map((ing) => `
            <li>${ing}</li>
            `).join("")}
        </ul>
        
        `;

    mealInfoEl.appendChild(mealEl);

    //show meal popup
    mealPopup.classList.remove('hidden');
}



searchBtn.addEventListener('click', async () => {
    //clean meals container
    mealsEl.innerHTML = '';
    const search = searchTerm.value;

    //console.log(await getMealBySearch(search));  log of meals that contain term 'search'

    const meals = await getMealBySearch(search);

    if (meals) {



        meals.forEach(meal => {
            addMeal(meal);
        });
    }
});

popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
});

randomBtn.addEventListener('click', () => {
    //clean meals container
    mealsEl.innerHTML = '';
    getRandomMeal();

});
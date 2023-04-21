import {RecipeCard, RecipeDescriptionCard, RecipeIngredientsCard, RecipeInstructionsCard} from "./assets/js-files/classes.js";

const containerOfRecipes = document.querySelector('.recipes-container');
const globalSearchInput = document.querySelector('.general-search-input');
const containerOfRecipeDescription = document.querySelector('.recipe-description-container');
const containerOfIngredients = document.querySelector('.ingredients-container');
const containerOfInstructionSteps = document.querySelector('.instructions-container');
const APIKey = '';

// Функции и запросы: поиск и отображение информации с названием, ингридиентами и пошаговой инструкцией при клике на кнопку View Recipe
// Функция для отображения карточек с рецептами по результатам поиска
function clearContent(elementToClear) {
    elementToClear.innerHTML = '';
}

function showSearchResult() {
    const searchString = globalSearchInput.value.trim().replace(/[ ,]+/g, ',');
    clearContent(containerOfRecipes);
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchString}&number=5&apiKey=${APIKey}`;
    fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(function (data) {
            if (searchString === '') {
                containerOfRecipes.classList.add('container-hidden');
            }
            else {
                containerOfRecipes.classList.remove('container-hidden');
                const recipeOptions = getOptions(this.value, data.results);
                if (recipeOptions.length === 0) { throw new SyntaxError("No recipe was found"); }
                recipeOptions.forEach(el => {
                    let foodCard = new RecipeCard(el.id, el.image, el.title);
                    containerOfRecipes.innerHTML += foodCard.displayRecipeCard(foodCard.id, foodCard.image, foodCard.title);
                });
                showAllInformationOfRecipe();
                saveFavoriteHandler();
            }
        })
        .catch(function (error) {
            let errorResult = '';
            errorResult = `
                <div class="container__result-error">
                <div class="error-message">${error.message}</div>
                </div>`;
            containerOfRecipes.innerHTML = errorResult;
        })
}

// Функция для отображение информации с названием, ингридиентами и пошаговой инструкцией при клике на кнопку View Recipe
function showAllInformationOfRecipe() {
    const recipeLinks = document.querySelectorAll('.recipe-card__image');
    recipeLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const recipeId = e.currentTarget.id;
            const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIKey}`;
            fetch(recipeUrl, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(function (data) {
                    localStorage.setItem('RecipeData', JSON.stringify(data));
                    window.document.location = 'recipe-info.html';
                })
        })
    });
}

function getOptions(word, recipes) {
    return recipes.filter(r => {
        const regex = new RegExp(word, 'gi');
        return r.title.match(regex);
    })
}

if (globalSearchInput) {
    globalSearchInput.addEventListener('change', showSearchResult(e => {
        e.preventDefault();
    }));
    globalSearchInput.addEventListener('keyup', showSearchResult);
}


//Кнопка для отображения рандомного рецепта

const randomRecipeContainer = document.querySelector('.container-random-recipe');
const randomButton = document.querySelector('.random-recipe__button');

if (randomButton)
    randomButton.addEventListener('click', displayRandomRecipe);

function displayRandomRecipe() {
    clearContent(randomRecipeContainer);
    const randomUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${APIKey}`;
    fetch(randomUrl, {
        method: "GET",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(function (data) {
            data.recipes.map(item => {
                let randomRecipeCard = new RecipeCard(item.id, item.image, item.title);
                return randomRecipeContainer.innerHTML += randomRecipeCard.displayRandomRecipeCard(randomRecipeCard.id, randomRecipeCard.image, randomRecipeCard.title);
            })
            const showRandomRecipeLink = document.querySelector('.recipe-card__image');
            showRandomRecipeLink.addEventListener('click', function (e) {
                e.preventDefault();
                const randomRecipeId = e.currentTarget.id;
                const randomRecipeIdUrl = `https://api.spoonacular.com/recipes/${randomRecipeId}/information?apiKey=${APIKey}`;
                fetch(randomRecipeIdUrl, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
                    .then(function (data) {
                        localStorage.setItem('RecipeData', JSON.stringify(data));
                        window.document.location = 'recipe-info.html';
                    })

            })
        })
        .catch(function (error) {
            randomRecipeContainer.textContent = error.message;
        })
}


// Отображение рецепта на другой странице
function recipeInit() {
    const data = JSON.parse(localStorage.getItem('RecipeData')) //Z - используем JSON.parse, чтобы вытащить объект из стрингового значения
    let recipeDescription = new RecipeDescriptionCard(data.id, data.image, data.title, data.readyInMinutes, data.servings);
    containerOfRecipeDescription.innerHTML = recipeDescription.displayRecipeDescription(recipeDescription.id, recipeDescription.image, recipeDescription.title, recipeDescription.readyInMinutes, recipeDescription.servings);

    data.extendedIngredients.forEach(item => {
        let recipeIngredients = new RecipeIngredientsCard(item.id, item.image, item.title, item.originalName, item.amount, item.unit);
        containerOfIngredients.innerHTML += recipeIngredients.displayRecipeIngredients(recipeIngredients.originalName, recipeIngredients.amount)
    });
    data.analyzedInstructions.forEach(item => {
        for (let step of item.steps) {
                let recipeInstructionSteps = new RecipeInstructionsCard(step.id, step.image, step.title, step.number, step.step);
                containerOfInstructionSteps.innerHTML += recipeInstructionSteps.displayRecipeInstructionsStepList(recipeInstructionSteps.number, recipeInstructionSteps.step);  
        }
    });
    
}

recipeInit();



const stars = document.querySelectorAll('.recipe-description-card__rating__star');

function setRating(recipeId, rating) {
    localStorage.setItem(`recipeRating_${recipeId}`, rating);
}

function getSavedRating(recipeId) {
    return localStorage.getItem(`recipeRating_${recipeId}`);
}

function setStarsActive(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function handleStarClick(event) {
    const clickedStar = event.currentTarget;
    const rating = Array.from(stars).indexOf(clickedStar) + 1;
    const recipeId = clickedStar.closest('.recipe-description-card__rating').dataset.recipeId;
    setRating(recipeId, rating);
    setStarsActive(stars, rating);
}

stars.forEach(star => {
    const recipeId = star.closest('.recipe-description-card__rating').dataset.recipeId;
    const savedRating = getSavedRating(recipeId);
    if (savedRating) {
        const rating = parseInt(savedRating);
        setStarsActive(stars, rating);
    }
    star.addEventListener('click', handleStarClick);
});

function saveFavorite(event) { //ф-ия сохраняет данные в Local Storage

    let array;
    const like = event.target;
    like.classList.toggle('active');

    const name = like.getAttribute("data-name");
    const image = like.getAttribute("data-image");
    const id = like.getAttribute("data-id");

    // console.log('saveFavorite dataState', dataState);
    const obj = { id, name, image }
    console.log('saveFavorite obj', obj);
    const favorite = window.localStorage.getItem('favorite')

    if (favorite) {          //проверка добавлен ли рецепт уже в ибранное
        array = JSON.parse(favorite)

        const ifTrue = array.some(item => item.id === obj.id);
        if (ifTrue) {
            array = array.filter(item => item.id !== obj.id)
        } else {
            array.push(obj)
        }

    } else {
        array = [obj];
    }
    window.localStorage.setItem('favorite', JSON.stringify(array))
}
function saveFavoriteHandler() {
    const buttons = document.querySelectorAll('.addToFavorit')
    buttons.forEach(button => {
        button.addEventListener("click", saveFavorite)
    })
}
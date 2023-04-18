import { apiUrl, apiKey } from "./api";
import recipePage from "../../recipe.html";
const recipeContainer = document.getElementById('recipe-container');
const recipeId = document.location.hash.slice(1);
const similarRecipes = document.getElementById('similar-recipes');

async function getRecipeById() {
    console.log(recipeId);
    const url = `${apiUrl}${recipeId}/information?${apiKey}`;
    const recipeResponse = await fetch(url);
    if (!recipeResponse.ok) {
        throw new Error(recipeResponse.statusText);
    }
    const recipeObject = await recipeResponse.json();
    return recipeObject;
}


getRecipeById()
    .then((response) => {
        document.title = response.title;
        CurrentRecipe(response);
    })
    .catch(e => console.log(e));


function CurrentRecipe(recipe) {
    const recipeIngredients = recipe.extendedIngredients.map((ingredients) =>
        `<div class = "ingredients-card__content"><div class = "ingredients-card__content__name">${ingredients.originalName}</div> <div class = "ingredient-quantity-container"> ${ingredients.measures.metric.amount} ${ingredients.measures.metric.unitShort}</div></div>`
    ).join('');

    let HTML = `
    <div class ="recipe-description-card">
    <div>
    <img src ="${recipe.image}" class = "recipe-description-card__image"> 
    </div>
    <div class = "description-content-container">
    <h1 class = "description-content-container__title">${recipe.title}</h1>
    <div class = "description-content-container__general-info">
    <p class = "recipe-description-card__time">${recipe.readyInMinutes} min</p>
    <div class="recipe-description-card__rating" data-recipe-id="${recipe.id}">
        <span class="recipe-description-card__rating__star" data-value="1">${recipe.rating >= 1 ? '★' : '☆'}</span>
        <span class="recipe-description-card__rating__star" data-value="2">${recipe.rating >= 2 ? '★' : '☆'}</span>
        <span class="recipe-description-card__rating__star" data-value="3">${recipe.rating >= 3 ? '★' : '☆'}</span>
        <span class="recipe-description-card__rating__star" data-value="4">${recipe.rating >= 4 ? '★' : '☆'}</span>
        <span class="recipe-description-card__rating__star" data-value="5">${recipe.rating >= 5 ? '★' : '☆'}</span>
     </div>
     </div>
     <div class="description-content-container__servings servings-info-container">
     <div class="servings-info-container__potrions-number servings-content">
         <div class="servings-content__portions">Portion(${recipe.servings})</div>
         <div class="servings-content__quantity">
             <div class="servings-content__minus"><img class="servings-content__minus-img" src="https://img.icons8.com/material-sharp/24/null/minus.png" alt="minus"></div>
             <div class="servings-content__icon"><img class="servings-content__minus-img" src="https://cdn-icons-png.flaticon.com/512/1232/1232728.png" alt="plate"></div>
             <div class="servings-content__plus"><img class="servings-content__minus-img" src="https://img.icons8.com/android/24/null/plus.png" alt="plus"></div>
         </div>
     </div>
    </div>
    </div>
    </div>
    <div class="recipe-description-card__recipeText">Recipe</div>
    <div class="recipe-description-card__ingredientsText">Ingredients</div>
    <div class = "recipe-ingredients-container">
    <ul class = "ingredients-list"> ${recipeIngredients}</ul>
    </div>`;
    if (recipe.analyzedInstructions.length > 0) {
        const recipeInstructions = recipe.analyzedInstructions[0].steps.map((step) =>
            `<li class ="recipe-instruscrions-container">
            <div class="steps__list__step-number">Step ${step.number}</div> 
            <div class = "steps__list__step-content">${step.step}</div>
            </li>`
        ).join('');
        HTML += `<div class = "instructions-container">
        <ul class="steps__list">
        ${recipeInstructions}
        </ul>
        </div>
        <div class="instructions-container-text">Bon appetit!</div>`;
    }
    else {
        HTML += `<p class = "recipe-source">Sorry, we can't provide you with instructions. For more information visit <a href = "${recipe.sourceUrl}"> recipe source</a></p>`
    }
    recipeContainer.innerHTML = HTML;
}


async function getSimilarRecipe() {
    const urlToSimilarRecipe = `${apiUrl}${recipeId}/similar?${apiKey}`;
    const SimilarRecipeResponse = await fetch(urlToSimilarRecipe);
    if (!SimilarRecipeResponse.ok) {
        throw new Error(SimilarRecipeResponse.statusText);
    }
    const SimilarRecipeObject = await SimilarRecipeResponse.json();
    return SimilarRecipeObject;
}

getSimilarRecipe()
    .then((response) => {
        SimilarToThisRecipe(response);
    })
    .catch(e => console.log(e));


function SimilarToThisRecipe(array) {
    const SimilarRecipesInformation = array.map((element) =>
        `<div class = "similar-recipe-container-content">
        <p class = "similar-recipe-container__title"><a class = "similar-recipe-container__link" href = "${recipePage}#${element.id}">${element.title}</a></p>
        <p class="similar-recipe-container__time">${element.readyInMinutes} min</p>
        </div>`
    ).join('');
    let HTML = `
    <div class = "similar-recipe-general-container">
    <p class = "similar-recipe-general-container__title">Similar recipes</p>
    <div class ="similar-recipe-container">          
     ${SimilarRecipesInformation}
    </div>
    </div>`
    similarRecipes.innerHTML = HTML;
}

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
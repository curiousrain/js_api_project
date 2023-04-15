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
        `<li class = "recipe-ingredients">${ingredients.originalName} - ${ingredients.measures.metric.amount} ${ingredients.measures.metric.unitShort}</li>`
    ).join('');

    let HTML = `<h1 class = "recipe-tittle">${recipe.title}</h1> <img src ="${recipe.image}" class = "recipe-image"> <p class = "recipe-ready-min">${recipe.readyInMinutes}</p><div class = "recipe-ingredients-container"><ul class = "ingredients-list"> ${recipeIngredients}</ul></div> <div class = "recipe-summary">${recipe.summary}</div>`;
    if (recipe.analyzedInstructions.length > 0) {
        const recipeInstructions = recipe.analyzedInstructions[0].steps.map((step) =>
            ` <li class = "recipe-step">${step.step}</li>`
        ).join('');
        HTML += `<div class = "recipe-instructions-container"><ol class = "instructions-list">${recipeInstructions}</ol></div>`;
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
        SimiarToThisRecipe(response);
    })
    .catch(e => console.log(e));


function SimiarToThisRecipe(array) {
    const SimilarRecipesInformation = array.map((element) =>
        `<div class = "similiar-recipe">
            <p class = "similiar-recipe-tittle"><a href = "${recipePage}#${element.id}">${element.title}</a></p>
            <p class="ready-time">${element.readyInMinutes}</p>
        </div>`
    ).join('');
    similarRecipes.innerHTML = SimilarRecipesInformation;
}
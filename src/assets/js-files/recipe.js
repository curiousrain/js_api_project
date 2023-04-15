import { apiUrl, apiKey } from "./api";
const recipeContainer = document.getElementById('recipe-container');
const recipeId = document.location.hash.slice(1);

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
        `<li>${ingredients.originalName} - ${ingredients.measures.metric.amount} ${ingredients.measures.metric.unitShort}</li>`
    ).join('');

    let HTML = `<h1>${recipe.title}</h1> <img src ="${recipe.image}"><div class = "recipe-ingredients-container"><ul class = "ingredients-list"> ${recipeIngredients}</ul></div> <div class = "recipe-summary">${recipe.summary}</div>`;
    if (recipe.analyzedInstructions.length > 0) {
        const recipeInstructions = recipe.analyzedInstructions[0].steps.map((step) =>
            ` <li>${step.step}</li>`
        ).join('');
        HTML += `<div class = "recipe-instructions-container"><ol class = "instructions-list">${recipeInstructions}</ol></div>`;
    }
    else {
        HTML += `<p class = "recipe-source">Sorry, we can't provide you with instructions. For more information visit <a href = "${recipe.sourceUrl}"> recipe source</a></p>`
    }
    recipeContainer.innerHTML = HTML;
}
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
        `<div class = "recipe-ingredients-container">
        <ul class = "ingredients-list">
        <li>${ingredients.originalName} - ${ingredients.measures.metric.amount} ${ingredients.measures.metric.unitShort}</li>
        </ul>
        </div>`
    ).join('');
    recipeContainer.innerHTML = recipeIngredients;
    const recipeInstructions = recipe.analyzedInstructions.map((steps) =>
        `<div class = recipe-intsctuctions-container>
        
    </div>`
    )
}
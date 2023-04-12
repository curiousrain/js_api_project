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
    })
    .catch(e => console.log(e));


function CurrentRecipe(recipeId) {
    recipeContainer.innerHTML = recipeId.map((response) =>
        `<div class ="recipe-form">
        <h1 class = "recipe-title">${response.title}</h1>
        <div class = "recipe-indredients">
        
        </div>
        </div>`
    )
}
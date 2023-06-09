
import recipePage from "../../recipe.html";
import { apiUrl, apiKey } from "./api";

//async function getSimilarRecipe не экспортируем!!!
async function getRecipeFromApi(recipeId) {
    const urlToSimilarRecipe = `${apiUrl}${recipeId}/similar?${apiKey}`;
    const SimilarRecipeResponse = await fetch(urlToSimilarRecipe);
    if (!SimilarRecipeResponse.ok) {
        throw new Error(SimilarRecipeResponse.statusText);
    }
    const SimilarRecipeObject = await SimilarRecipeResponse.json();
    return SimilarRecipeObject;
}

export default function showSimilarRecipe(htmlContainer, recipeId) {
    getRecipeFromApi(recipeId)
        .then((response) => {
            renderHtml(response, htmlContainer);
        })
        .catch(e => console.log(e))
};

//функцию renderHTML не экспортируем
function renderHtml(array, htmlContainer) {
    const SimilarRecipesInformation = array.map((element) =>
        `<div class = "similar-recipe-container-content">
        <p class = "similar-container__recipe-title"><a class = "similar-recipe-container__link" href = "${recipePage}#${element.id}">${element.title}</a></p>
        <p class="similar-recipe-container__time">${element.readyInMinutes} min</p>
        </div>`
    ).join('');
    let HTML = `
    <div class = "similar-recipe-general-container">
    <p class = "similar-container__heading">Similar recipes</p>
    <div class ="similar-recipe-container">          
     ${SimilarRecipesInformation}
    </div>
    </div>`
    htmlContainer.innerHTML = HTML;
}


import recipePage from "../../recipe.html";

//async function getSimilarRecipe не экспортируем!!!
async function getRecipeFromApi() {
    const urlToSimilarRecipe = `${apiUrl}${recipeId}/similar?${apiKey}`;
    const SimilarRecipeResponse = await fetch(urlToSimilarRecipe);
    if (!SimilarRecipeResponse.ok) {
        throw new Error(SimilarRecipeResponse.statusText);
    }
    const SimilarRecipeObject = await SimilarRecipeResponse.json();
    return SimilarRecipeObject;
}

export default function showSimilarRecipe(htmlContainer) {
    getRecipeFromApi()
        .then((response) => {
            renderHtml(response, htmlContainer);
        })
        .catch(e => console.log(e))
};

//функцию renderHTML не экспортируем
function renderHtml(array, htmlContainer) {
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
    htmlContainer.innerHTML = HTML;
}

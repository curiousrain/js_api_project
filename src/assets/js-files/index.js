import { apiUrl, apiKey } from "./api";
import recipePage from "../../recipe.html"

const recipeContainer = document.getElementById('recipe-result');
const searchQuery = document.getElementById('search');
const searchForm = document.getElementById('search-form');

searchForm.addEventListener("submit", searchByIngredients);

async function searchByIngredients(e) {
    e.preventDefault();
    let ingredients = searchQuery.value;
    const response = await fetch(`${apiUrl}findByIngredients?ingredients=${ingredients}&number=10&limitLicense=true&ranking=1&ignorePantry=false&${apiKey}`);
    const json = await response.json();
    displaySearchQuery(json);
}

function displaySearchQuery(recipeResult) {
    recipeContainer.innerHTML = recipeResult.map((element) =>
        `<div class = "result-post">
        <p class = "result-tittle"><a href = "${recipePage}#${element.id}">${element.title}</a></p>
        <img src ="${element.image}">
        </div >`
    ).join("")
    recipePage.render();
}

//сделать для ошибки
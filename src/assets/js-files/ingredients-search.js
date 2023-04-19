import { apiUrl, apiKey } from "./api";
import recipePage from "../../recipe.html"

const recipeContainer = document.getElementById('recipe-result');
const searchQuery = document.getElementById('search');
const searchForm = document.getElementById('search-form-container');

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
        <a class ="recipe-link"  href = "${recipePage}#${element.id}">
        <img class = "recipe-search-image" src ="${element.image}">
        <p class = "result-title">${element.title}</p>
        </a>
        <span class='add-to-favorite' data-name="${element.title}" data-image="${element.image}" data-id="${element.id}"></span>
        ${this.name}
        </div >`
    ).join("")
    recipePage.render;
    saveFavoriteHandler();
}

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
    const buttons = document.querySelectorAll('.add-to-favorite')
    buttons.forEach(button => {
        button.addEventListener("click", saveFavorite)
    })
}
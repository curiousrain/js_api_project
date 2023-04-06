const containerOfRecipes=document.querySelector('.recipes-container');
const globalSearchForm=document.querySelector('.search-form');
const globalSearchInput=document.querySelector('.general-search-input');

function recipeCardLayout(id, image, name) {
let cardOfRecipe='';
cardOfRecipe=`
<div id='${id}' class="container__card recipe-card">
        <div class="recipe-card__image"><img class="recipe-image" src="${image}" alt="recipeImage"></div>
        <div class="recipe-card__title">${name}</div>
        <div class="recipe-card__button"><button class="recipe-display-button"><a href="#">View recipe</button></a></div>
    </div>
`;
containerOfRecipes.innerHTML+=cardOfRecipe;
}

class RecipeCard {
    id;
    image;
    name;

    constructor (id, image, name){
        this.id=id;
        this.image=image;
        this.name=name;
    }
    displayRecipeCard() {
        return recipeCardLayout(this.id, this.image, this.name);
    }
}

function showSearchResult() {
    const searchString=globalSearchInput.value;
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=pineapple`;
    fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
            "X-API-Key": "aece9e5aa1324bfcba9e2f87fd6b9178",
            "Content-Type": "application/json"
            }
    })
    .then(resp => resp.json())
    .then(function(data) {
        data.map(el => {
            let foodCard=new RecipeCard(el.id, el.image, el.title);
            foodCard.displayRecipeCard(foodCard.id, foodCard.image, foodCard.title);
        });
    })
    .catch(function(error) {
        console.log(error); // написать код, чтобы выводилось сообщение "Такой рецепт не найден"
    });
}
showSearchResult();

//прописать код для инпута
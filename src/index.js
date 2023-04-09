const containerOfRecipes=document.querySelector('.recipes-container');
const globalSearchForm=document.querySelector('.search-form');
const globalSearchInput=document.querySelector('.general-search-input');
const APIKey='aece9e5aa1324bfcba9e2f87fd6b9178';

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

function clearContent(elementToClear) {
    elementToClear.innerHTML='';
}

function showSearchResult() {
    const searchString=globalSearchInput.value.trim().replace(/[ ,]+/g, ',');
    clearContent(containerOfRecipes);
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchString}&number=10&apiKey=${APIKey}`;
    fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
            }
    })
    .then(resp => resp.json())
    .then(function(data) {
        if (searchString==='') {throw new SyntaxError("No recipe was found");}  //не получается пока повесить ошибку на результат, когда ничего не выпадает и у нас пустой экран
const recipeOptions = getOptions(this.value, data.results);
recipeOptions.map(el => {
let foodCard=new RecipeCard(el.id, el.image, el.title);
return foodCard.displayRecipeCard(foodCard.id, foodCard.image, foodCard.title);
});
})
    .catch(function(error) {
    let errorResult='';
    errorResult=`
    <div class="container__result-error">
    <div class="error-message">${error.message}</div>
    </div>
    `;  
    containerOfRecipes.innerHTML=errorResult;
    })
}

function getOptions(word, recipes) {
    return recipes.filter(r => {
        const regex= new RegExp(word, 'gi');
        return r.title.match(regex);
    })
    }

globalSearchInput.addEventListener('change', showSearchResult);
globalSearchInput.addEventListener('keyup',  showSearchResult);





// Второй варинант поиска, результаты отображаются после нажатия enter

// function receiveInputValue(){
//     globalSearchForm.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//         showSearchResult();
//     } );
// };

// globalSearchInput.onchange=receiveInputValue();


// function clearContent(elementToClear) {
//     elementToClear.innerHTML='';
// }

// function showSearchResult() {
//     const searchString=globalSearchInput.value.trim().replace(/[ ,]+/g, ',');
//     clearContent(containerOfRecipes);
//     const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchString}&number=10&apiKey=${APIKey}`;
//     fetch(url, {
//         method: "GET",
//         withCredentials: true,
//         headers: {
//             "Content-Type": "application/json"
//             }
//     })
//     .then(resp => resp.json())
//     .then(function(data) {
//         if (searchString==='') {throw new SyntaxError("No recipe was found");}  //не получается пока повесить ошибку на результат, когда ничего не выпадает - пустой экран
//         console.log(data);
//         data.results.map(el => {
//             let foodCard=new RecipeCard(el.id, el.image, el.title);
//             foodCard.displayRecipeCard(foodCard.id, foodCard.image, foodCard.title);
//         });

//     })
//     .catch(function(error) {
//         let errorResult='';
//         errorResult=`
// <div class="container__result-error">
//         <div class="error-message">${error.message}</div>
//     </div>
// `;
// containerOfRecipes.innerHTML=errorResult;
//     });
// }

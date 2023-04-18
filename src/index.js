const containerOfRecipes = document.querySelector('.recipes-container');
const globalSearchForm = document.querySelector('.search-form');
const globalSearchInput = document.querySelector('.general-search-input');
const containerOfRecipeDescription = document.querySelector('.recipe-description-container');
const containerOfIngredients = document.querySelector('.ingredients-container');
const containerOfInstructionSteps = document.querySelector('.instructions-container');
const APIKey = '6b670efbd0ea4d829a41bdec3f7e5a0a';

// Классы для карточек с рецептами и их инструкций с описанием и ингридиентами
class RecipeCard {
    id;
    image;
    name;

    constructor(id, image, name) {
        this.id = id;
        this.image = image;
        this.name = name;
    }
    displayRecipeCard() {
        let cardOfRecipe = '';
        // const obj = {
        //     id: this.id,
        //     image: this.image,
        //     name: this.name
        // }
        // const item = JSON.stringify(obj);

        // console.log('displayRecipeCard this.name', this.name)
        // console.log('displayRecipeCard obj', obj)
        // console.log('displayRecipeCard item', item)
     
        cardOfRecipe = `
        <div class="container__card recipe-card" >
            <div class="recipe-card__image" id='${this.id}'><img class="recipe-image" src="${this.image}" alt="recipeImage"></div>
            
            <div class="recipe-card__title">
             <span class='addToFavorit' data-name="${this.name}" data-image="${this.image}" data-id="${this.id}"></span>
            ${this.name}
            </div>
            
            </div>`;

        return cardOfRecipe;
    }
   

    displayRandomRecipeCard() {
        let cardOfRecipe = '';
        cardOfRecipe = `
            <div class="container__card recipe-card 11">
                <div class="recipe-card__image" id='${this.id}'><img class="recipe-image" src="${this.image}" alt="recipeImage"></div>
                <div class="recipe-card__title">${this.name}</div>
                
            </div>`;
        return cardOfRecipe;
    }
}

class RecipeDescriptionCard extends RecipeCard {
    readyTime;
    servings;


    constructor(id, image, name, readyTime, servings) {
        super(id, image, name);
        this.readyTime = readyTime;
        this.servings = servings;

    }

    displayRecipeDescription() {
        let RecipeDescriptionCard = '';
        RecipeDescriptionCard = `
    <div id=${this.id} class="recipe-description-container__description recipe-description-card">
            <div class="recipe-description-card__image"><img class="ingredients-recipe-image" src="${this.image}" alt="recipeImage"></div>
            <div class="recipe-description-card__content description-content-container">
                    <div class="description-content-container__title">${this.name}</div>
                    <div class="description-content-container__general-info">
                        <div class="recipe-description-card__time">${this.readyTime} min</div>
                        <div class="recipe-description-card__rating" data-recipe-id="${this.id}">
                            <span class="recipe-description-card__rating__star" data-value="1">${this.rating >= 1 ? '★' : '☆'}</span>
                            <span class="recipe-description-card__rating__star" data-value="2">${this.rating >= 2 ? '★' : '☆'}</span>
                            <span class="recipe-description-card__rating__star" data-value="3">${this.rating >= 3 ? '★' : '☆'}</span>
                            <span class="recipe-description-card__rating__star" data-value="4">${this.rating >= 4 ? '★' : '☆'}</span>
                            <span class="recipe-description-card__rating__star" data-value="5">${this.rating >= 5 ? '★' : '☆'}</span>
                        </div>
                    </div>
                    <div class="description-content-container__servings servings-info-container">
                        <div class="servings-info-container__potrions-number servings-content">
                            <div class="servings-content__portions">Portion(${this.servings})</div>
                            <div class="servings-content__quantity">
                                <div class="servings-content__minus"><img class="servings-content__minus-img" src="https://img.icons8.com/material-sharp/24/null/minus.png" alt="minus"></div>
                                <div class="servings-content__icon"><img class="servings-content__minus-img" src="https://cdn-icons-png.flaticon.com/512/1232/1232728.png" alt="plate"></div>
                                <div class="servings-content__plus"><img class="servings-content__minus-img" src="https://img.icons8.com/android/24/null/plus.png" alt="plus"></div>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="recipe-description-card__recipeText">Recipe</div>
            <div class="recipe-description-card__ingredientsText">Ingredients</div>
    </div>
    `;
        return RecipeDescriptionCard;
    }
}

class RecipeIngredientsCard extends RecipeCard {
    ingredientName;
    ingredientQuantity;
    quantityMeasure;

    constructor(id, image, name, ingredientName, ingredientQuantity, quantityMeasure) {
        super(id, image, name);
        this.ingredientName = ingredientName;
        this.ingredientQuantity = ingredientQuantity;
        this.quantityMeasure = quantityMeasure;
    }
    displayRecipeIngredients() {
        let RecipeIngredientsCard = '';
        RecipeIngredientsCard = `
        <div class="ingredients-container__ingredients ingredients-card">
            <div class="ingredients-card__content">
                <div class="ingredients-card__content__name">${this.ingredientName}</div>
                <div class="ingredients-card__content__quantity ingredient-quantity-container">
                    <div class="ingredient-quantity-container__count">${this.ingredientQuantity}</div>
                    <div class="ingredient-quantity-container__measure">${this.quantityMeasure}</div>
                </div>
            </div>
        </div>
        `;
        return RecipeIngredientsCard;
    }
}
class RecipeInstructionsCard extends RecipeCard {
    instructionStepsNumber;
    instructionStepsText;

    constructor(id, image, name, instructionStepsNumber, instructionStepsText) {
        super(id, image, name);
        this.instructionStepsNumber = instructionStepsNumber;
        this.instructionStepsText = instructionStepsText;
    }
    displayRecipeInstructionsStepList() {
        let listOfInstructionSteps = '';
        listOfInstructionSteps = `
        <div class="instructions-container__steps steps">
            <ul class="steps__list">
                <li class="steps__list__step-number">Step ${this.instructionStepsNumber}</li>
                <li class="steps__list__step-content">${this.instructionStepsText}</li>
            </ul>
        </div>
        `;
        return listOfInstructionSteps;
    }

}

// Функции и запросы: поиск и отображение информации с названием, ингридиентами и пошаговой инструкцией при клике на кнопку View Recipe
// Функция для отображения карточек с рецептами по результатам поиска
function clearContent(elementToClear) {
    elementToClear.innerHTML = '';
}

function showSearchResult() {
    const searchString = globalSearchInput.value.trim().replace(/[ ,]+/g, ',');
    clearContent(containerOfRecipes);
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchString}&number=5&apiKey=${APIKey}`;
    fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(function (data) {
            if (searchString === '') {
                containerOfRecipes.classList.add('container-hidden');
            }
            else {
                containerOfRecipes.classList.remove('container-hidden');
                const recipeOptions = getOptions(this.value, data.results);
                if (recipeOptions.length === 0) { throw new SyntaxError("No recipe was found"); }
                recipeOptions.forEach(el => {
                    let foodCard = new RecipeCard(el.id, el.image, el.title);
                    containerOfRecipes.innerHTML += foodCard.displayRecipeCard(foodCard.id, foodCard.image, foodCard.title);
                });
                showAllInformationOfRecipe();
                saveFavoriteHandler();
            }
        })
        .catch(function (error) {
            let errorResult = '';
            errorResult = `
                <div class="container__result-error">
                <div class="error-message">${error.message}</div>
                </div>`;
            containerOfRecipes.innerHTML = errorResult;
        })
}

// Функция для отображение информации с названием, ингридиентами и пошаговой инструкцией при клике на кнопку View Recipe
function showAllInformationOfRecipe() {
    const recipeLinks = document.querySelectorAll('.recipe-card__image');
    recipeLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const recipeId = e.currentTarget.id;
            const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIKey}`;
            fetch(recipeUrl, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(function (data) {
                    if (data.analyzedInstructions.length===0) {
                        let recipeSource=data.sourceUrl;
                        window.document.location.href = `${recipeSource}`;
                    } 
                    localStorage.setItem('RecipeData', JSON.stringify(data));
                    window.document.location = 'recipe-info.html'; 
                })
        })
    });
}

function getOptions(word, recipes) {
    return recipes.filter(r => {
        const regex = new RegExp(word, 'gi');
        return r.title.match(regex);
    })
}

if (globalSearchInput) {
    globalSearchInput.addEventListener('change', showSearchResult(e => {
        e.preventDefault();
    }));
    globalSearchInput.addEventListener('keyup', showSearchResult);
}


//Кнопка для отображения рандомного рецепта

const randomRecipeContainer = document.querySelector('.container-random-recipe');
const randomButton = document.querySelector('.random-recipe__button');

if (randomButton)
    randomButton.addEventListener('click', displayRandomRecipe);

function displayRandomRecipe() {
    clearContent(randomRecipeContainer);
    const randomUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${APIKey}`;
    fetch(randomUrl, {
        method: "GET",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(function (data) {
            data.recipes.map(item => {
                let randomRecipeCard = new RecipeCard(item.id, item.image, item.title);
                return randomRecipeContainer.innerHTML += randomRecipeCard.displayRandomRecipeCard(randomRecipeCard.id, randomRecipeCard.image, randomRecipeCard.title);
            })
            const showRandomRecipeLink = document.querySelector('.recipe-card__image');
            showRandomRecipeLink.addEventListener('click', function (e) {
                e.preventDefault();
                const randomRecipeId = e.currentTarget.id;
                const randomRecipeIdUrl = `https://api.spoonacular.com/recipes/${randomRecipeId}/information?apiKey=${APIKey}`;
                fetch(randomRecipeIdUrl, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
                    .then(function (data) {
                        if (data.analyzedInstructions.length===0) {
                            let recipeSource=data.sourceUrl;
                            window.document.location.href = `${recipeSource}`;
                        } 
                        localStorage.setItem('RecipeData', JSON.stringify(data));
                        window.document.location = 'recipe-info.html';
                    })
                    
            })
        })
        .catch(function (error) {
            randomRecipeContainer.textContent = error.message;
        })
}


// Отображение рецепта на другой странице
function recipeInit() {
    const data = JSON.parse(localStorage.getItem('RecipeData')) //Z - используем JSON.parse, чтобы вытащить объект из стрингового значения
    let recipeDescription = new RecipeDescriptionCard(data.id, data.image, data.title, data.readyInMinutes, data.servings);
    containerOfRecipeDescription.innerHTML = recipeDescription.displayRecipeDescription(recipeDescription.id, recipeDescription.image, recipeDescription.title, recipeDescription.readyInMinutes, recipeDescription.servings);

    data.extendedIngredients.forEach(item => {
        let recipeIngredients = new RecipeIngredientsCard(item.id, item.image, item.title, item.originalName, item.amount, item.unit);
        containerOfIngredients.innerHTML+=recipeIngredients.displayRecipeIngredients(recipeIngredients.originalName, recipeIngredients.amount)
    });
    data.analyzedInstructions.forEach(item => {
        for (let step of item.steps) {
            let recipeInstructionSteps = new RecipeInstructionsCard(step.id, step.image, step.title, step.number, step.step);
            containerOfInstructionSteps.innerHTML+=recipeInstructionSteps.displayRecipeInstructionsStepList(recipeInstructionSteps.number, recipeInstructionSteps.step);
        }
    });
}

recipeInit();

const stars = document.querySelectorAll('.recipe-description-card__rating__star');

function setRating(recipeId, rating) {
    localStorage.setItem(`recipeRating_${recipeId}`, rating);
}

function getSavedRating(recipeId) {
    return localStorage.getItem(`recipeRating_${recipeId}`);
}

function setStarsActive(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function handleStarClick(event) {
    const clickedStar = event.currentTarget;
    const rating = Array.from(stars).indexOf(clickedStar) + 1;
    const recipeId = clickedStar.closest('.recipe-description-card__rating').dataset.recipeId;
    setRating(recipeId, rating);
    setStarsActive(stars, rating);
}

stars.forEach(star => {
    const recipeId = star.closest('.recipe-description-card__rating').dataset.recipeId;
    const savedRating = getSavedRating(recipeId);
    if (savedRating) {
        const rating = parseInt(savedRating);
        setStarsActive(stars, rating);
    }
    star.addEventListener('click', handleStarClick);
});

 function saveFavorite(event){ //ф-ия сохраняет данные в Local Storage

        let array;
        const like = event.target;
        like.classList.toggle('active');

        const name = like.getAttribute("data-name");
        const image = like.getAttribute("data-image");
        const id = like.getAttribute("data-id");

        // console.log('saveFavorite dataState', dataState);
        const obj = {id, name, image}
        console.log('saveFavorite obj', obj);
        const favorite = window.localStorage.getItem('favorite')
        
        if(favorite){          //проверка добавлен ли рецепт уже в ибранное
            array = JSON.parse(favorite)
    
            const ifTrue = array.some(item => item.id === obj.id);
            if(ifTrue) {
                array = array.filter(item => item.id !== obj.id)
            } else {
                array.push(obj)
            }
    
        } else {
            array = [obj];
        }
        window.localStorage.setItem('favorite', JSON.stringify(array))
    }
    function saveFavoriteHandler () {
        const buttons = document.querySelectorAll('.addToFavorit')
        buttons.forEach(button => {
            button.addEventListener("click",saveFavorite)
        })
    }
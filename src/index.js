const containerOfRecipes = document.querySelector('.recipes-container');
const globalSearchForm = document.querySelector('.search-form');
const globalSearchInput = document.querySelector('.general-search-input');
const containerOfRecipeDescription = document.querySelector('.recipe-description-container');
const containerOfIngredients = document.querySelector('.ingredients-container');
const containerOfInstructionSteps = document.querySelector('.instructions-container');
const APIKey = '365fbaeb365a41458545aa7ebd740c00';
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
        cardOfRecipe = `
        <div class="container__card recipe-card" id='${this.id}'>
            <div class="recipe-card__image"><img class="recipe-image" src="${this.image}" alt="recipeImage"></div>
            <div class="recipe-card__title">${this.name}</div>
        </div>`;
        return cardOfRecipe;
    }
    displayRandomRecipeCard() {
        let cardOfRecipe = '';
        cardOfRecipe = `
            <div class="container__card recipe-card" id='${this.id}'>
                <div class="recipe-card__image"><img class="recipe-image" src="${this.image}" alt="recipeImage"></div>
                <div class="recipe-card__title">${this.name}</div>
            </div>`;
        return cardOfRecipe;
    }
}
class RecipeDescriptionCard extends RecipeCard {
    readyTime;

    constructor(id, image, name, readyTime) {
        super(id, image, name);
        this.readyTime = readyTime;
    }
    displayRecipeDescription() {
        let RecipeDescriptionCard = '';
        RecipeDescriptionCard = `
    <div id=${this.id} class="recipe-description-container__description recipe-description-card">
            <div class="recipe-description-card__image"><img class="ingredients-recipe-image" src="${this.image}" alt="recipeImage"></div>
            <div class="recipe-description-card__title">${this.name}</div>
            <div class="recipe-description-card__time">${this.readyTime} min</div>
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
                <div class="ingredients-card__name">${this.ingredientName}</div>
                <div class="ingredients-card__count">${this.ingredientQuantity}</div>
                <div class="ingredients-card__measure">${this.quantityMeasure}</div>
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
                <li class="steps__list__step-number">${this.instructionStepsNumber}</li>
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
    const recipeLinks = document.querySelectorAll('.recipe-card');
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
            const showRandomRecipeLink = document.querySelector('.recipe-card');
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
    let recipeDescription = new RecipeDescriptionCard(data.id, data.image, data.title, data.readyInMinutes);
    containerOfRecipeDescription.innerHTML = recipeDescription.displayRecipeDescription(recipeDescription.id, recipeDescription.image, recipeDescription.title, recipeDescription.readyInMinutes);

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


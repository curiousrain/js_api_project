import recipeInfo from './recipe-info.html';

const containerOfRecipes=document.querySelector('.recipes-container');
const containerOfRecipeDescription=document.querySelector('.recipe-description-container');
const containerOfIngredients=document.querySelector('.ingredients-container');
const containerOfInstructionSteps=document.querySelector('.instructions-container');
const globalSearchForm=document.querySelector('.search-form');
const globalSearchInput=document.querySelector('.general-search-input');
const APIKey='aece9e5aa1324bfcba9e2f87fd6b9178';

// Создание разметки

function recipeCardLayout(id, image, name) {
let cardOfRecipe='';
cardOfRecipe=`
    <div class="container__card recipe-card" id='${id}'>
        <div class="recipe-card__image"><img class="recipe-image" src="${image}" alt="recipeImage"></div>
        <div class="recipe-card__title"><a href="${recipeInfo}"></a>${name}</div>
    </div>
`;
containerOfRecipes.innerHTML+=cardOfRecipe;
}

function RecipeDescriptionCardLayout(id, image, name, readyTime) {
    let RecipeDescriptionCard='';
    RecipeDescriptionCard=`
    <div id=${id} class="recipe-description-container__description recipe-description-card">
            <div class="recipe-description-card__image"><img class="ingredients-recipe-image" src="${image}" alt="recipeImage"></div>
            <div class="recipe-description-card__title">${name}</div>
            <div class="recipe-description-card__time">${readyTime} min</div>
        </div>
    `;
    containerOfRecipeDescription.innerHTML=RecipeDescriptionCard;
    }

function RecipeIngredientsCardLayout(ingredientName, ingredientQuantity, quantityMeasure) {
    let RecipeIngredientsCard='';
    RecipeIngredientsCard=`
    <div class="ingredients-container__ingredients ingredients-card">
            <div class="ingredients-card__name">${ingredientName}</div>
            <div class="ingredients-card__count">${ingredientQuantity}</div>
            <div class="ingredients-card__measure">${quantityMeasure}</div>
    </div>
    `;
    containerOfIngredients.innerHTML+=RecipeIngredientsCard;
    }

function RecipeInstructionsStepsLayout(instructionStepsNumber, instructionStepsText) {
    let listOfInstructionSteps='';
    listOfInstructionSteps=`
    <div class="instructions-container__steps steps">
        <ul class="steps__list">
            <li class="steps__list__step-number">${instructionStepsNumber}</li>
            <li class="steps__list__step-content">${instructionStepsText}</li>
        </ul>
    </div>
    `;
    containerOfInstructionSteps.innerHTML+=listOfInstructionSteps;
    }

// Классы для карточек с рецептами и их инструкций с описанием и ингридиентами
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
    displayRandomRecipeCard(){
        return randomRecipeCardLayout(this.id, this.image, this.name)
    }
}
class RecipeDescriptionCard extends RecipeCard{
    readyTime;

    constructor(id, image, name, readyTime){
        super(id, image, name);
        this.readyTime=readyTime;
    }
    displayRecipeDescription(){
        return RecipeDescriptionCardLayout(super.id, this.image, this.name, this.readyTime);
    }
}
class RecipeIngredientsCard extends RecipeCard{
    ingredientName;
    ingredientQuantity;
    quantityMeasure;

    constructor(id, image, name, ingredientName, ingredientQuantity, quantityMeasure){
        super(id, image, name);
        this.ingredientName=ingredientName;
        this.ingredientQuantity=ingredientQuantity;
        this.quantityMeasure=quantityMeasure;
    }
    displayRecipeIngredients(){
        return RecipeIngredientsCardLayout(this.ingredientName, this.ingredientQuantity, this.quantityMeasure);
    }
}
class RecipeInstructionsCard extends RecipeCard{
    instructionStepsNumber;
    instructionStepsText;

    constructor(id, image, name, instructionStepsNumber, instructionStepsText){
        super(id, image, name);
        this.instructionStepsNumber=instructionStepsNumber;
        this.instructionStepsText=instructionStepsText;
    }
    displayRecipeInstructionsStepList(){
        return RecipeInstructionsStepsLayout(this.instructionStepsNumber, this.instructionStepsText);
        }
    
}

// Функции и запросы: поиск и отображение информации с названием, ингридиентами и пошаговой инструкцией при клике на кнопку View Recipe

// Функция для отображения карточек с рецептами по результатам поиска
function clearContent(elementToClear) {
    elementToClear.innerHTML='';
}

function showSearchResult() {
    const searchString=globalSearchInput.value.trim().replace(/[ ,]+/g, ',');
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
    .then(function(data) {
        if (searchString==='') {
            containerOfRecipes.classList.add('container-hidden');
        }
        else{
            containerOfRecipes.classList.remove('container-hidden');
        const recipeOptions = getOptions(this.value, data.results);
        if (recipeOptions.length===0) {throw new SyntaxError("No recipe was found");} 
        recipeOptions.map(el => {
            let foodCard=new RecipeCard(el.id, el.image, el.title);
            return foodCard.displayRecipeCard(foodCard.id, foodCard.image, foodCard.title);
        });
        
        showAllInformationOfRecipe();
        }
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

// Функция для отображение информации с названием, ингридиентами и пошаговой инструкцией при клике на кнопку View Recipe
function showAllInformationOfRecipe(){
const recipeLinks = document.querySelectorAll('.recipe-card');
recipeLinks.forEach((link) => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const recipeId= e.currentTarget.id;
        const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIKey}`;
        fetch(recipeUrl, {
            headers: {
                "Content-Type": "application/json"
                }
        })
        .then(response => response.json())
        .then(function(data) {
                let recipeDescription=new RecipeDescriptionCard(data.id, data.image, data.title, data.readyInMinutes);
                recipeDescription.displayRecipeDescription(recipeDescription.id, recipeDescription.image, recipeDescription.title, recipeDescription.readyInMinutes);
            
            data.extendedIngredients.forEach(item => {
                let recipeIngredients=new RecipeIngredientsCard(item.id, item.image, item.title, item.originalName, item.amount, item.unit);
                recipeIngredients.displayRecipeIngredients(recipeIngredients.originalName, recipeIngredients.amount )
            });
            data.analyzedInstructions.forEach(item => {
                for (let step of item.steps) {
                    let recipeInstructionSteps=new RecipeInstructionsCard(step.id, step.image, step.title, step.number, step.step);
                recipeInstructionSteps.displayRecipeInstructionsStepList(recipeInstructionSteps.number, recipeInstructionSteps.step);
                }
            });
        })
    })
});

}

function getOptions(word, recipes) {
    return recipes.filter(r => {
        const regex= new RegExp(word, 'gi');
        return r.title.match(regex);
    })
    }

globalSearchInput.addEventListener('change', showSearchResult(e => {
    e.preventDefault();
}));
globalSearchInput.addEventListener('keyup',  showSearchResult);



////////////////////////////////////////////////////////////////////////////////////////////////
//Кнопка для отображения рандомного рецепта

const randomRecipeContainer=document.querySelector('.container-random-recipe');
const randomButton=document.querySelector('.random-recipe__button');


function randomRecipeCardLayout(id, image, name) {
    let cardOfRecipe='';
    cardOfRecipe=`
    <div class="container__card recipe-card" id='${id}'>
        <div class="recipe-card__image"><img class="recipe-image" src="${image}" alt="recipeImage"></div>
        <div class="recipe-card__title">${name}</div>
    </div>
    `;
    randomRecipeContainer.innerHTML+=cardOfRecipe;
    }

randomButton.addEventListener('click', displayRandomRecipe);

function displayRandomRecipe(){
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
    .then(function(data) {
        data.recipes.map(item => {
            let randomRecipeCard=new RecipeCard(item.id, item.image, item.title);
            return randomRecipeCard.displayRandomRecipeCard(randomRecipeCard.id, randomRecipeCard.image, randomRecipeCard.title);
        })
        const showRandomRecipeLink=document.querySelector('.recipe-card');
        // Инструкция и описание пока отображается в том же диве, что и при поиске, так как пока не знаю, в каком контейнере будут описания в итоге
        showRandomRecipeLink.addEventListener('click', function(e) {
            e.preventDefault();
            const randomRecipeId= e.currentTarget.id;
            const randomRecipeIdUrl = `https://api.spoonacular.com/recipes/${randomRecipeId}/information?apiKey=${APIKey}`;
            fetch(randomRecipeIdUrl, {
                headers: {
                    "Content-Type": "application/json"
                    }
            })
            .then(response => response.json())
            .then(function(data) {
                showRandomRecipeAllInformation(data);
            })
        })    
    })
    .catch(function(error) {
        randomRecipeContainer.textContent=error.message;
    })
}

function showRandomRecipeAllInformation(data){
let recipeDescription=new RecipeDescriptionCard(data.id, data.image, data.title, data.readyInMinutes);
recipeDescription.displayRecipeDescription(recipeDescription.id, recipeDescription.image, recipeDescription.title, recipeDescription.readyInMinutes);

data.extendedIngredients.forEach(item => {
let recipeIngredients=new RecipeIngredientsCard(item.id, item.image, item.title, item.originalName, item.amount, item.unit);
recipeIngredients.displayRecipeIngredients(recipeIngredients.originalName, recipeIngredients.amount )
});
data.analyzedInstructions.forEach(item => {
for (let step of item.steps) {
    let recipeInstructionSteps=new RecipeInstructionsCard(step.id, step.image, step.title, step.number, step.step);
recipeInstructionSteps.displayRecipeInstructionsStepList(recipeInstructionSteps.number, recipeInstructionSteps.step);
}
});
}

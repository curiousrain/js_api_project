export class RecipeCard {
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

export class RecipeDescriptionCard extends RecipeCard {
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

 export class RecipeIngredientsCard extends RecipeCard {
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
export class RecipeInstructionsCard extends RecipeCard {
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
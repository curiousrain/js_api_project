const apiUrl = "https://api.spoonacular.com/";
const container = document.getElementById('container');
const recipeResult = document.getElementById('recipe-result');

async function searchByIngredients(ingredients) {
    const response = await fetch(${ apiUrl } / recipes / findByIngredients ? ${ ingredients } & number = 10 & limitLicense=true & ranking = 1 & ignorePantry=false & apiKey = 30099d303fac4ab0a08b3225e10e9123);
    const json = await response.json();
    return json;
}
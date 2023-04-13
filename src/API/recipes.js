const apiKey = "6b670efbd0ea4d829a41bdec3f7e5a0a";

const btn = document.querySelector('.button_for_search');
const ul = document.querySelector('.rec');
const li = document.querySelector('.recItem');
const img = document.querySelector('.recImg');
const h3 = document.querySelector('.recTitle');


function searchRecipes(param) { // метод который делает запрос на сервер с параметрами поиска

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }; 
    fetch (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${param}`, requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => console.log(error));
}

btn.addEventListener('click', () => {
    const input = document.querySelector('#search_input').value
    const cuisine = input ? `&cuisine=${input}`: ''
    searchRecipes(cuisine)
})

function addRecipes(array) {
    let ul = document.createElement('ul').appendChild(document.createElement('li'));
    ul.className = "rec";
    li.className = "recItem";
    li = document.appendChild(document.createElement("img"))
    li = document.appendChild(document.createElement("h3"))
    
    img.innerHTML = `<img src=Title:${a1.image} alt="" class="recImg">`
    h3.innerHTML = `<h3 class="recTitle">Recipes:${a1.title}</h3>`
    

}
const div = document.createElement('div');
    div.className='card';





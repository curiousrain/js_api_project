const apiKey = "6b670efbd0ea4d829a41bdec3f7e5a0a";

const btn = document.querySelector('.button_for_search');
const ul = document.querySelector('.rec');


function searchRecipes(param) { // метод который делает запрос на сервер с параметрами поиска

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }; 
    fetch (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${param}`, requestOptions)
    .then(response => response.json())
    .then(data => {
        addRecipes(data.results)
    })
    .catch(error => console.log(error));
}

btn.addEventListener('click', () => {  //кнопка поиска рецепта по кухне (#italian)
    const input = document.querySelector('#search_input').value
    const cuisine = input ? `&cuisine=${input}`: ''
    searchRecipes(cuisine)
})

function addRecipes(array) {    //отображение рецепта на странице
    array.forEach(element => {
        const li = document.createElement('li');
        li.className = "recItem";
        li.innerHTML = `
            <img src=${element.image} alt="" class="recImg"/>
            <h3 class="recTitle">${element.title}</h3>`
        ul.appendChild(li);
        const button = document.createElement('button')
        li.appendChild(button);
        button.innerText = 'Add to favorites'
        button.setAttribute("data-state", JSON.stringify(element));
        button.addEventListener('click', saveFavorite)
    });
}

const saveFavorite = (event) => { //ф-ия сохраняет данные в Local Storage
    let array;
    const dataState = event.target.getAttribute("data-state");

    const obj = JSON.parse(dataState)
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







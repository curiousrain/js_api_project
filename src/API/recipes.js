const apiKey = "6b670efbd0ea4d829a41bdec3f7e5a0a"

const btn = document.querySelector('.button_for_search')
const ul = document.querySelector('.rec')


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
    ul.appendChild(li);
}


// const input = document.querySelector('.input').value //получаем название кухни из инпута
// // const ingri = document.querySelector('.ingri').value
// const cuisine = input ? `&cuisine=${input}`: ''; //если название кухни заполнено, то создаем строку с клечом для поиска и передали то что было в инпуте
// const i = ingri? `&ingri=${ingri}`: '';
// const param = cuisine+i //все наши ключи собираем в одну строку
// const f = `&cuisine="italian"&`
// searchRecipes(cuisine) //передаем собранные значения как параметры функции
// searchRecipes("italian")

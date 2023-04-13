const a1 =  {
    id: 782585,
    title: "Cannellini Bean and Asparagus Salad with Mushrooms",
    image: "https://spoonacular.com/recipeImages/782585-312x231.jpg",
    imageType: "jpg"
    }
    const a2 = {
    id: 716426,
    title: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
    image: "https://spoonacular.com/recipeImages/716426-312x231.jpg",
    imageType: "jpg"
    }

const saveFavorite = (obj) => { //ф-ия сохраняет данные в Local Storage
    const favorite = window.localStorage.getItem('favorite')
    let array 
    if(favorite){
        array = JSON.parse(favorite)
        array.push(obj)
    } else {
        array = [obj];
    }
    window.localStorage.setItem('favorite', JSON.stringify(array))
}




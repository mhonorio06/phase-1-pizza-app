

const objUrl="http://localhost:3000/pizzas"
const pizzaCollection = document.querySelector("#pizza-collection")
const pizzaForm = document.querySelector(".pizza-form")
let pizzas = []

function getPizza(){
fetch(objUrl)
.then(resp => resp.json())
.then(json => {
    pizzas = json;
    renderPizzas()
})
}


function renderPizzas() {
    pizzaCollection.innerHTML = ' ';
    pizzas.forEach(renderPizza)
}
function renderPizza(pizza) {
    const card = document.createElement("div");
    card.classList.add('card')
    const likeButtonId = `like-button-${pizza.id}`
    const dislikeButtonId = `dislike-button-${pizza.id}`
    card.innerHTML = `
    
    <h4> ${pizza.name} </h4>
    <img src="${pizza.image}" id="image" onmouseover="bgImg()" onmouseout="normImg()"/>
    <br>
    <p>${pizza.likes}👍 ${pizza.dislikes}👎 Votes</p>
    <button class="like-btn" id="${likeButtonId}">Like</button>
    <button class="dislike-btn" id="${dislikeButtonId}">Dislike</button>
    `
    
    pizzaCollection.append(card);

    document.getElementById(dislikeButtonId).addEventListener("click", event => {
        dislikeEvent(pizza.id)
    })
    document.getElementById(likeButtonId).addEventListener("click", event => {
        likeEvent(pizza.id)
    })

}
function addNewPizza(event) {
    event.preventDefault()
    const form = event.target
    const newPizza = {
        name: form.name.value,
        image: form.image.value,
        likes: 0,
        dislikes: 0
    };
    form.reset()
    fetch(objUrl, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method:"POST",
        body: JSON.stringify(newPizza),
        })
        .then(resp => resp.json())
        .then(renderPizza)  
    }
    function bgImg() {
        let images = document.querySelectorAll("#image")
        images.forEach(image => {
            image.style.height = "350px";
            image.style.width = "350px";
        })  
    }
    function normImg() {
        let images = document.querySelectorAll("#image")
        images.forEach(image => {
            image.style.height = "200px";
            image.style.width = "200px";
        })
    }
    function likeEvent(event) {
        const pizza = pizzas.find(pizza => pizza.id === event)
        fetch(`${objUrl}/${event}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify({
            likes: pizza.likes + 1,
        })  
    })
    .then(resp => resp.json())
    .then(json => {
        pizza.likes = json.likes
        renderPizzas()
    })
}
function dislikeEvent(event){
    const pizza = pizzas.find(pizza => pizza.id === event)
    fetch(`${objUrl}/${event}`, {
        headers: {
             Accept: "application/json",   
            "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify({
            dislikes: pizza.dislikes + 1,
        })  
    })
    .then(resp => resp.json())
    .then(json => {
        pizza.dislikes = json.dislikes;
        renderPizzas()
    })
}
    
    pizzaForm.addEventListener("submit", addNewPizza)
    getPizza();



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// firebase settings
const appSettings = {
    databaseURL: "https://tasks-firebase-706aa-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shopping-list")

// app elements
const nav = document.getElementById("nav")
const main = document.getElementById("main")
const title = document.getElementById("title")
const shopSection = document.getElementById("shop-section")
const shopInput = document.getElementById("shop-input")
const shopList = document.getElementById("shopping-list")
const todoSection = document.getElementById("to-do-section")
const noteSection = document.getElementById("notes-section")

// ⬇️ EVENT LISTENERS ⬇️

nav.addEventListener("click", function(e) {
    const button = e.target.id
    buttonClick(button)
})

main.addEventListener("click", function(e) {
    const clicked = e.target.id

    if (clicked === "shop-btn") {
        addToCart()
    }
})

// ⬇️ EVENT HANDLERS ⬇️

function buttonClick(button) {
    if (button === "shop-btn") {
        renderSection("shop")
    }

    if (button === "to-do-btn") {
        renderSection("todo")
    }

    if (button === "notes-btn") {
        renderSection("note")
    }
}

function addToCart() {
    if (shopInput.value) {
        push(shoppingListInDB, shopInput.value)
    }
}

// ⬇️ RENDER APP ⬇️

function clearShoppingCart() {
    shopList.innerHTML = ""
}

function renderShoppingCart(items) {
    let itemsToRender = ""

    items.forEach(item => {
        itemsToRender += `<li id="${item[0]}">${item[1]}</li>`
    })

    clearShoppingCart()
    shopList.innerHTML = itemsToRender
}

function renderSection(section) {
    if (section === "shop") {
        title.innerText = "Shopping List"
        shopSection.classList.add("show-section")
        shopSection.classList.remove("hide-section")
        todoSection.classList.add("hide-section")
        todoSection.classList.remove("show-section")
        noteSection.classList.add("hide-section")
        noteSection.classList.remove("show-section")

        onValue(shoppingListInDB, function(snapshot) {
            let cartArray = Object.entries(snapshot.val())
            renderShoppingCart(cartArray)
        })
    }

    if (section === "todo") {
        title.innerText = "To Do List"
        todoSection.classList.add("show-section")
        todoSection.classList.remove("hide-section")
        shopSection.classList.add("hide-section")
        shopSection.classList.remove("show-section")
        noteSection.classList.add("hide-section")
        noteSection.classList.remove("show-section")
    }

    if (section === "note") {
        title.innerText = "Notes"
        noteSection.classList.add("show-section")
        noteSection.classList.remove("hide-section")
        todoSection.classList.add("hide-section")
        todoSection.classList.remove("show-section")
        shopSection.classList.add("hide-section")
        shopSection.classList.remove("show-section")
    }
}

renderSection("shop")
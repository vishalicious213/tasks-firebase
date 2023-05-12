import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
const shopInput = document.getElementById("cart-input")
const shopList = document.getElementById("shopping-list")
const todoSection = document.getElementById("to-do-section")
const noteSection = document.getElementById("notes-section")

let currentList = []

// ⬇️ HELPER FUNCTIONS ⬇️

// keep a current list of item names (to check for duplicates)
function updateCurrentList(list) {
    currentList = []
    list.forEach(item => currentList.push(item[1]))
}

// ⬇️ EVENT LISTENERS ⬇️

// listen for clicks on the navbar to load appropriate section
nav.addEventListener("click", function(e) {
    const button = e.target.id
    buttonClick(button)
})

// listen for clicks on main to act based on section button clicked
main.addEventListener("click", function(e) {
    const clicked = e.target.id

    // if shopping cart button clicked
    if (clicked === "cart-btn") {
        addToCart()
    }
})

// listen for double-clicks on items in shopping cart to remove them
shopList.addEventListener("dblclick", function(e) {
    removeFromCart(e.target.id)
})

// ⬇️ EVENT HANDLERS ⬇️

// load section that was clicked (shop, todo, notes)
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

// add item to shopping cart
function addToCart() {
    // check for duplicates
    if (currentList.find(item => item.toLowerCase() === shopInput.value.toLowerCase())) {
        shopInput.value = ""
        return
    }

    // add to cart if not duplicate
    if (shopInput.value) {
        push(shoppingListInDB, shopInput.value)
        shopInput.value = ""
    }
}

// remove item from shopping cart
function removeFromCart(item) {
    const itemToRemove = ref(database, `shopping-list/${item}`)
    remove(itemToRemove)
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
            if (snapshot.exists()) {
                let cartArray = Object.entries(snapshot.val())
                updateCurrentList(cartArray)
                renderShoppingCart(cartArray)
            } else {
                shopList.innerHTML = `<div id="cart-empty">Add an item to your cart</div>`
            }
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
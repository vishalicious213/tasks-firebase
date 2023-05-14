import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// firebase settings
const appSettings = {
    databaseURL: "https://tasks-firebase-706aa-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shopping-list")
const bulkListInDB = ref(database, "bulk-list")
const todoListInDB = ref(database, "todo-list")
const notesListInDB = ref(database, "notes-list")

// shopping list elements
const nav = document.getElementById("nav")
const main = document.getElementById("main")
const title = document.getElementById("title")
const shopSection = document.getElementById("shop-section")
const shopInput = document.getElementById("cart-input")
const shopList = document.getElementById("shopping-list")
const bulkList = document.getElementById("bulk-list")

// to do list elements
const todoSection = document.getElementById("to-do-section")
const todoList = document.getElementById("to-do-list")
const todoInput = document.getElementById("to-do-input")

// notes elements
const noteSection = document.getElementById("notes-section")
const noteList = document.getElementById("note-list")
const noteInput = document.getElementById("note-input")

let currentList = []
let currentBulkList = []

// ⬇️ HELPER FUNCTIONS ⬇️

// keep a current list of item names (to check for duplicates)
function updateCurrentList(type, items) {
    if (type === "shop") {
        currentList = []
        items.forEach(item => currentList.push(item[1]))
    }

    if (type === "bulk") {
        currentBulkList = []
        items.forEach(item => currentBulkList.push(item[1]))
    }
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
        addToCart(clicked)
    }

    // if bulk cart button clicked
    if (clicked === "bulk-btn") {
        addToCart(clicked)
    }

    // if to do list button clicked
    if (clicked === "to-do-list-btn") {
        addToTodoList()
    }

    // if note button clicked
    if (clicked === "note-btn") {
        addToNotesList()
    }
})

// listen for double-clicks on items in shopping cart to remove them
shopList.addEventListener("dblclick", function(e) {
    removeFromCart("shop", e.target.id)
})

// listen for double-clicks on items in bulk shopping cart to remove them
bulkList.addEventListener("dblclick", function(e) {
    removeFromCart("bulk", e.target.id)
})

// listen for double-clicks on items in todo list to remove them
todoList.addEventListener("dblclick", function(e) {
    removeFromTodoList(e.target.id)
})

// listen for double-clicks on items in notes list to remove them
noteList.addEventListener("dblclick", function(e) {
    removeFromNotesList(e.target.id)
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
function addToCart(type) {
    let list = ""
    let db = ""

    if (type === "cart-btn") {
        list = currentList
        db = shoppingListInDB
    }

    if (type === "bulk-btn") {
        list = currentBulkList
        db = bulkListInDB
    }

    // check for duplicates
    if (list.find(item => item.toLowerCase() === shopInput.value.toLowerCase())) {
        shopInput.value = ""
        return
    }

    // add to cart if not duplicate
    if (shopInput.value) {
        push(db, shopInput.value)
        shopInput.value = ""
    }
}

// remove item from shopping cart
function removeFromCart(type, item) {
    if (type === "shop") {
        const itemToRemove = ref(database, `shopping-list/${item}`)
        remove(itemToRemove)
    }

    if (type === "bulk") {
        const itemToRemove = ref(database, `bulk-list/${item}`)
        remove(itemToRemove)
    }
}

// add item to to-do list
function addToTodoList() {
    if (todoInput.value) {
        push(todoListInDB, todoInput.value)
        todoInput.value = ""
    }
}

// remove item from todo list
function removeFromTodoList(item) {
    const itemToRemove = ref(database, `todo-list/${item}`)
    remove(itemToRemove)
}

// add item to notes list
function addToNotesList() {
    if (noteInput.value) {
        push(notesListInDB, noteInput.value)
        noteInput.value = ""
    }
}

// remove item from notes list
function removeFromNotesList(item) {
    const itemToRemove = ref(database, `notes-list/${item}`)
    remove(itemToRemove)
}

// ⬇️ RENDER APP ⬇️

function clearShoppingCart() {
    shopList.innerHTML = ""
}

function clearBulkShoppingCart() {
    bulkList.innerHTML = ""
}

function renderShoppingCart(type, items) {
    let itemsToRender = ""

    items.forEach(item => {
        itemsToRender += `<li id="${item[0]}">${item[1]}</li>`
    })

    if (type === "shop") {
        clearShoppingCart()
        shopList.innerHTML = itemsToRender
    }

    if (type === "bulk") {
        clearBulkShoppingCart()
        bulkList.innerHTML = itemsToRender
    }
}

function renderTodoList(items) {
    let itemsToRender = ""

    items.forEach(item => {
        itemsToRender += `<li id="${item[0]}">${item[1]}</li>`
    })

    todoList.innerHTML = ""
    todoList.innerHTML = itemsToRender
}

function renderNotesList(items) {
    let itemsToRender = ""

    items.forEach(item => {
        itemsToRender += `<li id="${item[0]}">${item[1]}</li>`
    })

    noteList.innerHTML = ""
    noteList.innerHTML = itemsToRender
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
                updateCurrentList("shop", cartArray)
                renderShoppingCart("shop", cartArray)
            } else {
                shopList.innerHTML = `<div id="cart-empty">Add an item to your cart</div>`
            }
        })

        onValue(bulkListInDB, function(snapshot) {
            if (snapshot.exists()) {
                let bulkArray = Object.entries(snapshot.val())
                updateCurrentList("bulk", bulkArray)
                renderShoppingCart("bulk", bulkArray)
            } else {
                bulkList.innerHTML = `<div id="cart-empty">Add an item to your bulk cart</div>`
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

        onValue(todoListInDB, function(snapshot) {
            if (snapshot.exists()) {
                let todoItems = Object.entries(snapshot.val())
                renderTodoList(todoItems)
            } else {
                todoList.innerHTML = `<div id="todo-list-empty">Add a task to your list</div>`
            }
        })
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

    onValue(notesListInDB, function(snapshot) {
        if (snapshot.exists()) {
            let noteItems = Object.entries(snapshot.val())
            renderNotesList(noteItems)
        } else {
            noteList.innerHTML = `<div id="note-list-empty">Add a note</div>`
        }
    })
}

renderSection("note")
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

// ⬇️ EVENT LISTENERS ⬇️

nav.addEventListener("click", function(e) {
    const button = e.target.id
    buttonClick(button)
})

// ⬇️ EVENT HANDLERS ⬇️

function buttonClick(button) {
    if (button === "shop-btn") {
        renderShopping()
    }

    if (button === "to-do-btn") {
        renderToDoList()
    }

    if (button === "notes-btn") {
        renderNotes()
    }
}

// ⬇️ RENDER APP ⬇️

function clearMain() {
    main.innerHTML = ""
}

function renderShopping() {
    title.innerText = "Shopping List"
    clearMain()
}

function renderToDoList() {
    title.innerText = "To Do List"
    clearMain()
}

function renderNotes() {
    title.innerText = "Notes"
    clearMain()
}

// renderShopping()
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

function renderShopping() {
    title.innerText = "Shopping List"
}

function renderToDoList() {
    title.innerText = "To Do List"
}

function renderNotes() {
    title.innerText = "Notes"
}
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
        console.log("Shopping")
    }

    if (button === "to-do-btn") {
        console.log("To Do List")
    }

    if (button === "notes-btn") {
        console.log("Notes")
    }
}

// ⬇️ RENDER APP ⬇️
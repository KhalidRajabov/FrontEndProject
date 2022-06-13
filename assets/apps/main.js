// all categories düyməsinə click edərkən yaranan drop menyu

$(document).ready(function () {
    let btnCategory = document.getElementById("h-drop-down")
    $("#h-categories").click(function () {
        btnCategory.classList.toggle("hide")
    })
})
$(document).ready(function () {
    let btnCategory = document.getElementById("h-drop-down")
    let shop = document.getElementById("shop-drop")
    let shopDiv = document.getElementById("shop-div")
    let homedown = document.getElementById("home-down")
    let homedrop = document.getElementById("home-drop")
    $("#h-categories").click(function(){
        btnCategory.classList.toggle("hide")
    })
    shop.onmouseover=function(){
        shopDiv.classList.remove("hide")
        shopDiv.classList.add("unhide")
    }
    shopDiv.onmouseleave=function(){
        shopDiv.classList.add("hide")
        shopDiv.classList.remove("unhide")
    }
    // homedown.onmouseover=function(){
    //     homedrop.classList.remove("hide")
    // }
    // homedrop.onmouseleave=function(){
    //     homedrop.classList.add("hide")
    // }
})
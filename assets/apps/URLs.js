
$(document).ready(function () {


    $("#shop-drop").click(_=>{window.location="shop.html"})
    $("#home-down").click(_=>{window.location="index.html"})
    $("#blog-list").click(_=>{window.location="blogs.html"})
    $("#contact-list").click(_=>{window.location="contact.html"})
    $("#account").click(_=>{window.location="login&register.html"})
    $("#profile").click(_=>{window.location="login&register.html"})
 
    let blogs = document.querySelectorAll("#gotoblog")
    blogs.forEach((event)=>{
        event.addEventListener("click", ()=>{
            window.location="blogs.html"
        })
    })



})

$(document).ready(function () {


    //divlərin və düymələrin onclick`ində səhifə dəyişmək


    $("#shop-drop").click(_ => { window.location = "shop.html" })
    $("#home-down").click(_ => { window.location = "index.html" })
    $("#blog-list").click(_ => { window.location = "blogs.html" })
    $("#contact-list").click(_ => { window.location = "contact.html" })
    $("#account").click(_ => { window.location = "login&register.html" })
    $("#profile").click(_ => { window.location = "login&register.html" })
    $(".header-basket").click(_ => { window.location = "cart(basket).html" })
    $(".logo").click(_ => { window.location = "index.html" })


    let blogs = document.querySelectorAll("#gotoblog")
    blogs.forEach((event) => {
        event.addEventListener("click", () => {
            window.location = "blogs.html"
        })
    })



})
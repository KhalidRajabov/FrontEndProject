let cardBtn = document.querySelectorAll(`.card-button`)
let productCount = document.getElementById("product-count")
let basketPrice = document.getElementById("basket-worth")
let basketNotify = document.getElementById("basket-notifier")
let basketAlert = document.getElementById("new-item")
let newItemsHere = document.getElementById("added-baskets")
let emptyBasket = document.getElementById("empty-this")
let emptyText = document.getElementById("empty-text")
let buttons = document.getElementById("buttons")
let subtotaldrop = document.getElementById("subtotal-drop")
window.onload = function () {
    writeProductCount();
    let currentLS = JSON.parse(localStorage.getItem("basket"))
    if (localStorage.getItem("basket") != null) {
        emptyBasket.classList.add("d-none")
        emptyText.classList.add("d-none")
        currentLS.forEach(function (product) {
            newItemsHere.innerHTML += `<div id="for-new-item" class="basket-row">
            <img src="${product.imageURL}"  alt="">
            <div class="pro-details">
              <span id="pro-name" >${product.name}</span>
              <div>
                <span id="pro-count">${product.count} </span> <span style="color: red;"> x </span> <span id="pro-price"> $${product.price}</span>
              </div>
            </div>
          </div>
          `
            subtotaldrop.innerHTML = `<span style="color: #c2c2d3;"><b>Subtotal</b></span> 
            <span style="color:rgb(230, 0, 35);"><b id="total-sub-drop">${basketPrice.innerText}</b></span>`
            buttons.innerHTML = `<button id="drop-down-buttons" class="btns view">View Cart</button>
            <button id="drop-down-button" class="btns checkout">Checkout</button>`
            buttons.onclick = function_ => {
                window.location = "cart(basket).html"
            }
            newItemsHere.onclick = _ => {
                window.location = "cart(basket).html"
            }
        })
    }
    else if (localStorage.getItem("basket") == null) {
        emptyBasket.classList.remove("d-none")
        emptyText.classList.remove("d-none")
    }
};

cardBtn.forEach((addBtn) => {
    addBtn.addEventListener("click", function () {
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]))
        }
        let arr = JSON.parse(localStorage.getItem("basket"))
        let productId = this.parentElement.parentElement.getAttribute("data-id")
        let itemName = this.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText
        let existProduct = arr.find(p => p.id == productId)
        if (existProduct == undefined) {
            arr.push({
                id: productId,
                price: this.parentElement.previousElementSibling.lastElementChild.firstElementChild.innerText,
                imageURL: this.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.getAttribute("src"),
                name: itemName,
                count: 1
            })
            let item = arr.find(p => p.id == productId)
            newItemsHere.innerHTML += `<div id="for-new-item" class="basket-row">
            <img src="${item.imageURL}"  alt="">
            <div class="pro-details">
              <span id="pro-name" >${item.name}</span>
              <div>
                <span id="pro-count">${item.count} </span> <span style="color: red;"> x </span> <span id="pro-price"> $${item.price}</span>
              </div>
            </div>
          </div>
          `
        }
        else {
            existProduct.count++;
        }
        let currentLS = JSON.parse(localStorage.getItem("basket"))

        emptyBasket.classList.add("d-none")
        emptyText.classList.add("d-none")
        currentLS.forEach(function (product) {
            
            subtotaldrop.innerHTML = `<span style="color: #c2c2d3;"><b>Subtotal</b></span> 
            <span style="color:rgb(230, 0, 35);"><b id="total-sub-drop">${basketPrice.innerText}</b></span>`
            buttons.innerHTML = `<button class="btns view">View Cart</button>
            <button class="btns checkout">Checkout</button>`
            buttons.onclick = function_ => {
                window.location = "cart(basket).html"
            }
            newItemsHere.onclick = _ => {
                window.location = "cart(basket).html"
            }
        })

        localStorage.setItem("basket", JSON.stringify(arr))
        writeProductCount()
        showBasketNotification(itemName)
        

    })
})

function writeProductCount() {
    if (localStorage.getItem("basket") != null) {
        let arr = JSON.parse(localStorage.getItem("basket"))
        let totalPrice = 0;
        arr.map(product => { totalPrice += product.price * product.count })
        basketPrice.innerText = parseFloat(totalPrice).toFixed(2)
        let totalProducts = 0;
        arr.map(product => { totalProducts += product.count })
        productCount.innerText = totalProducts
    }
}
function showBasketNotification(itemName) {
    basketNotify.classList.add("temporary-div")
    basketAlert.innerText = itemName
    basketNotify.onclick = function () {
        window.location = "cart(basket).html"
    }

}
function hideBasketNotification() {
    basketNotify.classList.remove("temporary-div")
}
setInterval(hideBasketNotification, 4000)

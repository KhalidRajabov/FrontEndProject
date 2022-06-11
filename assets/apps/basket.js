let cardBtn = document.querySelectorAll(`.card-button`)
let productCount = document.getElementById("product-count")
let basketPrice = document.getElementById("basket-worth")
let basketNotify = document.getElementById("basket-notifier")
let basketAlert = document.getElementById("new-item")
let newItemsHere = document.getElementById("added-baskets")
let emptyBasket = document.getElementById("empty-this")
let emptyText = document.getElementById("empty-text")
window.onload = function () {
    writeProductCount();
    let currentLS=JSON.parse(localStorage.getItem("basket"))
    if(localStorage.getItem("basket") != null){
        emptyBasket.classList.add("d-none")
        emptyText.classList.add("d-none")
        currentLS.forEach(function (product){
            newItemsHere.innerHTML+=`<div id="for-new-item" class="basket-row">
            <img src="${product.imageURL}"  alt="">
            <div class="pro-details">
              <span id="pro-name" >${product.name}</span>
              <div>
                <span id="pro-count">${product.count } </span> <span style="color: red;"> x </span> <span id="pro-price"> $${product.price}</span>
              </div>
            </div>
          </div>
          `

          newItemsHere.onclick= _=>{
            window.location="cart(basket).html"
          }
        })
    }
    else if (localStorage.getItem("basket") == null){
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
        }
        else {
            existProduct.count++;
        }
        
        localStorage.setItem("basket", JSON.stringify(arr))
        writeProductCount()
        showBasketNotification(itemName)
        // newProduct = `
        // <img src="${existProduct.imageURL}"  alt="">
        //         <div class="pro-details">
        //           <span id="pro-name" >${existProduct.name}</span>
        //           <div>
        //             <span id="pro-count">${existProduct.count}</span> <span> x $</span> <span id="pro-price">${existProduct.price}</span>
        //           </div>
        //         </div>
        // `
        //newItemsHere.innerHTML+= newProduct
        
    })
})

function writeProductCount() {
    if (localStorage.getItem("basket") != null) {
        let arr = JSON.parse(localStorage.getItem("basket"))
        let totalProducts = 0;
        let totalPrice = 0;
        arr.map(product => { totalPrice += product.price * product.count })
        arr.map(product => { totalProducts += product.count })
        productCount.innerText = totalProducts
        basketPrice.innerText = parseFloat(totalPrice).toFixed(2)
    }
}
function showBasketNotification(itemName) {
    basketNotify.classList.add("temporary-div")
    basketAlert.innerText = itemName
    basketNotify.onclick=function(){
        window.location="cart(basket).html"
    }
    
}
function hideBasketNotification() {
    basketNotify.classList.remove("temporary-div")
}
setInterval(hideBasketNotification, 4000)

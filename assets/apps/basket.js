let cardBtn = document.querySelectorAll(`.card-button`)
let productCount = document.getElementById("product-count")
let basketPrice = document.getElementById("basket-worth")
let basketNotify = document.getElementById("basket-notifier")
let basketAlert = document.getElementById("new-item")
window.onload = function () {
    writeProductCount();
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
        console.log(arr);
    })
})

function writeProductCount() {
    if (localStorage.getItem("basket") != null) {
        let arr = JSON.parse(localStorage.getItem("basket"))
        let totalProducts = 0;
        let totalPrice = 0;
        arr.map(product => { totalProducts += product.count })
        arr.map(product => { totalPrice += parseFloat(product.price * product.count) })
        productCount.innerText = totalProducts
        basketPrice.innerText = totalPrice
    }
}
function showBasketNotification(itemName) {
    basketNotify.classList.add("temporary-div")
    basketAlert.innerText = itemName
}
function hideBasketNotification() {
    basketNotify.classList.remove("temporary-div")
}
setInterval(hideBasketNotification, 6000)
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
    // səhifə hər yenilənəndə səbətə əlavə olunmuş məhsulların ümumi sayını
    // qiymətini yazdırır.
    writeProductCount();
    let currentLS = JSON.parse(localStorage.getItem("basket"))

    if (localStorage.getItem("basket") != null) {

        // əgər səbətdə nəsə varsa onda onda boş olarkən gələn drop menyusunun içindəki 
        // elementləri gizlədir. 
        emptyBasket.classList.add("d-none")
        emptyText.classList.add("d-none")

        // səbətdəki bütün məhsulların ad, şəkil, sayı və qiymətini
        //  hər dəfə yeni div elementi yaradaraq divin içinə atır
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

            //   məhsulların ümumi qiymətini yazdırır
            subtotaldrop.innerHTML = `<span style="color: #c2c2d3;"><b>Subtotal</b></span> 
            <span style="color:rgb(230, 0, 35);"><b id="total-sub-drop">${basketPrice.innerText}</b></span>`

            // iki ədəd düymə yaradır, ikisinin də işi kart səhifəsinə getməkdi.
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

        // əgər basket boşdursa vəheçnə yoxdusa onda məhsullar olan divləri gizlədir
        // boş olarkən görünən elementləri göstərir
        emptyBasket.classList.remove("d-none")
        emptyText.classList.remove("d-none")
    }
};


cardBtn.forEach((addBtn) => {
    addBtn.addEventListener("click", function () {
        // hər məhsulun add düyməsinə basanda yoxlayır ki bu məhsul səbət var ya yox
        // və ümumiyyətlə səbət var ya yox
        if (localStorage.getItem("basket") == null) {
            // əgər yoxdusa səbət yaradır
            localStorage.setItem("basket", JSON.stringify([]))
        }

        // səbətdə məhsul varsa (yox idisə yuxarıda yaranıb) obyekt arrayına çevirir
        let arr = JSON.parse(localStorage.getItem("basket"))

        // kartın data-id`sini istifadə edərək arrayda (səbətdə) olub olmamasını yoxlayır
        let productId = this.parentElement.parentElement.getAttribute("data-id")

        // qısa olsun deyə məhsul adını bir vairable`ə yazır
        let itemName = this.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText
        let existProduct = arr.find(p => p.id == productId)
        if (existProduct == undefined) {

            // əgər yox idisə kartdakı məlumatları istifadə edərək arrayə əlavə edir
            arr.push({
                id: productId,
                price: this.parentElement.previousElementSibling.lastElementChild.firstElementChild.innerText,
                imageURL: this.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.getAttribute("src"),
                name: itemName,
                count: 1
            })
            let item = arr.find(p => p.id == productId)

            // arraydakı məhsulları tapıb drop olan menyuya əlavə edir
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
            // əgər məhsul add düyməsinə basılanda səbətdə var idisə onda sayı artır
            existProduct.count++;
        }
        let currentLS = JSON.parse(localStorage.getItem("basket"))

        // səbətdə məhsul olmayanda drop menyuda görünən elementləri gizlədir ki mövcud elementlər görünsün.
        emptyBasket.classList.add("d-none")
        emptyText.classList.add("d-none")
        currentLS.forEach(function (product) {

            // hər məhsulu drop olan menyuya əlavə edir.

            subtotaldrop.innerHTML = `<span style="color: #c2c2d3;"><b>Subtotal</b></span> 
            <span style="color:rgb(230, 0, 35);"><b id="total-sub-drop">${basketPrice.innerText}</b></span>`
            buttons.innerHTML = `<button class="btns view">View Cart</button>
            <button class="btns checkout">Checkout</button>`

            // yaranan düymələrə click olunanda kart səhifəsinə getsin
            buttons.onclick = function_ => {
                window.location = "cart(basket).html"
            }
            newItemsHere.onclick = _ => {
                window.location = "cart(basket).html"
            }
        })


        // local storage`ə səbətdəki elementlərin sayını yazır.

        localStorage.setItem("basket", JSON.stringify(arr))
        writeProductCount()

        // hər dəfə yeni məhsul əlavə olunanda sağ aşağıda bildiriş çıxır.
        showBasketNotification(itemName)


    })
})



// mövcud məhsul sayını və ümumi qiymətini dropmenyunun üstündəki yerə yazır
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


// məhsul əlavə olunarkən yaşıl rəngdə bildiriş çıxır
function showBasketNotification(itemName) {
    basketNotify.classList.add("temporary-div")
    basketAlert.innerText = itemName
    basketNotify.onclick = function () {
        window.location = "cart(basket).html"
    }

}


// bildirişi 6 saniyədən sonra silir
function hideBasketNotification() {
    basketNotify.classList.remove("temporary-div")
}
setInterval(hideBasketNotification, 6000)

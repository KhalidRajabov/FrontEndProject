let cardBtn = document.querySelectorAll(`.card-button`)
let productCount = document.getElementById("product-count")
let basketPrice= document.getElementById("basket-worth")
let bigMinus = document.getElementById("minus-btn")
let bigPlus = document.getElementById("plus-btn")
let bigCounter = document.getElementById("big-pr-counter")
let countData = bigCounter.innerText
window.onload = function() {
writeProductCount();
  };

cardBtn.forEach((addBtn) =>{
    addBtn.addEventListener("click", function(){
       if (localStorage.getItem("basket")==null) {
           localStorage.setItem("basket", JSON.stringify([]))
       }
       let arr = JSON.parse(localStorage.getItem("basket"))
       let productId = this.parentElement.parentElement.getAttribute("data-id")
       let existProduct = arr.find(p=>p.id==productId)
       if (existProduct==undefined) {
            arr.push({
                id: productId,
                price: this.parentElement.previousElementSibling.lastElementChild.firstElementChild.innerText,
                imageURL: this.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.getAttribute("src"),
                name: this.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                count: 1
            })
       }
       else{
          existProduct.count++;
       }
       localStorage.setItem("basket", JSON.stringify(arr))
       writeProductCount()
       console.log(arr);
   })
})


function writeProductCount(){
    if (localStorage.getItem("basket")!=null) {
        let arr = JSON.parse(localStorage.getItem("basket"))
        let totalProducts = 0;
        let totalPrice= 0;
         arr.map(product=>{totalProducts+=product.count})
         arr.map(product=>{totalPrice+=parseFloat(product.price * product.count)})
        productCount.innerText=totalProducts
        basketPrice.innerText=totalPrice
    }
}
bigMinus.onclick=function(){
    if (countData!=1) {
        countData--
        bigCounter.innerText=countData
    }
}
bigPlus.onclick=function(){
    countData++
    bigCounter.innerText=countData
}
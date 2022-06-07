let cardBtn = document.querySelectorAll(`.card-button`)

let arr= [];

if (localStorage.getItem("basket")==null) {
    
}

cardBtn.forEach((addBtn) =>{
   addBtn.addEventListener("click", function(){
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
       console.log(arr);
   })
})
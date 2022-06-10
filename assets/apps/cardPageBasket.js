let basket = document.getElementById("my-basket")
let sumTotalPrice = 0;
window.addEventListener('load', (event) => {

    if (localStorage.getItem("basket") == null) {
        basket.innerHTML = `<div class="icon-div"><i class="fa-solid fa-basket-shopping"></i></div>
         <span class="empty">YOUR CART IS CURRENTLY EMPTY</span>
         <button class="return">Return to shop</button>`
    }
    else {
        basket.innerHTML = `<table class="table table-white" id="table">
<thead>
  <tr>
    <th scope="col"></th>
    <th scope="col">Product</th>
    <th scope="col">Price</th>
    <th scope="col">Quantity</th>
    <th scope="col">Subtotal</th>
    <th scope="col"></th>
  </tr>
</thead>
<tbody id="tbody">

  
</tbody>
</table>`
        let arr = JSON.parse(localStorage.getItem("basket"))
        arr.forEach(product => {
            if (product.count > 0) {

                let table = document.getElementById("tbody")
                let tr = document.createElement("tr")
                let tdImage = document.createElement("td")
                let image = document.createElement("img")
                image.src = product.imageURL
                image.style.width = "100px"
                tdImage.append(image)

                let plusicon =`<i id="plus-btn" class="btn-icons fa-solid fa-plus"></i>`
                let minusicon =  `<i id="minus-btn" class="btn-icons fa-solid fa-minus"></i>`

                let tdName = document.createElement("td")
                tdName.innerText = product.name
                let tdPrice = document.createElement("td")
                tdPrice.innerText = product.price + "$"
                let tdCount = document.createElement("td")
                tdCount.innerHTML =minusicon+ product.count + plusicon;


                let SubTd = document.createElement("td")
                let spantag = `<span class="span" style="cursor: pointer; color: red; font-size: 150%" id="span">x</span>`
                let deleteTd = document.createElement("td")
                deleteTd.innerHTML = spantag
                SubTd.innerHTML = (product.count * product.price).toFixed(2) + "$";
                tr.append(tdImage, tdName, tdPrice, tdCount, SubTd, deleteTd)
                table.append(tr)
                
                let plus =document.getElementById("plus-btn")
                plus.onclick=function(){
                    product.count++;
                    alert("dad")
                    localStorage.setItem("basket", JSON.stringify(arr));
                }
                let minus =document.getElementById("minus-btn")
                minus.onclick=function(){
                    product.count--;
                    
                    localStorage.setItem("basket", JSON.stringify(arr));
                }
                deleteTd.onclick = function () {
                    this.parentElement.remove()
                    product.count = 0
                    localStorage.setItem("basket", JSON.stringify(arr));
                    location.reload()

                }
            }


        });
    }
});

let basket = document.getElementById("my-basket");
let sumTotalPrice = 0;
window.addEventListener("load", event => {
  let newbasket = JSON.parse(localStorage.getItem("basket"));
  if (localStorage.getItem("basket") == null) {
    basket.innerHTML = `<div class="icon-div"><i class="fa-solid fa-basket-shopping"></i></div>
        <span class="empty">YOUR CART IS CURRENTLY EMPTY</span>
        <button id="return" class="return">Return to shop</button>`;

    let returnBtn = document.getElementById("return");
    returnBtn.onclick = function() {
      window.location = "index.html";
    };
  } else {
    basket.innerHTML = `<div id="table&checkout" class="my-row">
    <table class="table table-white" id="table">
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
       </table>

       <div class="total-process-card">
        <h6>CART TOTALS</h6>
        <div class="subtotal">
          <span class="total-card"><b>Subtotal</b></span>
          <span id="total-basket-worth-card" class="total-basket-worth-card"></span>
        </div>
        <div class="radio-group d-flex flex-row justify-content-between align-items-center">
          <span><b>Shipping</b></span>
          <form action="">
            <label for="age1">Flat rate <span class="text-danger">$5.00</span></label>
            <input style="margin: 15px 0;" type="radio" id="age1" name="age" value="5.00"> <br>
            <label for="age2">Free shipping</label>
            <input style="margin: 15px 0;" type="radio" id="age2" name="age" value="60"><br>
            <label for="age3">Local pickup</label>
            <input style="margin: 15px 0;" type="radio" id="age3" name="age" value="100"><br>
            <span style="margin: 15px 0;">Shipping to <b>AL</b></span> <br>
            <a style="margin: 15px 0; text-decoration: none;"  href="">Change address</a>
          </form>
        </div>
        <div class="total-everything">
          <span><b>Total</b></span>
          <span id="total-everything">$50</span>
        </div>
        <button>Proceed to checkout</button>
       </div>
  </div>`;
    let arr = JSON.parse(localStorage.getItem("basket"));
    arr.forEach(product => {
      if (product.count > 0) {
        let table = document.getElementById("tbody");
        let tr = document.createElement("tr");
        let tdImage = document.createElement("td");
        let image = document.createElement("img");
        image.src = product.imageURL;
        image.style.width = "100px";
        tdImage.append(image);

        let tdName = document.createElement("td");
        tdName.innerText = product.name;
        let tdPrice = document.createElement("td");
        tdPrice.innerText = product.price + "$";
        let tdCount = document.createElement("td");
        let plus = document.createElement("button");
        plus.innerText = "+";
        let minus = document.createElement("button");
        minus.innerText = "-";
        plus.classList.add("table-buttons");
        minus.classList.add("table-buttons");
        spanthing = document.createElement("span");
        spanthing.innerText = product.count;
        tdCount.prepend(minus);
        tdCount.append(spanthing);
        tdCount.append(plus);

        let SubTd = document.createElement("td");
        let spantag = `<span class="span" style="cursor: pointer; color: red; font-size: 150%" id="span">x</span>`;
        let deleteTd = document.createElement("td");
        deleteTd.innerHTML = spantag;
        let intoCardTotal = document.getElementById("total-basket-worth-card")
        let totalOfCart = document.getElementById("total-everything")
        let just = JSON.parse(localStorage.getItem("basket"))
        let totalPrice = 0;
        just.map(product => { totalPrice += product.price * product.count })
        totalOfCart.innerHTML="$"+ totalPrice.toFixed(2)
        intoCardTotal.innerHTML="$"+ totalPrice.toFixed(2)
        SubTd.innerHTML = (product.count * product.price).toFixed(2) + "$";
        tr.append(tdImage, tdName, tdPrice, tdCount, SubTd, deleteTd);
        table.append(tr);
        
        let shippingCost = document.getElementById("age1")
        let freeShipping = document.getElementById("age2")
        let localPickup = document.getElementById("age3")
        shippingCost.onclick=function(){
          totalOfCart.innerHTML="$"+ (totalPrice+5.00).toFixed(2)
          freeShipping.onclick=function(){
              totalOfCart.innerHTML="$"+ totalPrice.toFixed(2)
          }
          localPickup.onclick=function(){
              totalOfCart.innerHTML="$"+ totalPrice.toFixed(2)
          }
        }
        plus.onclick = function() {
          product.count++;
          tdCount.innerHTML = `${product.count}`;
          tdCount.prepend(minus);
          tdCount.append(plus);
          SubTd.innerHTML = (product.count * product.price).toFixed(2) + "$";
          localStorage.setItem("basket", JSON.stringify(arr));
          window.location.reload();
        };
        minus.onclick = function() {
          product.count--;
          if (product.count > 0) {
            tdCount.innerHTML = `${product.count}`;
            tdCount.prepend(minus);
            tdCount.append(plus);
            SubTd.innerHTML = (product.count * product.price).toFixed(2) + "$";
          }
          let zero = arr.filter(element => element.count > 0);
          let newArr = [...zero];
          arr = newArr;
          if (arr.length == 0) {
            localStorage.removeItem("basket");
          } else {
            localStorage.setItem("basket", JSON.stringify(arr));
          }
          window.location.reload();
        };
        deleteTd.onclick = function() {
          this.parentElement.remove();
          product.count = 0;
          localStorage.setItem("basket", JSON.stringify(arr));
          location.reload();
          localStorage.removeItem(this.parentElement);
          let zero = arr.filter(element => element.count > 0);
          let newArr = [...zero];
          arr = newArr;
          if (arr.length == 0) {
            localStorage.removeItem("basket");
          } else {
            localStorage.setItem("basket", JSON.stringify(arr));
          }
        };
      }
    });
  }
});

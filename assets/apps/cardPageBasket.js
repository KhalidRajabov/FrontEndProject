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
</table>`;
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
        SubTd.innerHTML = (product.count * product.price).toFixed(2) + "$";
        tr.append(tdImage, tdName, tdPrice, tdCount, SubTd, deleteTd);
        table.append(tr);

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

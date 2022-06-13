let basket = document.getElementById("my-basket");
let sumTotalPrice = 0;
window.addEventListener("load", event => {

  // windows yüklənəndə basketin olub olmaması yoxlanılır
  // əgər boşdusa boş olmasını göstərən səhifə açılır.
  if (localStorage.getItem("basket") == null) {
    basket.innerHTML = `<div class="icon-div"><i class="fa-solid fa-basket-shopping"></i></div>
        <span class="empty">YOUR CART IS CURRENTLY EMPTY</span>
        <button id="return" class="return">Return to shop</button>`;

    let returnBtn = document.getElementById("return");
    returnBtn.onclick = function () {
      window.location = "index.html";
    };
  }

  // səbətdə nəsə vars cədvəl və ümumi hesabı aparan kart yaranır.
  else {
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

    // local storagedəki basketi obyekt arrayına çevirib içindəki məlumatları
    // cədvələ yeni tr yaradaraq əlavə edir
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
        tdName.classList.add("td-name")
        tdName.innerText = product.name;
        let tdPrice = document.createElement("td");
        tdPrice.innerText = product.price + "$";
        let tdCount = document.createElement("td");
        // məhsulun sayı olan td`ə pilus və minus düymələrini əlavə edir
        let plus = document.createElement("button");
        plus.innerHTML = `<i class="fa-solid fa-plus"></i>`;
        let minus = document.createElement("button");
        minus.innerHTML = `<i class="fa-solid fa-minus"></i>`;
        plus.classList.add("table-buttons");
        minus.classList.add("table-buttons");
        // düymələri birbaşa atanda error verdiyi üçün bir element yaradıb
        // əvvəl düymələri sonra məhsul sayını içinə atdığı spanı td`ə əlavə edir
        spanthing = document.createElement("span");
        spanthing.classList.add("spanthing")
        spanthing.innerText = product.count;
        tdCount.prepend(minus);
        tdCount.append(spanthing);
        tdCount.append(plus);

        let SubTd = document.createElement("td");
        let spantag = `<span class="span" style="cursor: pointer; color: red; font-size: 150%" id="span">x</span>`;

        // məhsulu bütöv silmək düyməsi
        let deleteTd = document.createElement("td");
        deleteTd.innerHTML = spantag;

        // basketdəki bütün məhsulların dəyərini kartda gödtərən element.
        let intoCardTotal = document.getElementById("total-basket-worth-card")


        // basketlə shippingin ümumi qiymətini göstərən element
        let totalOfCart = document.getElementById("total-everything")
        let just = JSON.parse(localStorage.getItem("basket"))


        // basketin ümumi qiymətini yuxarıdakı elementlərə yazdırmaq
        // və nöqtədən sonra 2 ədəd göstərməsi üçün .toFixed(2) yazır 
        let totalPrice = 0;
        just.map(product => { totalPrice += product.price * product.count })
        totalOfCart.innerHTML = "$" + totalPrice.toFixed(2)
        intoCardTotal.innerHTML = "$" + totalPrice.toFixed(2)


        // table`da bir məhsulun ümüumi qiyməti

        SubTd.innerHTML = (product.count * product.price).toFixed(2) + "$";


        // tr elementini table boyd`ə atmaq
        tr.append(tdImage, tdName, tdPrice, tdCount, SubTd, deleteTd);
        table.append(tr);

        // shipping və freeshipping qiymətlərinin ümumi dəyərə əlavə olunması

        let shippingCost = document.getElementById("age1")
        let freeShipping = document.getElementById("age2")
        let localPickup = document.getElementById("age3")

        // shipping seçilən radio inputun onclikcində digər radiolar da
        // yazılır ki geri çəkəndə səhv (köhnə qiyməti) hesablamasın
        shippingCost.onclick = function () {
          // shipping seçilsə sondakı dəyərə 5 dollar əlavə etmək
          totalOfCart.innerHTML = "$" + (totalPrice + 5.00).toFixed(2)
          freeShipping.onclick = function () {
            // shipping seçilməsə həmin 5 dolları silmək
            totalOfCart.innerHTML = "$" + totalPrice.toFixed(2)
          }
          localPickup.onclick = function () {
            // shipping seçilməsə həmin 5 dolları silmək
            totalOfCart.innerHTML = "$" + totalPrice.toFixed(2)
          }
        }


        // table`dakı pilus düyməsi
        plus.onclick = function () {

          // məhsulun sayını 1 vahid artırır
          product.count++;
          let shippingCost = document.getElementById("age1")

          // hər dəfə düyməyə basılanda shipping seçilən radionu resetləyir
          // əgər reset olmasa artırmazdan əvvəl hansı qiymət vardısa həmin qiymətdə qalır
          shippingCost.checked = false;


          // count td`sinə pilus minus düymələri və məhsulun hazırkı sayı yazılır
          tdCount.innerHTML = `${product.count}`;
          tdCount.prepend(minus);
          tdCount.append(plus);

          // bir məhsulun (sayına görə) dəyərini subtotal table`a yazdırır
          SubTd.innerHTML = (product.count * product.price).toFixed(2) + "$";
          let totalPrice = 0;
          arr.map(product => { totalPrice += product.price * product.count })



          // və yenidən shipping`i üçün hesablaması üçün funskiya yazılır
          shippingCost.onclick = function () {
            totalOfCart.innerHTML = "$" + (totalPrice + 5.00).toFixed(2)
            freeShipping.onclick = function () {
              totalOfCart.innerHTML = "$" + totalPrice.toFixed(2)
            }
            localPickup.onclick = function () {
              totalOfCart.innerHTML = "$" + totalPrice.toFixed(2)
            }
          }


          // drop down olan basketə basketin dəyərini və məhsul sayını, 
          // kartdakı ümumi və shipping`lə olan qiymətə
          // ümumi qiymətləri yazdırır

          intoCardTotal.innerText = `$` + totalPrice.toFixed(2)
          basketPrice.innerText = parseFloat(totalPrice).toFixed(2)
          let totalOfCart = document.getElementById("total-everything")
          totalOfCart.innerText = `$` + totalPrice.toFixed(2)
          let totalProducts = 0;
          arr.map(product => { totalProducts += product.count })
          productCount.innerText = totalProducts
          localStorage.setItem("basket", JSON.stringify(arr));

        };
        minus.onclick = function () {
          // məhsulu bir vahid azaldır
          product.count--;

          // shipping`i resetləyib yenidən shipping funskiyasını yazır
          let shippingCost = document.getElementById("age1")
          shippingCost.checked = false;
          shippingCost.onclick = function () {
            totalOfCart.innerHTML = "$" + (totalPrice + 5.00).toFixed(2)
            freeShipping.onclick = function () {
              totalOfCart.innerHTML = "$" + totalPrice.toFixed(2)
            }
            localPickup.onclick = function () {
              totalOfCart.innerHTML = "$" + totalPrice.toFixed(2)
            }
          }
          if (product.count > 0) {

            // məhsul sayı 0`dan böyük olduğu halda azaltma əməliyyatının
            //davam etməsi üçün   düymələri və məhsul sayını yerində saxlayır
            tdCount.innerHTML = `${product.count}`;
            tdCount.prepend(minus);
            tdCount.append(plus);
            SubTd.innerHTML = (product.count * product.price).toFixed(2) + "$";
          }
          else {
            // əgər məhsul sayı 0  olarsa məhsulun   table rovunu silir
            tr.remove()
          }

          // count sayı 0dan böyük olan yəni mövcud olan məhsulları
          // yeni bir arraya salır
          let zero = arr.filter(element => element.count > 0);
          let newArr = [...zero];

          // basketdəki məhsulların sayını, dəyərini drop down olan basketə,
          // kartdakı qiymət yerlərinə yazır.
          let totalProducts = 0;
          newArr.map(product => { totalProducts += product.count })
          productCount.innerText = totalProducts
          let totalPrice = 0;
          newArr.map(product => { totalPrice += product.price * product.count })
          intoCardTotal.innerText = `$` + totalPrice.toFixed(2)
          basketPrice.innerText = parseFloat(totalPrice).toFixed(2)
          let totalOfCart = document.getElementById("total-everything")
          totalOfCart.innerText = `$` + totalPrice.toFixed(2)

          // sayı 0dan böyük olan yəni var olan məhsulların arrayını dəyişir, ama vacib deyil.
          // adı istifadə etmək rahat olsun deyə belə yazır
          arr = newArr;
          if (arr.length == 0) {

            // əgər səbətdə heç bir məhsul yoxdursa səbəti silir və kart
            // səhifəsinə kartın boş olması səhifəsini yazdırır
            localStorage.removeItem("basket");
            basket.innerHTML = `<div class="icon-div"><i class="fa-solid fa-basket-shopping"></i></div>
            <span class="empty">YOUR CART IS CURRENTLY EMPTY</span>
            <button id="return" class="return">Return to shop</button>`

            // return düyməsinı basanda home səhifəsinı gedir
            let returnBtn = document.getElementById("return");
            returnBtn.onclick = function () {
              window.location = "index.html";
            }

            // drop olan basketdəki düymələri silir
            let basketButton1 = document.getElementById("drop-down-buttons")
            let basketButton2 = document.getElementById("drop-down-button")
            subtotaldrop.classList.add("d-none")

            basketButton1.classList.add("d-none")
            basketButton2.classList.add("d-none")

            // drop olan basketdəki (olmayan) məhsulların görünüşünü gizlədir
            newItemsHere.classList.add("d-none")

            // drop olan menyuda məhsul olmadıqda olmamasını göstərən elementləri göstərir 
            emptyBasket.classList.remove("d-none")
            emptyText.classList.remove("d-none")
          } else {
            // əgər minus basıldıqda səbətdə məhsul varsa onu localstorage`ə save edir.

            localStorage.setItem("basket", JSON.stringify(arr));
          }

        };
        deleteTd.onclick = function () {
          // məshul sayını 0 edir
          product.count = 0;


          // shipping funskiyası
          let shippingCost = document.getElementById("age1")
          shippingCost.checked = false;
          this.parentElement.remove();
          shippingCost.onclick = function () {
            totalOfCart.innerHTML = "$" + (totalPrice + 5.00).toFixed(2)
            freeShipping.onclick = function () {
              totalOfCart.innerHTML = "$" + totalPrice.toFixed(2)
            }
            localPickup.onclick = function () {
              totalOfCart.innerHTML = "$" + totalPrice.toFixed(2)
            }
          }
          // localstorage`ə məhsulun 0 olmasını qeyd edir və onun
          // parenti olan obyekti (məhsulun özünü) silir 
          localStorage.setItem("basket", JSON.stringify(arr));
          localStorage.removeItem(this.parentElement);

          // sayı 0dan böyük olan (mövcud olan) məhsulların yeni arraya salınması
          let zero = arr.filter(element => element.count > 0);
          let newArr = [...zero];

          // basketdəki məhsulların sayını, dəyərini drop down olan basketə,
          // kartdakı qiymət yerlərinə yazır.
          let totalPrice = 0;
          newArr.map(product => { totalPrice += product.price * product.count })
          let totalProducts = 0;
          newArr.map(product => { totalProducts += product.count })
          productCount.innerText = totalProducts
          intoCardTotal.innerText = `$` + totalPrice.toFixed(2)
          let totalOfCart = document.getElementById("total-everything")
          totalOfCart.innerText = `$` + totalPrice.toFixed(2)
          basketPrice.innerText = parseFloat(totalPrice).toFixed(2)
          arr = newArr;
          if (arr.length == 0) {
            // əgər səbətdə heç bir məhsul yoxdursa səbəti silir və kart
            // səhifəsinə kartın boş olması səhifəsini yazdırır


            localStorage.removeItem("basket");
            basket.innerHTML = `<div class="icon-div"><i class="fa-solid fa-basket-shopping"></i></div>
        <span class="empty">YOUR CART IS CURRENTLY EMPTY</span>
        <button id="return" class="return">Return to shop</button>`;

            // return düyməsinı basanda home səhifəsinı gedir
            let returnBtn = document.getElementById("return");
            returnBtn.onclick = function () {
              window.location = "index.html";
            }
          } else {

            //local storage`ə hazırkı məhsulları yazdırır
            localStorage.setItem("basket", JSON.stringify(arr));
          }
        };
      }
    });
  }
});




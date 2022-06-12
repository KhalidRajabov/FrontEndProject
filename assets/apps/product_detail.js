$(document).ready(function () {


    let bigMinus = document.getElementById("minus-btn")
    let bigPlus = document.getElementById("plus-btn")
    let bigCounter = document.getElementById("big-pr-counter")
    let countData = bigCounter.innerText
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
    
    
          $('.product-image').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.others'
          });
          $('.others').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.product-image',
            dots: false,
            centerMode: true,
            focusOnSelect: true
          });
})

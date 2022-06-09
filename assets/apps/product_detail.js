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
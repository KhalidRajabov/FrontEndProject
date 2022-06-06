$(document).ready(function () {
    let count = 0;
    $(document).on("click", ".sliderright", function(){
        if (count<1) {            
            count++;
            $(".images").animate({
                "margin-left":`-${count*100}%`
            })
        }
        else{
            count=0;
            $(".images").animate({
                "margin-left":`-${count*100}%`
            })
        }
    })
    $(document).on("click", ".sliderleft", function(){
        if (count>0) {            
            count--;
            $(".images").animate({
                "margin-left":`-${count*100}%`
            })
        }
        else{
            count=1;
            $(".images").animate({
                "margin-left":`-${count*100}%`
            })
        }
    })

    let days = document.getElementById("days")
    let hours = document.getElementById("hours")
    let minutes = document.getElementById("minutes")
    let seconds = document.getElementById("seconds")
    let currentYear = new Date().getFullYear();

    let endTime = new Date (`June 16 ${currentYear} 00:00:00`)

    function updateCountdownTime(){
        let currentTime = new Date();
        let diff = endTime-currentTime
        let day = Math.floor(diff/1000/60/60/24)
        let hour = Math.floor(diff/1000/60/60)%24;
        let min = Math.floor(diff/1000/60)%60;
        let sec = Math.floor(diff/1000)%60;
        days.innerHTML=day<10 ? `0` + day:day
        hours.innerHTML=hour<10 ? `0` + hour:hour
        minutes.innerHTML=min<10 ? `0` + min:min
        seconds.innerHTML=sec<10 ? `0` + sec:sec
    }
    setInterval(updateCountdownTime,1000)


    let container = [...document.querySelectorAll(`.product-container`)]
    let next = [...document.querySelectorAll(`.right-btn`)]
    let left = [...document.querySelectorAll(`.left-btn`)]
    container.forEach((item, i) =>{
        let cdim = item.getBoundingClientRect();
        let cwidth = cdim.width;
        next[i].addEventListener("click",()=>{
            item.scrollLeft+=cwidth;
        })
        left[i].addEventListener("click",()=>{
            item.scrollLeft-=cwidth;
        })
    })
})
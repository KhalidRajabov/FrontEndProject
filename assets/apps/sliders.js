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


})
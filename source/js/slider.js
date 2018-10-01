var sliderWrap = document.querySelector(".slider-wrap-js");
var sliderList = document.querySelector(".education__slider-list");
var sliderItems = document.querySelectorAll(".education__slider-item");
var sliderItem = sliderItems[1];

var sliderButtonPrev = document.querySelector(".button-prev");
var sliderButtonNext = document.querySelector(".button-next");

var countSlidesItem = sliderItems.length;
var allWidthTransform = 0;
var transformPersent,
    maxWidthTransform,
    posStartX,
    posEndX;

var getWidth = function (){
    let sliderStyle = getComputedStyle(sliderItem);
    let sliderMarginLeftRaw = sliderStyle.marginLeft;
    let sliderMarginLeft = Number(sliderMarginLeftRaw.substring(0, sliderMarginLeftRaw.length - 2));
    let sliderWidth = sliderItem.offsetWidth;
    let sliderListWidth = sliderList.offsetWidth;

    transformPersent = Math.round(((sliderWidth + sliderMarginLeft)/sliderListWidth)*100);
    maxWidthTransform = transformPersent * countSlidesItem;

    return transformPersent, maxWidthTransform;

};

var nextSlide = function(){

    if (allWidthTransform === 0) {
        allWidthTransform += transformPersent;
        sliderList.style.transform = "translateX(-" + allWidthTransform + "%)";
    }
    else if (allWidthTransform === (maxWidthTransform - transformPersent)) {
        allWidthTransform = 0;
        sliderList.style.transform = "translateX(0%)";
    }
    else {
        allWidthTransform += transformPersent;
        sliderList.style.transform = "translateX(-" + allWidthTransform + "%)";
    }
};

var prevSlide = function(){

    if (allWidthTransform === 0) {
        allWidthTransform = (maxWidthTransform - transformPersent);
        sliderList.style.transform = "translateX(-" + allWidthTransform + "%)";
    }
    else {
        allWidthTransform -= transformPersent;
        sliderList.style.transform = "translateX(-" + allWidthTransform + "%)";
    }
};




//touch
// function touchMoveSlides (){
//     var posStartX;
//     var posEndX;
//     sliderWrap.addEventListener("touchstart", function(e){
//         clearInterval(slideInterval);
//         e = e || window.event;
//         posStartX = e.changedTouches[0].clientX;
//     });
//
//     sliderWrap.addEventListener("touchend", function(e){
//         e = e || window.event;
//         posEndX = e.changedTouches[0].clientX;
//
//         if(posStartX < posEndX){
//             nextSlide();
//         }
//         else if(posStartX > posEndX){
//             prevSlide();
//         }
//     });
// };

function __init__ () {
    getWidth();

    window.addEventListener('resize', function(event){
        getWidth();
    });

    var slideInterval = setInterval(nextSlide, 3000);

    sliderWrap.addEventListener("mouseenter", function(e){
        e.preventDefault();
        clearInterval(slideInterval);
    });
    //
    sliderWrap.addEventListener("mouseleave", function(e){
        e.preventDefault();
        slideInterval = setInterval(nextSlide, 3000);
    });

    sliderButtonNext.addEventListener("click", nextSlide);
    sliderButtonPrev.addEventListener("click", prevSlide);


    //touch
    sliderWrap.addEventListener("touchstart", function(e){
        clearInterval(slideInterval);
        e = e || window.event;
        posStartX = e.changedTouches[0].clientX;
    });

    sliderWrap.addEventListener("touchend", function(e){
        e = e || window.event;
        posEndX = e.changedTouches[0].clientX;

        if(posStartX < posEndX){
            prevSlide();
        }
        else if(posStartX > posEndX){
            nextSlide();
        }
    });

};

__init__();

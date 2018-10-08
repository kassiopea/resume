
// var linkImg = document.querySelectorAll(".certificates__link-img");
// var Img = document.querySelectorAll(".certificates__img");
// var popup = document.querySelector(".popup__images-wrap");
// var popupOverlay = document.querySelector(".popup-overlay");
// var popupButtonClose = document.querySelector(".popup__button");
// var retina = window.devicePixelRatio;
// var srcImg,
//     endSrcImg;
//
// switch(retina) {
//   case 2:
//     endSrcImg = "@2x.jpg";
//     break
//
//   case 3:
//     endSrcImg = "@3x.jpg";
//     break
//
//   default:
//     endSrcImg = ".jpg";
//     break
// }
//
// function getFullSrc(beginSrcImg) {
//     if (window.matchMedia("max-width: 767px)").matches) {
//         srcImg = Img.src;
//     }
//     else {
//         srcImg = beginSrcImg + endSrcImg;
//     }
//     return srcImg;
// }
//
// function createHtmlImg (srcImg) {
//     var imgHtml = document.createElement('img');
//     imgHtml.src = srcImg;
//     // imgHtml.className = "popup__img-closed";
//     popup.classList.remove("close");
//     popupOverlay.classList.remove("close");
//     body.classList.add("body__menu-opened");
//     popupButtonClose.classList.remove("close");
//     popup.insertBefore(imgHtml, popup.firstChild);
//     popupButtonClose.classList.add("popup__img-close");
//     imgHtml.classList.remove("popup__img-closed");
//     imgHtml.classList.add("popup__img");
//
// }
//
// function addClick () {
//     for(let i = 0; i < linkImg.length; i++) {
//         linkImg[i].addEventListener("click", function(e){
//             e.preventDefault();
//             let hrefLink = linkImg[i].href;
//             let beginSrcImg = hrefLink.substring(0, hrefLink.length - 9);
//             createHtmlImg(getFullSrc(beginSrcImg));
//
//         });
//     };
// }
//
// var __init__ = function () {
//     addClick();
// };
//
// __init__ ();

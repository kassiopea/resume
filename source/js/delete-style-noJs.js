'use strict';
//если срабатывает js, то убрать предустановленные размеры svg inline в разметке
var elementsSvg = document.getElementsByTagName('svg');

for (let i = 0; i < elementsSvg.length; i++) {
   elementsSvg[i].removeAttribute("style");
}
// убираем стили без js для слайдера и добавляем классы и стили для слайдера js
var sliderSectionJs = document.querySelector(".education__slider-wrap");
var sliderListJs = document.querySelector(".education__list");
var sliderItemJs = document.querySelectorAll(".education__list-item");
var sliderButtons = document.querySelectorAll(".slide-button");

sliderSectionJs.classList.add("slider-wrap-js");
sliderListJs.classList.add("education__slider-list");
sliderListJs.classList.remove("education__list");
for (let i=0; i < sliderItemJs.length; i++){
    sliderItemJs[i].classList.add("education__slider-item");
    sliderItemJs[i].classList.remove("education__list-item");
}
for (let i = 0; i < sliderButtons.length; i++) {
    sliderButtons[i].classList.remove("close");
}

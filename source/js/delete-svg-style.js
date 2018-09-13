'use strict';
//если срабатывает js, то убрать предустановленные размеры svg inline в разметке
var elementsSvg = document.getElementsByTagName('svg');

for (let i = 0; i < elementsSvg.length; i++) {
   elementsSvg[i].removeAttribute("style");
}

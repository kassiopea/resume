//body
var body = document.getElementsByTagName("body")[0];
//кнопка бургер меню
var menuLink = document.querySelector(".header__button-nav");
//меню
var menu = document.querySelector(".header__nav");
//попап для изображений
var popup = document.querySelector(".popup__images-wrap");
//темный фон над body и под меню
var popupOverlay = document.querySelector(".popup-overlay");
//ссылка на сертификат
var certificatesLinks = document.querySelectorAll(".certificates__link-img");
//картинка сертификат
var Img = document.querySelectorAll(".certificates__img");
//кнопка закрыть всплывающее окно
var buttonClosePopup = document.querySelector(".popup__button");
//экран ретина
var retina = window.devicePixelRatio;
//путь к фото и разрешение (ритина или нет)
var srcImg,
    endSrcImg;

var esc_keycode = 27;


//определение разрешения картинки
switch(retina) {
  case 2:
    endSrcImg = "@2x.jpg";
    break

  case 3:
    endSrcImg = "@3x.jpg";
    break

  default:
    endSrcImg = ".jpg";
    break
}

//функция закрытия по esc
var pressEscPopup = function(e){
    if(e.keyCode === esc_keycode) {
        if(menu.classList.contains("nav-view")){
            closeMenu();
        }
        else if(!popup.classList.contains("close")){
            closeCertificatesPopup();
        }
    }
};
//функция открытия меню
var openMenu = function () {
    menuLink.classList.add("nav-close");
    menuLink.classList.remove("nav-open");
    menu.classList.add("nav-view");
    body.classList.add("body__menu-opened");
    popupOverlay.classList.remove("close");

    document.addEventListener("keydown", pressEscPopup);
};

//функция закрытия меню
var closeMenu = function () {
    menuLink.classList.remove("nav-close");
    menuLink.classList.add("nav-open");
    menu.classList.remove("nav-view");
    body.classList.remove("body__menu-opened");
    popupOverlay.classList.add("close");

    document.removeEventListener("keydown", pressEscPopup);
};

//функция открытия всплывающего окна
var openCertificatesPopup = function () {
    popup.classList.remove("close");
    body.classList.add("body__menu-opened");
    popupOverlay.classList.remove("close");
    popupOverlay.classList.add("popup-overlay-img");
    popup.firstChild.classList.remove("popup__img-closed");
    popup.firstChild.classList.add("popup__img");

    document.addEventListener("keydown", pressEscPopup);
}
//функция закрытия всплывающего окна
var closeCertificatesPopup = function () {
    popup.firstChild.classList.remove("popup__img");
    popupOverlay.classList.add("popup-overlay-img");
    body.classList.remove("body__menu-opened");
    popup.classList.add("close");
    popupOverlay.classList.add("close");

    document.removeEventListener("keydown", pressEscPopup);
    popup.removeChild(popup.firstChild);
}

//создание и добавление блока с изображением
function getHtmlElement(imgSrc){
    var imgHtml = document.createElement('img');
    imgHtml.src = imgSrc;
    imgHtml.className = "popup__img-closed";
    popup.insertBefore(imgHtml, popup.firstChild);
}

//функция нахождения пути для картинки, отображенной во всплывающем окне
function getFirstUrlElem (elem){

    if (window.matchMedia("max-width: 767px)").matches) {
            srcImg = Img.src;
        }
        else {
            let hrefLink = elem.href;
            let beginSrcImg = hrefLink.substring(0, hrefLink.length - 9);
            srcImg = beginSrcImg + endSrcImg;
        }
        return srcImg;
}
//прослушка клика по кнопке бургер меню
menuLink.addEventListener ("click", function(e){
    e.preventDefault();
    //кнопка бургер меню открыть
    var menuLinkOpen = document.querySelector(".nav-open");
    //кнопка бургер меню закрыть
    var menuLinkClose = document.querySelector(".nav-close");
    if(menuLinkOpen){
        openMenu();
    }else if (menuLinkClose) {
        closeMenu();
    }
});

//прослушка клика вне popup
popupOverlay.addEventListener ("click", function(e){
    e.preventDefault();
    if(menu.classList.contains("nav-view")){
        closeMenu();
    }
    else if(!popup.classList.contains("close")) {
        closeCertificatesPopup();
    }

});

//прослушка клика по ссылке на сертификат
for(let i = 0; i < certificatesLinks.length; i++) {
    certificatesLinks[i].addEventListener("click", function(e){
        e.preventDefault();

        getHtmlElement(getFirstUrlElem(this));
        openCertificatesPopup();
    });
}

//прослушка клика по кнопке закрыть всплывающее окно
buttonClosePopup.addEventListener("click", function(e){
    e.preventDefault();
    closeCertificatesPopup();
});

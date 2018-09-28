//body
var body = document.getElementsByTagName("body")[0];
//кнопка бургер меню
var menuLink = document.querySelector(".header__button-nav");
//меню
var menu = document.querySelector(".header__nav");
//темный фон над body и под меню
var popupOverlay = document.querySelector(".popup-overlay");

var esc_keycode = 27;

//функция закрытия меню через кнопку esc
var pressEscPopup = function(e){
    if(e.keyCode === esc_keycode) {
        closeMenu();
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

//прослушка клика вне области меню и/или кнопки бургер меню
popupOverlay.addEventListener ("click", function(e){
    e.preventDefault();
    closeMenu();
});

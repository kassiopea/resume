var body = document.getElementsByTagName("body")[0];
var menuLink = document.querySelector(".header__button-nav");
var menu = document.querySelector(".header__nav");
var popupOverlay = document.querySelector(".popup-overlay");

function toggleMenu() {
    menu.classList.toggle("nav-view");
    menuLink.classList.toggle("nav-close");
    body.classList.toggle("body__menu-opened");
    popupOverlay.classList.toggle("close");
}

function closeMenu() {
    menu.classList.remove("nav-view");
    menuLink.classList.remove("nav-close");
    body.classList.remove("body__menu-opened");
    popupOverlay.classList.add("close");
}

menuLink.addEventListener ("click", function(e){
    e.preventDefault();
    toggleMenu();
});

popupOverlay.addEventListener ("click", function(e){
    e.preventDefault();
    closeMenu();
});

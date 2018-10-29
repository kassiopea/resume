//все ссылки для котороых необходима плавная прокрутка
var linkNav = document.querySelectorAll(".scroll-smooth");
// скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
var V = 0.3;
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) {
        e.preventDefault();
        //исходная координата, местоположение
        var startPoint = window.pageYOffset;

        //id элемента, к которому нужно перейти
        var hash = this.href.replace(/[^#]*(.*)/, '$1');

        //отступ от верхней границы элемента с нужным айди относительно видимого окна
        var indentFromTopToElem = document.querySelector(hash).getBoundingClientRect().top;

        var start = null;
        // подробнее про функцию анимации [developer.mozilla.org]
        requestAnimationFrame(step);
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (indentFromTopToElem < 0 ? Math.max(startPoint - progress/V, startPoint + indentFromTopToElem) : Math.min(startPoint + progress/V, startPoint + indentFromTopToElem));
            window.scrollTo(0,r);
            if (r != startPoint + indentFromTopToElem) {
                requestAnimationFrame(step);
            } else {
                location.hash = hash; // URL с хэшем
            }
        }
    }, false);
}

//блок с элементами аккордеона
var wrapCheckbox = document.querySelector(".skills__wrap-checkbox");
//все чекбоксы внутри блока обертки
var checkboxs = wrapCheckbox.getElementsByTagName("input");
//все описания под заголовками с чекбоксами
var checkboxsDescriptions = wrapCheckbox.querySelectorAll(".skills__wrap-description");


//прослушка для всех чекбоксов
for (let i = 0; i < checkboxs.length; i++){
    let checkbox = checkboxs[i];
    let description = checkboxsDescriptions[i];
    checkbox.addEventListener("change", function(){
        if (checkbox.checked){
            description.classList.remove("close");
        }
        else{
            description.classList.add("close");
        };

    });
};

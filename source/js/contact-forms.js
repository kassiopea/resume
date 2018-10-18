//форма
var contactsForm = document.querySelector(".contacts__feedbackform");
//кнопка отправки формы
var submitForm = document.querySelector(".contacts__button");
//поле имя
var userNameInput = document.querySelector("#username");
//поле мейл
var emailInput = document.querySelector("#email");
//поле сообщение
var messageInput = document.querySelector("#message");
//массив из всех полей ввода и кнопки
var allInputElem = [userNameInput, emailInput, messageInput];
//массив из названий всех полей для ввода
var fields = ["userNameInput", "emailInput", "messageInput"];
//класс и текст для ошибки
var textErrors = {
    "userNameInput": ["name-error", "Поле имя должно содержать не менее 2 символов"],
    "emailInput": ["email-error", "поле email должно быть в формате example@mail.com"],
    "messageInput": ["message-error", "поле сообщение должно содержать не менее 2 символов и не более 5000"]
}
//переменная для определения, прошла ли валидация
var validationTrue;
//функция для предотвращения ввода после нажатия на кнопку отправить
function fieldsAndButtonDisabled(){
    for(let i = 0; i < allInputElem.length; i++){
        allInputElem[i].disabled = true;
    }
    submitForm.disabled = true;
}
//function enable forms fields and button submit
function fieldsAndButtonEnable() {
    for(let i = 0; i < allInputElem.length; i++){
        allInputElem[i].disabled = false;
    }
    submitForm.disabled = false;
}
//функция создания элементов с сообщением об ошибки
// function createElementError (arrOfClasses) {
//     for(let i = 0; i < arrOfClasses.length; i++){
//         var newElement = document.createElement('span');
//         var className = arrOfClasses[i];
//         var refElement = window[className];
//
//         // newElement.className = "close--error " + textErrors[className][0];
//         newElement.className = "close--error";
//         newElement.innerHTML = textErrors[className][1];
//
//         refElement.parentNode.insertBefore(newElement, refElement.nextSibling);
//     }
// }

function createElementError (inputEmpty) {

        var newElement = document.createElement('span');
        var className = inputEmpty;
        var refElement = window[className];

        // newElement.className = "close--error " + textErrors[className][0];
        newElement.className = "close--error";
        newElement.innerHTML = textErrors[className][1];

        refElement.parentNode.insertBefore(newElement, refElement.nextSibling);
}
//function для удаления элементов с сообщением об ошибке
function deleteError(){
    for(let i = 0; i < fields.length; i++){
        let elem = window[fields[i]].nextSibling;
        if (elem.className === "close--error"){
            contactsForm.removeChild(elem);
        }
    }
}

//функция сброса value в полях ввода
function deletValue() {
    for(let i = 0; i < fields.length; i++){
        let elem = window[fields[i]];
        elem.value = '';
    }
}
//анимация появления сообщения об ошибке
// function animateElem(arrAnimElem) {
//     for(let i = 0; i < arrAnimElem.length; i++){
//         let elem = window[arrAnimElem[i]].nextSibling;
//         elem.style.opacity = "1";
//         elem.style.transform = "translateX(0%)";
//     }
// }
function animateElem(AnimElem) {
        let elem = window[AnimElem].nextSibling;
        elem.style.opacity = "1";
        elem.style.transform = "translateX(0%)";
}
//функция валидации полей перед отправкой формы
function validationFields() {
    // if(!userNameInput.value && !emailInput.value && !messageInput.value){
    //     console.log("заполнить все поля");
    //     createElementError(fields);
    //
    //     setTimeout(animateElem, 200, fields);
    // }
    var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    for(let i = 0; i < allInputElem.length; i++){
        if (!allInputElem[i].value){
            createElementError(fields[i]);

            setTimeout(animateElem, 200, fields[i]);
            validationTrue = false;
        }
    }
    if(userNameInput.value.length < 2 || userNameInput.value.length > 75){
        createElementError("userNameInput");
        setTimeout(animateElem, 200, "userNameInput");
        validationTrue = false;
    }
    else if(regEmail.test(emailInput.value) == false){
        createElementError("emailInput");
        setTimeout(animateElem, 200, "emailInput");
        validationTrue = false;
    }
    else if(messageInput.value < 2 || messageInput.value > 5000){
        createElementError("messageInput");
        setTimeout(animateElem, 200, "messageInput");
        validationTrue = false;
    }
    else{validationTrue = true;}
    return validationTrue
}
//отслеживание нажатия на кнопку отправки формы
submitForm.addEventListener("click", function(e){
    e.preventDefault();
    fieldsAndButtonDisabled();
    deleteError();

    if(validationFields()) {
        console.log("отправить форму");
    }
    // validationFields();


    deletValue();
    fieldsAndButtonEnable();
});

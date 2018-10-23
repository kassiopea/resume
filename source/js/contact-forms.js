//форма
var contactsForm = document.querySelector(".contacts__feedbackform");
//кнопка отправки формы
var submitForm = document.querySelector(".contacts__button");
//поле имя
var username = document.querySelector("#username");
//поле мейл
var email = document.querySelector("#email");
//поле сообщение
var message = document.querySelector("#message");
//массив из всех полей ввода и кнопки
var allInputElem = [username, email, message];
//массив из названий всех полей для ввода
var fields = ["username", "email", "message"];
//класс и текст для ошибки
var textErrors = {
    "username": ["name-error", "Поле имя должно содержать не менее 2 символов"],
    "email": ["email-error", "поле email должно быть в формате example@mail.com"],
    "message": ["message-error", "поле сообщение должно содержать не менее 2 символов и не более 5000"]
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
//функция создания блоков с сообщнеиями об ошибке
function createElementError (inputEmpty) {

        var newElement = document.createElement('span');

        var className = inputEmpty;

        var refElement = window[className];

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

function animateElem(AnimElem) {
        let elem = window[AnimElem].nextSibling;
        elem.style.opacity = "1";
        elem.style.transform = "translateX(0%)";
}

//функция валидации полей перед отправкой формы
function validationFields() {
    validationTrue = true;
    var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //проверка на пустоту
    for(let i = 0; i < allInputElem.length; i++){
        if (!allInputElem[i].value){
            createElementError(fields[i]);
            setTimeout(animateElem, 200, fields[i]);
            validationTrue = false;
        }

    }

    if(validationTrue === true){
        if(username.value.length < 2 || username.value.length > 75){
            createElementError("username");
            setTimeout(animateElem, 200, "username");
            validationTrue = false;
        }
        else if(regEmail.test(email.value) == false){
            createElementError("email");
            setTimeout(animateElem, 200, "email");
            validationTrue = false;
        }
        else if(message.value < 2 || message.value > 5000){
            createElementError("message");
            setTimeout(animateElem, 200, "message");
            validationTrue = false;
        }
        else{validationTrue = true;}
    }
    return validationTrue
}

//создание json из имен и значений полей ввода
function jsonFormValues(){
    var formData = {};
    for(let i = 0; i < allInputElem.length; i++){
        formData[allInputElem[i].name] =  allInputElem[i].value;

    }
    return JSON.stringify(formData);
}
//функция анимации открытия и закрытия всплывающего окна с сообщением от сервера
var animatePopupServerMessage = function(elem){
    elem.classList.toggle("popup-server-message--animate");
}
//функция удаления всплывающего окна с сообщением от сервера после закрытия
var deleteServerMessage = function(elem) {
    if (elem.className === "popup-server-message"){
        document.body.removeChild(elem);
    }

}
//функция закрытия всплывающего окна с сообщением от сервера при нажатии на кнопку закрыть
function closePopupServerMessage(elemOnClick, popupBlock){
    elemOnClick.addEventListener('click', function(){
        animatePopupServerMessage(popupBlock);
        setTimeout(deleteServerMessage, 200, popupBlock);
    });
}

//создание всплывающего окна с сообщением от сервера
function createServerMessage(textMessage) {
    var newElem = document.createElement('div');
    newElem.className = "popup-server-message";
    newElem.innerHTML = textMessage;

    var btn = document.createElement("button");
    var textButton = document.createTextNode("закрыть");
    btn.className = "popup__button popup__button--server-Message";
    btn.appendChild(textButton);

    document.body.appendChild(newElem);
    newElem.appendChild(btn);

    setTimeout(animatePopupServerMessage, 200, newElem);
    closePopupServerMessage(btn, newElem);
}
//отслеживание нажатия на кнопку отправки формы
submitForm.addEventListener("click", function(e){
    e.preventDefault();
    fieldsAndButtonDisabled();
    deleteError();
    validationFields();

    if(validationTrue === true) {
        jsonFormValues();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function(){
            var error;
            switch (xhr.status) {
                case 200:
                    createServerMessage(xhr.responseText);
                    deletValue();
                    break;
                case 400:
                    error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText + "\nВы отправили неверный запрос. Попробуйте снова.";
                    break;
                case 404:
                    error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText + "\nВаше сообщение не было отправлено. Что-то пошло не так :( Попробуйте снова.";
                    break;
                case 500:
                    error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText + "\nУпс, внутренняя ошибка сервера. Мы не специально. Повторите запрос позднее.";
                    break;
                case 502:
                    error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText + "\nСервер дал недопустимый ответ. Мы его за это накажем. Повторите, пожалуйста, запрос.";
                    break;
                case 503:
                    error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText + "\nСервис временно недоступен. Извините нас. Мы все починим. Попробуйте повторить Ваш запрос позднее";
                    break;
                default:
                    error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText + "\nВаше сообщение не было отправлено. Попробуйте повторить запрос еще раз.";
            }
            if(error){
                createServerMessage (error);
            }
        });
        var data = jsonFormValues();
        xhr.open('POST', 'mail.php', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(data);
    }

    fieldsAndButtonEnable();
});

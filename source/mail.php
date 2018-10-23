<?php

$response = file_get_contents('php://input');
$post = (!empty($response)) ? true : false;

if($post){
    $allValues = json_decode($response, true);

    $username = $allValues['username'];
    $email = $allValues['email'];
    $message = $allValues['message'];

    //функция очистки полей
    function clean($value = "") {
            $value = trim($value);
            $value = stripslashes($value);
            $value = strip_tags($value);
            $value = htmlspecialchars($value);

            return $value;
    }
    //очистить поля
	$username = clean($username);
	$email = clean($email);
	$message = clean($message);
	$error = '';


    // проверка на поле имя
    if(!$username || strlen($username) < 2) {$error .= 'Напишите имя не менее 2 символов. ';}
    if(strlen($username) > 75) {$error .= 'Напишите имя не более 75 символов. ';}
    if(preg_match('/^[^\/?:@&=+$#]+$/im', $username)){$error .= '';}
	else{$error .= 'Поле "Имя" содержит недопустимые символы. ';}

    //проверка на поле емейл
    if(!$email) {$error .= 'Введите почту в формате mail@domen.ru. ';}
    if(preg_match('/@/', $email)){$error .= '';}
    else{$error .= 'Введите почту в формате mail@domen.ru. ';}

    //проверка на поле сообщение
    if(!$message || strlen($message) < 1){$error .= 'Введите сообщение.';}
    if(strlen($message) > 5000){$error .= 'Вы ввели слишком длинное сообщение. Сократите текст до 5000 символов. ';}

    //отправка сообщения
    if(!$error) {
    	$to = "fotograf.anastasia@gmail.com";
    	$subject = "Лови письмецо от посетитель сайта: $username";
    	$text =  "Написал(а): $username\n\n Контактный email - $email\n\n\n Текст письма: $message\n";
        $header.= "Content-type: text/html; charset=utf-8\r\n";
    	$header .= "MIME-Version: 1.0\r\n";
    	$sending = mail($to, $subject, $text, $headers);
    	if($sending) {echo "Спасибо, что написали мне. Отвечу Вам в ближайшее время.\n\nС уважением, Настя";}
    }
    else {echo $error;}
}

 ?>

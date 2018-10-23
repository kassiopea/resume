<?php

$post = (!empty($_POST)) ? true : false;
if($post) {
	$username = $_POST['username'];
	$email = $_POST['email'];
	$message = $_POST['message'];
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
	//проверка на поле имя
	if(!$username || strlen($username) < 2) {$error .= "Напишите имя не менее 2 символов.\n";}

	if(strlen($username) > 75) {$error .= "Напишите имя не более 75 символов.\n";}
	if(preg_match('/^[^\/?:@&=+$#]+$/im', $username))
		{$error .= '';}
		else{$error .= "Поле 'Имя' содержит недопустимые символы.\n";}
	//проверка на поле емейл
	if(!$email) {$error .= "Укажите электронную почту.\n";}
	if(preg_match('/@/', $email)) {$error .= '';} else{$error .= "Введите почту в формате mail@domen.ru.\n";}
	//проверка на поле сообщение
	if(!$message || strlen($message) < 1) {$error .= "Введите сообщение.\n";}
	if(strlen($message) > 5000) {$error .= "Вы ввели слишком длинное сообщение. Сократите текст до 5000 символов.\n";}
	if(!$error) {
	$to = "fotograf.anastasia@gmail.com";
	$subject = "Посетитель сайта: $username";
	$text =  "Написал(а): $username\n\n Контактный email - $email\n\n\n Текст письма: $message\n";
	$header.= "Content-type: text/html; charset=utf-8\r\n";
	$header .= "MIME-Version: 1.0\r\n";
	$sending = mail($to, $subject, $text, $headers);
	if($sending) {
		header('Refresh: 5; url=http://resume.asalikova.ru/');
 		echo "Сообщение отправлено. Через 5 секунд Вы будете перенаправлены на главную страницу. И, кстати, у Вас не работает JS :(";
	}
}
	else {
		header('Refresh: 15; url=http://resume.asalikova.ru/');
 		echo $error. "Через 15 секунд Вы будете перенаправлены на главную страницу. И, кстати, у Вас не работает JS :(";
	}
}
 ?>

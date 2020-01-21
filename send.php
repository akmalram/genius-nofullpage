<?php
// ----------------------------конфигурация-------------------------- //

$adminEmail="Geniustash@mail.ru";  // e-mail админа
$date=date("d.m.y"); // число.месяц.год
$time=date("H:i"); // часы:минуты:секунды

//---------------------------------------------------------------------- //

// Принимаем данные с формы

$name=trim($_POST['name']);
$phone=trim($_POST['phone']);
$email=trim($_POST['email']);
$text=trim($_POST['message']);

$msg="
Имя: $name,
Номер телефона: $phone,
Почта: $email,
Сообщение: $text
";
// Отправляем письмо админу


$date = date('r');

$params = [
    'form_id' => 572626,
    'hash' => 'ea24ec98e595bc60fd073dfc308f5c29',
    'user_origin' => "{\"datetime\":\"{$date}\",\"referer\":\"https://geniusxgenius.amocrm.ru/settings/pipeline/leads/1692421\"}",
    'fields[name_1]' => $name,
    'fields[25023_1][38671]' => $phone,
    'fields[25025_1][38683]' => $email,
    'fields[note_2]' => $text,
];

$ch = curl_init('https://forms.amocrm.ru/queue/add');
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$result = curl_exec($ch);
curl_close($ch);

mail("$adminEmail", "Заявка с сайта GeniusX от $name", "$msg");
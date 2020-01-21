<?php
// ----------------------------конфигурация-------------------------- //

$adminEmail="Geniustash@mail.ru";  // e-mail админа
$date=date("d.m.y"); // число.месяц.год
$time=date("H:i"); // часы:минуты:секунды

//---------------------------------------------------------------------- //

// Принимаем данные с формы

$name=trim($_POST['name']);
$phone=trim($_POST['phone']);
$target=trim($_POST['hidden']);

$msg="
Имя: $name,
Номер телефона: $phone,
Цель: $target,
";
// Отправляем письмо админу


$date = date('r');

$params = [
    'form_id' => 572644,
    'hash' => '47428d141cd6f776760734f924171b68',
    'user_origin' => "{\"datetime\":\"{$date}\",\"referer\":\"https://geniusxgenius.amocrm.ru/settings/pipeline/leads/1692421\"}",
    'fields[name_1]' => $name,
    'fields[25023_1][38671]' => $phone,
    'fields[note_2]' => $target,
];

$ch = curl_init('https://forms.amocrm.ru/queue/add');
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$result = curl_exec($ch);
curl_close($ch);

mail("$adminEmail", "Заявка на звонок с сайта GeniusX от $name", "$msg");
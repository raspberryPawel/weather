<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';
$mail = new PHPMailer();
$mail->CharSet = "UTF-8";
$mail->PluginDir = "phpmailer/";
$mail->From = "raspberryweatherapp@gmail.com";
$mail->FromName = "Weather App";
$mail->Host = "smtp.gmail.com";
$mail->Mailer = "smtp";
$mail->Username = "raspberryweatherapp@gmail.com";
$mail->Password = "zaq1@WSX";
$mail->SMTPAuth = true;
$mail->Port = 587;
$mail->SetLanguage("pl", "phpmailer/language/");
$mail->Subject = "Pytanie ze strony";
$mail->Body = '
Wiadomość od: ' . $name . ',
Email kontaktowy: ' . $email . ',
Telefon kontaktowy: ' . $phone . ',
Treść wiadomości: ' . $message . ',
';
$mail->AddAddress("raspberryweatherapp@gmail.com", "Paweł Malina");
if ($mail->Send()) {
    echo 'ok';
} else {
    echo $mail->ErrorInfo;
}
$mail->ClearAddresses();
$mail->ClearAttachments();
?>
<?php
  if (isset($_POST["send"])) {
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    $to = "tema-luch@mail.ru";; // Здесь нужно написать e-mail, куда будут приходить письма
    $from = "site@m-n.agency"; // this is the sender's Email address

    $first_name = $_POST['name'];
    $subject = "Форма отправки сообщений с сайта M&N Agency";
    //$subject2 = "Copy of your form submission";
    $message = $first_name . " оставил телефон:" . "\n\n" . $_POST['telephone'];
    //$message2 = "Here is a copy of your message " . $first_name . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    //$headers2 = "From:" . $to;

    mail($to,$subject,$message,$headers);
    exit('<meta http-equiv="refresh" content="0; url=index.html" />');
  }
?>

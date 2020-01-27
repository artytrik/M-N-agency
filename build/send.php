<?php
  $errors = array();
  $data = array();

  if (empty($_POST['name']))
    $errors['name'] = 'Name is required';

  if (empty($_POST['telephone']))
    $errors['telephone'] = 'Telephone is required';

  if (!empty($errors)) {
    $data['success'] = false;
    $data['errors'] = $errors;
  } else {
    $to = "mail@m-n.agency";; // Здесь нужно написать e-mail, куда будут приходить письма
    $from = "mail@m-n.agency"; // this is the sender's Email address

    $first_name = $_POST['name'];
    $subject = "Форма отправки сообщений с сайта M&N Agency";
    //$subject2 = "Copy of your form submission";
    $message = $first_name . " оставил телефон:" . "\n\n" . $_POST['telephone'];
    //$message2 = "Here is a copy of your message " . $first_name . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    //$headers2 = "From:" . $to;

    mail($to,$subject,$message,$headers);

    $data['success'] = true;
    $data['message'] = 'Success!';
  }
echo json_encode($data);
?>

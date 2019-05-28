<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once "../config/mail.php";
include_once '../object/user.php';

function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
	$user->id = $data->id;
	$user->get();
	if ($user->email == null) {
		http_response_code(404);
		echo json_encode(array("message" => "User not found."));
	} else {
		$password = randomPassword();
		$user->password = sha1($password);
		$contentText = "Salut\nTon mot de passe a été modifié.\nVoici ton nouveau mot de passe : ".$password."\n\nA bientôt sur SAMM";
		$contentHtml = "<html><head></head><body><p>Salut,</br>ton mot de passe a été modifié.</p><p>Voici ton nouveau mot de passe : ".$password."</p><p>A bientôt sur SAMM</p></body></html>";
		$mail = new Mail($contentText, $contentHtml);
		$mail->to = $user->email;
		$mail->object = "SAMM : Votre nouveau mot de passe";

		
		if ($mail->send() && $user->forgotPassword()) {
			http_response_code(200);
			echo json_encode(array("message" => "User password was updated. An email was sent to user."));
		} else {
			http_response_code(503);
			echo json_encode(array("message" => "Unable to send mail to user."));
		}

		
	}
}
else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to change user password. Data is incomplete."));
}

?>
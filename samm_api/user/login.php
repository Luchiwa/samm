<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../object/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
	$user->email = $data->email;
	$user->password = sha1($data->password);

	$user->login();

	if ($user->id != null) {
		$user_arr = array(
			"id" => $user->id,
			"email" => $user->email,
			"username" => htmlspecialchars_decode($user->username),
			"score" => $user->score,
			"creation_date" => $user->creation_date
		);

		http_response_code(200);

		echo json_encode($user_arr);	
	} else {
		http_response_code(404);

		echo json_encode(array("message" => "User does not exist"));
	}	
} else {
	http_response_code(400);

	echo json_encode(array("message" => "Unable to login user. Data is incomplete"));
}

?>
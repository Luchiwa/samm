<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/core.php";
include_once "../config/database.php";
include_once "../object/user.php";

$database = new Database();
$db = $database->getConnection();
 
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->username) && !empty($data->password)) {
	$user->email = $data->email;
	$user->emailExist();
	if ($user->id != null) {
		http_response_code(503);
		echo json_encode(array("message" => "Unable to create user. Email already exist."));
	}

	$user->id = sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));	
	$user->username = htmlspecialchars(strip_tags($data->username));
	$user->password = sha1($data->password);
	$user->creation_date = date("Y-m-d H:i:s");

	if ($user->create()) {
		http_response_code(201);
		echo json_encode(
			array(
				"message" => "User was created.", 
				"id" => $user->id,
				"email" => $user->email,
				"username" => $user->username,
				"score" => 0,
				"creation_date" => $user->creation_date
			)
		);
	}
	else {
		http_response_code(503);
		echo json_encode(array("message" => "Unable to create user."));
	}
}
else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}

?>
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

if (!empty($data->id) && !empty($data->password) &&!empty($data->oldPassword)) {
	$user->id = $data->id;
	$user->password = sha1($data->password);

	if ($user->updatePassword(sha1($data->oldPassword))) {
		http_response_code(200);
		echo json_encode(array("message" => "User password was updated."));
	} else {
		http_response_code(503);
		echo json_encode(array("message" => "Unable to update user password."));
	}
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}

?>
<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../object/taken.php";
include_once "../object/user_addiction.php";

$database = new Database();
$db = $database->getConnection();
 
$taken = new Taken($db);
$user_addiction = new UserAddiction($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user) && !empty($data->addiction)) {
	$taken->id = sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
	$taken->price = $data->price;
	$taken->user = $data->user;
	$taken->addiction = $data->addiction;
	$taken->creation_date = date("Y-m-d H:i:s");

	$user_addiction->user = $data->user;
	$user_addiction->addiction = $data->addiction;
	$user_addiction->reset_date = date("Y-m-d H:i:s");

	if ($taken->create() && $user_addiction->updateResetDate()) {
		http_response_code(201);
		echo json_encode(
			array(
				"message" => "Taken was created.",
				"id" => $taken->id,
				"creation_date" => $taken->creation_date
			));
	}
	else {
		http_response_code(503);
		echo json_encode(array("message" => "Unable to create taken."));
	}
}
else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to create taken. Data is incomplete"));
}

?>
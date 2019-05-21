<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/core.php";
include_once '../config/database.php';
include_once '../object/user_addiction.php';

$database = new Database();
$db = $database->getConnection();

$user_addiction = new UserAddiction($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user) && !empty($data->addiction)) {
	$user_addiction->user = $data->user;
	$user_addiction->addiction = $data->addiction;
	$user_addiction->reset_date = date("Y-m-d H:i:s");

	if ($user_addiction->updateResetDate()) {
		http_response_code(200);
		echo json_encode(array("message" => "Reset date was updated."));
	} else {
		http_response_code(503);
		echo json_encode(array("message" => "Unable to update the reset date."));
	}
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to update the reset date. Data is incomplete."));
}

?>
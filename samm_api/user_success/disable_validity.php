<?php
	
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/core.php";
include_once "../config/database.php";
include_once "../object/user_success.php";

$database = new Database();
$db = $database->getConnection();
 
$user_success = new UserSuccess($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user) && !empty($data->addiction)) {
	$user_success->valid = false;
	$user_success->user = $data->user;
	$user_success->addiction = $data->addiction;
	$user_success->disability_date = date("Y-m-d H:i:s");
	if ($user_success->disableValidity()) {
		http_response_code(200);
		echo json_encode(array("message" => "User success was invalid."));
	}
	else {
		http_response_code(503);
		echo json_encode(array("message" => "Unable to disable validity of user success."));
	}
}
else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to disable validity of user success. Data is incomplete"));
}

?>
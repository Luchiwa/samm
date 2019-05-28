<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../object/user.php";
include_once "../object/user_success.php";
include_once "../object/taken.php";
include_once "../object/user_addiction.php";

$database = new Database();
$db = $database->getConnection();
 
$user = new User($db);
if (isset($_GET["user"])) {
	$user->id = $_GET["user"];
	$user->score = 0;
	$user_success = new UserSuccess($db);
	$user_success->user = $user->id;
	$taken = new Taken($db);
	$taken->user = $user->id;
	$user_addiction = new UserAddiction($db);
	$user_addiction->user = $user->id;

	if ($user_success->deleteByUser() && $taken->deleteByUser() && $user_addiction->deleteByUser() && $user->updateScore()) {
		http_response_code(200);
		echo json_encode(array("message" => "User was reseted."));
	} else {
		http_response_code(503);
		echo json_encode(array("message" => "Unable to reset user."));
	}
}
else {
	http_response_code(400);
	echo json_encode(array("message" => "Data is incomplete."));
}

?>
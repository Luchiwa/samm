<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../object/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$user->email = isset($_GET["email"]) ? $_GET["email"] : die();

$user->emailExist();

$return_json = array();

if ($user->id != null) {
	//array_push($return_json, array("email_exist" => true));
	$return_json["email_exist"] = true;
	
} else {
	//array_push($return_json, "email_exist" => false);
	$return_json["email_exist"] = false;
}

http_response_code(200);

echo json_encode($return_json);

?>
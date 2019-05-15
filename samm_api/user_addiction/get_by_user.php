<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../object/user_addiction.php";

$database = new Database();
$db = $database->getConnection();
 
$user_addiction = new UserAddiction($db);

$user_addiction->user = isset($_GET["user"]) ? $_GET["user"] : die();

$stmt = $user_addiction->getByUser();
$num = $stmt->rowCount();

if ($num > 0) {

	$user_addiction_arr = array();
	$user_addiction_arr["user_addictions"] = array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		extract($row);

		$user_addiction_item = array(
			"id" => $id,
			"creation_date" => $creation_date,
			"reset_date" => $reset_date,
			"user" => $user,
			"addiction" => $addiction,
			"addiction_name" => $addiction_name
 		);

 		array_push($user_addiction_arr["user_addictions"], $user_addiction_item);
	}

	http_response_code(200);

	echo json_encode($user_addiction_arr);

} else {

	http_response_code(404);

	echo json_encode(array("message" => "No user addictions found."));
}

?>
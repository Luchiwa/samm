<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../object/user_success.php";

$database = new Database();
$db = $database->getConnection();
 
$user_success = new UserSuccess($db);
if (isset($_GET["user"])) {
	
	$user_success->user = $_GET["user"];
	$stmt = $user_success->getByUSer();
	$num = $stmt->rowCount();
	
	if ($num > 0) {
		$user_success_arr = array();
		$user_success_arr["user_success"] = array();

		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			extract($row);
			$user_success_item = array(
				"id" => $id,
				"success_name" => $success_name,
				"success_description" => $success_description,
				"success_point" => $success_point,
				"addiction_name" => $addiction_name,
				"valid" => $valid,
				"disability_date" => $disability_date,
				"success" => $success,
				"user" => $user,
				"creation_date" => $creation_date,
				"updated_date" => $updated_date
			);

			array_push($user_success_arr["user_success"], $user_success_item);

		}
		http_response_code(200);
		echo json_encode($user_success_arr);
	}  
	else {
		http_response_code(404);
		echo json_encode(array("message" => "No user success found."));
	}
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to get user success. Data is incomplete."));
}

?>
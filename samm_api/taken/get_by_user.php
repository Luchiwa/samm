<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../object/taken.php";

$database = new Database();
$db = $database->getConnection();
 
$taken = new Taken($db);

$taken->user = isset($_GET["user"]) ? $_GET["user"] : die();

$stmt = $taken->getByUser();
$num = $stmt->rowCount();

if ($num > 0) {

	$taken_arr = array();
	$taken_arr["takens"] = array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		extract($row);

		$taken_item = array(
			"id" => $id,
			"price" => $price,
			"creation_date" => $creation_date,
			"addiction_name" => $addiction_name
 		);

 		array_push($taken_arr["takens"], $taken_item);
	}

	http_response_code(200);

	echo json_encode($taken_arr);

} else {

	http_response_code(404);

	echo json_encode(array("message" => "No takens found."));
}

?>
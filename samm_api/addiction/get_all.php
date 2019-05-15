<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../object/addiction.php";

$database = new Database();
$db = $database->getConnection();

$addiction = new Addiction($db);

$stmt = $addiction->getAll();
$num = $stmt->rowCount();

if ($num > 0) {

	$addiction_arr = array();
	$addiction_arr["addictions"] = array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		extract($row);

		$addiction_item = array(
			"id" => $id,
			"name" => $name,
			"min_price" => $min_price,
			"max_price" => $max_price,
			"order" => $order,
			"creation_date" => $creation_date
 		);

 		array_push($addiction_arr["addictions"], $addiction_item);
	}

	http_response_code(200);

	echo json_encode($addiction_arr);

} else {

	http_response_code(404);

	echo json_encode(array("message" => "No addictions found."));
}

?>
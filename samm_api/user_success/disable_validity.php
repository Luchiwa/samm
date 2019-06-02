<?php
	
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/core.php";
include_once "../config/database.php";
include_once "../object/user_success.php";
include_once "../object/user.php";

$database = new Database();
$db = $database->getConnection();
 
$user_success = new UserSuccess($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user) && !empty($data->addiction)) {
	$user_success = new UserSuccess($db);
	$user_success->addiction = $data->addiction;
	$user_success->user = $data->user;
	$stmt = $user_success->getByUserAddiction();
	$num = $stmt->rowCount();
	$user_score = 0;
	$valid_success = 0;
	if ($num > 0) {
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			extract($row);
			if ($valid) {
				$user_score += $success_point;
				$valid_success++;
			}			
		}
		$user_success->valid = false;
		$user_success->user = $data->user;
		$user_success->addiction = $data->addiction;
		$user_success->disability_date = date("Y-m-d H:i:s");
		$user_success->updated_date = $user_success->disability_date;
		$user = new User($db);
		$user->id = $data->user;
		$user->get();
		$user->score -= $user_score;
		if ($valid_success > 0) {
			if ($user_success->disableValidity() && $user->updateScore()) {
				http_response_code(200);
				echo json_encode(array("message" => "User success was invalid.", "score" => $user->score));
			}
			else {
				http_response_code(503);
				echo json_encode(array("message" => "Unable to disable validity of user success."));
			}
		} else {
			http_response_code(204);
			echo json_encode(array("message" => "No user success to invalid."));
		}		
	}
	else {
		http_response_code(404);
		echo json_encode(array("message" => "User success not found."));
	}

	
}
else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to disable validity of user success. Data is incomplete"));
}

?>
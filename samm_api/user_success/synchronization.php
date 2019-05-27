<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/core.php";
include_once "../config/database.php";
include_once "../object/user.php";
include_once "../object/user_addiction.php";
include_once "../object/success.php";
include_once "../object/user_success.php";

if (isset($_GET["user"])) {
	$database = new Database();
	$db = $database->getConnection();

	$user = new User($db);
	$user->id = $_GET["user"];
	$user->get();

	if ($user->email != null) {
		$user_addiction = new UserAddiction($db);
		$user_addiction->user = $user->id;

		$stmt = $user_addiction->getByUser();
		$num = $stmt->rowCount();

		if ($num > 0) {
			$user_addiction_arr = array();

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

 				array_push($user_addiction_arr, $user_addiction_item);
			}

			$user_id = $_GET["user"];
			$success = new Success($db);
 			$stmt = $success->getAll();

 			$num = $stmt->rowCount();

 			if ($num > 0) {
 				$success_arr = array();

 				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
 					extract($row);

 					$success_item = array(
 						"id" => $id,
 						"name" => $name,
 						"description" => $description,
 						"type" => $type,
 						"start_time" => $start_time,
 						"end_time" => $end_time,
 						"addiction" => $addiction,
 						"creation_date" => $creation_date
 					);

 					array_push($success_arr, $success_item);
 				}

 				$user_success = new UserSuccess($db);
 				$user_success->user = $user_id;

 				$stmt = $user_success->getByUser();
 				$num = $stmt->rowCount();

 				$user_success_simple_arr = array();
 				$user_success_arr = array();

 				if ($num > 0) {
	 				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	 					extract($row);

	 					$user_success_item = array(
							"id" => $id,
							"valid" => $valid,
							"disability_date" => $disability_date,
							"success" => $success,
							"user" => $user,
							"creation_date" => $creation_date
						);

	 					$user_success_simple = array(
							"success" => $success,
							"user" => $user
						);

	 					array_push($user_success_simple_arr, $user_success_simple);
	 					array_push($user_success_arr, $user_success_item);
	 				}
 				}
				
				$user_success_gen_arr = array();
				$creation_date = date("Y-m-d H:i:s");

				foreach($user_addiction_arr as $user_addiction_item) {
					
					$date_now = strtotime(date("Y-m-d H:i:s"));
					$reset_date = strtotime(date($user_addiction_item["reset_date"]));
					$addiction = $user_addiction_item["addiction"];
					
					foreach($success_arr as $success_item) {

						if ($date_now > ($reset_date + $success_item["end_time"]) && ($addiction == $success_item["addiction"])) {
							$user_success = new UserSuccess($db);		
							$user_success->addiction = $addiction;
							
							if (!in_array(array("success" => $success_item["id"], "user" => $user_id), $user_success_simple_arr)) {
								$user_success->id = sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
								$user_success->valid = true;
								$user_success->success = $success_item["id"];
								$user_success->user = $user_id;
								$user_success->creation_date = date("Y-m-d H:i:s");

								if ($user_success->create()) {
									array_push($user_success_gen_arr, $user_success);
								}

							}
							else {
								
								foreach($user_success_arr as $user_success_item) {
									if (!$user_success_item["valid"]) {
										$user_success->id = $user_success_item["id"];
										$user_success->valid = true;
										if ($user_success->updateValidity()) {
											array_push($user_success_gen_arr, $user_success);
										}
									}
								}
							}
						}						
					}

				}

				http_response_code(200);
				array_push($user_success_gen_arr, array("message" => "Synchronization success."));
				echo json_encode($user_success_gen_arr);
				
 			}
 			else {
 				http_response_code(404);
				echo json_encode(array("message" => "Unable to synchronize success user. No success found."));
 			}
		} 
		else {
			http_response_code(404);
			echo json_encode(array("message" => "Unable to synchronize success user. User addictions not found."));
		}

	} 
	else {
		http_response_code(404);
		echo json_encode(array("message" => "Unable to synchronize success user. User not found."));
	}

}
else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to synchronize success user. Data is incomplete."));
}

?>
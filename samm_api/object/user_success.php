<?php

class UserSuccess {
		
	private $conn;
	private $table_name = "user_success";

	public $id;
	public $valid;
	public $disability_date;
	public $success;
	public $user;
	public $addiction;
	public $creation_date;
	public $updated_date;

	public function __construct($db) {
		$this->conn = $db;
	}

	function getByUser() {
		$query = "SELECT us.id, s.name as success_name, a.name as addiction_name, s.description as success_description, s.point as success_point, us.valid, us.disability_date, us.success, us.user, us.creation_date, us.updated_date FROM $this->table_name us LEFT JOIN success s ON us.success = s.id LEFT JOIN addiction a ON us.addiction = a.id WHERE us.user = '$this->user'";

		$stmt = $this->conn->prepare($query);

		$stmt->execute();

		return $stmt;
	}

	function getByUserAddiction() {
		$query = "SELECT us.id, s.name as success_name, s.description as success_description, s.point as success_point, us.valid, us.disability_date, us.success, us.user, us.creation_date, us.updated_date FROM $this->table_name us LEFT JOIN success s ON us.success = s.id WHERE us.user = '$this->user' and us.addiction = '$this->addiction' ORDER BY s.end_time";

		$stmt = $this->conn->prepare($query);

		$stmt->execute();

		return $stmt;
	}

	function create() {
		$query = "INSERT INTO $this->table_name SET id='$this->id', valid='$this->valid', success='$this->success', user='$this->user', addiction = '$this->addiction', creation_date='$this->creation_date', updated_date='$this->updated_date'";
		
		$stmt = $this->conn->prepare($query);

		if ($stmt->execute()) {
			return true;
		}

		return false;
	}

	function updateValidity() {
		$query = "UPDATE $this->table_name SET valid = '$this->valid', updated_date = '$this->updated_date' WHERE id = '$this->id'";

		$stmt = $this->conn->prepare($query);

		if ($stmt->execute()) {
			return true;
		}

		return false;
	}

	function disableValidity() {
		$query ="UPDATE $this->table_name SET valid = '$this->valid', disability_date = '$this->disability_date', updated_date = '$this->updated_date' WHERE user = '$this->user' AND addiction = '$this->addiction'";

		 $stmt = $this->conn->prepare($query);

		if ($stmt->execute()) {
			return true;
		}

		return false;
	}

	function deleteByUser() {
		$query = "DELETE FROM $this->table_name WHERE user = '$this->user'";

		$stmt = $this->conn->prepare($query);

		if ($stmt->execute()) {
			return true;
		}
		return false;
	}

}

?>
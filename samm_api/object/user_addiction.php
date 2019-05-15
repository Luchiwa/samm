<?php

class UserAddiction {
	
	private $conn;
	private $table_name = "user_addiction";

	public $id;
	public $creation_date;
	public $reset_date;
	public $user;
	public $addiction;

	public function __construct($db) {
		$this->conn = $db;
	}

	function getByUser() {
		$query = "SELECT ua.id, ua.creation_date, ua.reset_date, ua.user, ua.addiction, a.name as addiction_name FROM $this->table_name ua LEFT JOIN addiction a ON ua.addiction = a.id WHERE ua.user = '$this->user' ORDER BY a.order";

		$stmt = $this->conn->prepare($query);

		$stmt->execute();

		return $stmt;
	}

	function create() {
		$query = "INSERT INTO $this->table_name SET id='$this->id', user='$this->user', addiction='$this->addiction', creation_date='$this->creation_date', reset_date='$this->creation_date'";

		$stmt = $this->conn->prepare($query);

		if ($stmt->execute()) {
			return true;
		}

		return false;
	}

	function updateResetDate() {
		$query = "UPDATE $this->table_name SET reset_date = '$this->reset_date' WHERE user = '$this->user' AND addiction = '$this->addiction'";

		$stmt = $this->conn->prepare($query);

		if ($stmt->execute()) {
			return true;
		}

		return false;
	}

}

?>
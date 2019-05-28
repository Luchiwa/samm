<?php

class Taken {
		
	private $conn;
	private $table_name = "taken";

	public $id;
	public $price;
	public $creation_date;
	public $user;
	public $addiction;

	public function __construct($db) {
		$this->conn = $db;
	}

	function getByUser() {
		$query = "SELECT t.id as id, t.creation_date as creation_date, t.price as price, a.name as addiction_name FROM $this->table_name t LEFT JOIN addiction a ON t.addiction = a.id WHERE t.user = '$this->user' ORDER BY t.creation_date";

		$stmt = $this->conn->prepare($query);

		$stmt->execute();

		return $stmt;
	}

	function create() {
		$query = "INSERT INTO $this->table_name SET id='$this->id', price='$this->price', creation_date='$this->creation_date', user='$this->user', addiction='$this->addiction'";
		
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
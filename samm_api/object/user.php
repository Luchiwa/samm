<?php

class User {
		
	private $conn;
	private $table_name = "user";

	public $id;
	public $email;
	public $username;
	public $password;
	public $score;
	public $creation_date;

	public function __construct($db) {
		$this->conn = $db;
	}

	function get() {
		$query = "SELECT id, email, username, password, score, creation_date  FROM $this->table_name WHERE id = '$this->id'";

		$stmt = $this->conn->prepare($query);

		$stmt->execute();

		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		$this->id = $row["id"];
		$this->email = $row["email"];
		$this->username = $row["username"];
		$this->score = $row["score"];
		$this->creation_date = $row["creation_date"];
	}

	function create() {
		$query = "INSERT INTO $this->table_name SET id='$this->id', email='$this->email', username='$this->username', password='$this->password', creation_date='$this->creation_date'";

		$stmt = $this->conn->prepare($query);

		if ($stmt->execute()) {
			return true;
		}

		return false;
	}

	function updateScore() {
		$query = "UPDATE $this->table_name SET score = '$this->score' WHERE id = '$this->id'";

		$stmt = $this->conn->prepare($query);

		if ($stmt->execute()) {
			return true;
		}

		return false;
	}

	function updatePassword($old_password) {
		$passwd_query = "SELECT id FROM $this->table_name WHERE id = '$this->id' AND password = '$old_password'";

		$passwd_stmt = $this->conn->prepare($passwd_query);

		$passwd_stmt->execute();

		$row = $passwd_stmt->fetch(PDO::FETCH_ASSOC);

		if ($row["id"] != null) {
			$query = "UPDATE $this->table_name SET password = '$this->password' WHERE id = '$this->id'";
			$stmt = $this->conn->prepare($query);
			if ($stmt->execute()) {
				return true;
			}
		}		
		return false;	
	}

	function emailExist() {
		$query = "SELECT id FROM $this->table_name WHERE email = '$this->email'";

		$stmt = $this->conn->prepare($query);

		$stmt->execute();

		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		$this->id = $row["id"];
	}

	function login() {
		$query = "SELECT id, username, score, creation_date  FROM $this->table_name WHERE email = '$this->email' AND password = '$this->password'";

		$stmt = $this->conn->prepare($query);

		$stmt->execute();

		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		$this->id = $row["id"];
		$this->username = $row["username"];
		$this->score = $row["score"];
		$this->creation_date = $row["creation_date"];
	}

}

?>
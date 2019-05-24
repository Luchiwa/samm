<?php

class Database {
	
	/*
	private $host = "localhost";
	private $db_name = "samm";
	private $db_user = "samm";
	private $db_password = "5RSuYJNvCHd6VDlV";
	*/
	
	private $host = "localhost";
	private $db_name = "catzguy_luc";
	private $db_user = "samm";
	private $db_password = "W4uaf3#9";
		
	public $conn;

	public function getConnection() {
		$this->conn  = null;
		try {
			$this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->db_user, $this->db_password);
			$this->conn->exec("set names utf8");
		} catch(PDOException $exception) {
			echo "Connection error : " . $exception->getMessage();
		}

		return $this->conn;
	}
}

?>
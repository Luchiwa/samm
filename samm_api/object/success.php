<?php

class Success {
		
	private $conn;
	private $table_name = "success";

	public $id;
	public $name;
	public $description;
	public $type;
	public $start_time;
	public $end_time;
	public $addiction;
	public $creation_date;

	public function __construct($db) {
		$this->conn = $db;
	}

	function getAll() {
		$query = "SELECT s.id, s.name, s.description, s.type, s.start_time, s.end_time, s.addiction, s.creation_date FROM $this->table_name s ORDER BY s.start_time";

		$stmt = $this->conn->prepare($query);

		$stmt->execute();

		return $stmt;
	}

}

?>
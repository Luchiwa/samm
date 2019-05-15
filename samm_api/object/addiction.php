<?php

class Addiction {

	private $conn;
	private $table_name = "addiction";

	public $id;
	public $name;
	public $min_price;
	public $max_price;
	public $order;
	public $creation_date;

	public function __construct($db) {
		$this->conn = $db;
	}

	function getAll() {
		$query = "SELECT a.id, a.name, a.min_price, a.max_price, a.order, a.creation_date FROM $this->table_name a ORDER BY a.order";
		
		$stmt = $this->conn->prepare($query);

		$stmt->execute();

		return $stmt;
	}

}

?>
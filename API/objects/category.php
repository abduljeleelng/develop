<?php
/**
 * Created by PhpStorm.
 * User: NobleSoft
 * Date: 16-Apr-18
 * Time: 4:27 PM
 */
include_once "../config/database.php";
class Category{

    // database connection and table name
    private $conn;
    private $table_name = "categories";

    // objects properties
    public $id;
    public $name;
    public $description;
    public $created;

    public function __construct($db){
        $this->conn = $db;
    }

    // used by select drop-down list
    public function readAll(){
        //select all data
        $query = "SELECT id, name, description FROM " . $this->table_name . "
                ORDER BY  name";

        $stmt = $this->conn->prepare( $query );
        $stmt->execute();

        return $stmt;
    }
// used by select drop-down list
    public function read(){
        //select all data
        $query = "SELECT
                id, name, description
            FROM
                " . $this->table_name . "
            ORDER BY
                name";

        $stmt = $this->conn->prepare( $query );
        $stmt->execute();

        return $stmt;
    }
    public function rowCount(){
        $query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name."";
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['total_rows'];

    }
}
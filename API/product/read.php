<?php
/**
 * Created by PhpStorm.
 * User: NobleSoft
 * Date: 15-Apr-18
 * Time: 6:40 PM
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and objects files
include_once '../config/database.php';
include_once "../objects/product.php";

// instantiate database and product objects
$database = new Database();
$db = $database->getConnection();

// initialize objects
$product = new Product($db);

// query products
$stmt = $product->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
    // products array
    $products_arr=array();
    $products_arr["records"]=array();
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        $product_item=array(
            "id" => $id,
            "name" => $name,
            "description" => html_entity_decode($description),
            "price" => $price,
            "category_id" => $category_id,
            "category_name" => $category_name
        );
        array_push($products_arr["records"], $product_item);
    }
    echo json_encode($products_arr);
}
else{
    echo json_encode(
        array("message" => "No products found.")
    );
}

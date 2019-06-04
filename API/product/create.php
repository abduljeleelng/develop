<?php
/**
 * Created by PhpStorm.
 * User: NobleSoft
 * Date: 15-Apr-18
 * Time: 7:58 PM
 */// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';
// instantiate product objects
include_once '../objects/product.php';

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);


// get posted data
$data = json_decode(file_get_contents("php://input"));


// make sure data is not empty

if(
    !empty($data->name) &&
    !empty($data->price) &&
    !empty($data->description) &&
    !empty($data->category_id)
){

// set product property values
$product->name = $data->name;
$product->price = $data->price;
$product->description = $data->description;
$product->category_id = $data->category_id;
$product->created = date('Y-m-d H:i:s');

// create the product
if($product->create()){
    echo '{';
    echo '"message": "Product was created."';
    echo '}';
}
// if unable to create the product, tell the user
else {
    echo '{';
    echo '"message": "Unable to create product."';
    echo '}';

}
}
// tell the user data is incomplete
else{
    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
}


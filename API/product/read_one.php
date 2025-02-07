<?php
/**
 * Created by PhpStorm.
 * User: NobleSoft
 * Date: 15-Apr-18
 * Time: 8:29 PM
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and objects files
include_once '../config/database.php';
include '../objects/product.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product objects
$product = new Product($db);

// set ID property of product to be edited
$product->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of product to be edited
$product->readOne();
// create array
$product_arr = array(
    "id" =>  $product->id,
    "name" => $product->name,
    "description" => $product->description,
    "price" => $product->price,
    "category_id" => $product->category_id,
    "category_name" => $product->category_name

);

// make it json format
print_r(json_encode($product_arr));

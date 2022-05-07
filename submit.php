<?php


$url = $_POST['url'];


$response = file_get_contents($url);
echo $response;

$responseKeys = json_decode($response,true);
print_r($responseKeys);die();
?>
<?php
try {

    $apikey = "NZX4kLHYDHJENATIpNyqfIefnPyjtOmw";
    error_reporting(E_ERROR | E_PARSE);
    $toSearch = $_POST['search'];
    $ch = curl_init();
        // CURLOPT_URL, CURLOPT_RETURNTRANSFER, CURLOPT_POST, CURLOPT_POSTFIELDS
    curl_setopt($ch, CURLOPT_URL, "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" . $apikey . "&q=" . $toSearch . "&language=pl-pl");
    //curl_setopt($ch, CURLOPT_URL, "http://gd.geobytes.com/GetCityDetails?callback=?");
    //31.0.123.180
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_GET, true);

    $server_output = curl_exec($ch);
    curl_close($ch);
    echo (json_encode($server_output));

} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

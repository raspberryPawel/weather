<?php
try {
    $apikey = "arU05hUrwBNJnZ76rSg8bA9iLxP5GdWz";
    error_reporting(E_ERROR | E_PARSE);
    $toSearch = $_POST['search'];
    $ch = curl_init();
        // CURLOPT_URL, CURLOPT_RETURNTRANSFER, CURLOPT_POST, CURLOPT_POSTFIELDS
    curl_setopt($ch, CURLOPT_URL, "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=".$apikey."&q=".$toSearch."&language=pl-pl");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_GET, true);

    $server_output = curl_exec($ch);
    curl_close($ch);
    echo (json_encode($server_output));
        // echo(json_encode($html));
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

<?php
try {
    $apikey = "qAV9u0ZnbgaYbNqGejIy0ChN0GIfQpk5";
    error_reporting(E_ERROR | E_PARSE);
    $toSearch = $_POST['search'];
    $ch = curl_init();
        // CURLOPT_URL, CURLOPT_RETURNTRANSFER, CURLOPT_POST, CURLOPT_POSTFIELDS
    curl_setopt($ch, CURLOPT_URL, "http://dataservice.accuweather.com/locations/v1/".$toSearch."?apikey=".$apikey."&language=pl-pl&details=true");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_GET, true);

    $server_output = curl_exec($ch);
    curl_close($ch);
    echo (json_encode($server_output));
        // echo(json_encode($html));
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

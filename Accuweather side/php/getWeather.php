<?php
try {
    $apikey = "cWNNI8lgLDccpflFp300LSJD3cK1e3u1";
    error_reporting(E_ERROR | E_PARSE);
    $toSearch = $_POST['search'];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://dataservice.accuweather.com/forecasts/v1/daily/5day/".$toSearch."?apikey=".$apikey."&language=pl-pl&details=true");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_GET, true);

    $server_output = curl_exec($ch);
    curl_close($ch);
    echo (json_encode($server_output));
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

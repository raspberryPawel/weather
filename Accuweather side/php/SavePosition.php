<?php
    $lat = $_POST['latitude'];
    $lon = $_POST['longitude'];
    $userID = $_POST['userID'];
    $servername = "localhost";
    $username = "root";
    $pass = "";
    $dbname = "accuweather";
   
                        // Create connection
    $conn = new mysqli($servername, $username, $pass, $dbname);
                        // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        $conn->set_charset("utf8");
        $sql = "INSERT INTO `saveposition`(`id_position`, `user_id`, `latitude`, `longitude`, `date`) VALUES ('','$userID','$lat','$lon', now())";
        $result = $conn->query($sql);
        echo(json_encode($result));
}
?>
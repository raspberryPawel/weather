<?php
//Access-Control-Allow-Origin header with wildcard.
header("Access-Control-Allow-Origin: *");
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
    $sql = "SELECT * FROM `saveposition` WHERE `user_id` = " . $userID;
    $result = $conn->query($sql);
    $positionTab = array();
        // array_push($tab, "ups");
    while ($row = $result->fetch_assoc()) {
        array_push($positionTab, $row);
    }
    echo (json_encode($positionTab));
}
?>
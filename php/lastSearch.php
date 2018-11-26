<?php
$toSearch = $_POST['search'];
$city = $_POST['city'];
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
    $sql = "INSERT INTO `lastsearch`(`searchID`, `name`, `key`, `userID`) VALUES ('','$city','$toSearch','$userID')";
    $result = $conn->query($sql);
    //echo (json_encode($result));
}
?>
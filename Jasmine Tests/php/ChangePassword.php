<?php
if (isset($_POST['userID'], $_POST['password'])) {
    $id = $_POST['userID'];
    $password = $_POST['password'];
    $hash = password_hash($password, PASSWORD_DEFAULT);

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
        $sql = "UPDATE `loginData` SET `password`='$hash' WHERE `id` = '$id'";
        $result = $conn->query($sql);
        echo ($result);
    }
}
?>
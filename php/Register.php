<?php
if (isset($_POST['name'], $_POST['password'], $_POST['email'])) {
            //email poprawny;
    $name = $_POST['name'];
    $password = $_POST['password'];
    $email = $_POST['email'];

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
        $sql = "SELECT COUNT(email) FROM loginData WHERE `email` = \"" . $email . "\"";
        $result = $conn->query($sql);
        $result = $result->fetch_assoc();
        if ((int)json_encode($result["COUNT(email)"])[1] == 1) {
            echo ("mistake");
        } else {
            error_reporting(E_ALL ^ E_WARNING);
                                //login wolny, rejestracja
            $sql = "INSERT INTO `loginData`(`id`, `name`, `password`, `email`) VALUES ('','$name','$hash','$email')";
            $result = $conn->query($sql);
            echo ("success");
        }
    }
}
?>
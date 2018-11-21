<?php
if (isset($_POST['password'], $_POST['email'])) {
    //email poprawny;
    $password = $_POST['password'];
    $email = $_POST['email'];

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
        if ((int)json_encode($result["COUNT(email)"])[1] == 0) {
            echo ("mistake");
        } else {
            error_reporting(E_ALL ^ E_WARNING);
                                //login wolny, rejestracja
            $sql = "SELECT * FROM `logindata` WHERE  `email` = \"" . $email . "\"";
            $result = $conn->query($sql);
            $result = $result->fetch_assoc();
                //wyłączenie powiadomień
            error_reporting(E_ALL ^ E_NOTICE);
            if (password_verify($password, $result["password"])) {
                $cookie_name = "userName";
                $cookie_value = $result["email"];
                setcookie($cookie_name, $cookie_value, time() + (5400), "/"); // 86400 = 1 day
                echo ('valid');
            } else {
                echo ('invalidPassword');
            }
        }
    }
}
?>
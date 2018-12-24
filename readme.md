# Accuweather App

## Link
[https://github.com/raspberryPawel/weather](https://github.com/raspberryPawel/weather)

## What Is This?
Simple WeatherApp 

## How To Use?
* Website <br>
Open [http://pmalina.pl/accuweather/](http://pmalina.pl/accuweather/) and start use. <br> 
In input write something to search a city, click prompt city and get weather for 4 days. Sign up to get possibility changing skins for maps or map pins. Get yours last search and save default city to show weather after start using a side. Get your saved positions on google map. Use location to show weather without  search a city in search box. (Searching city by location works in Microsoft Edge because the connection is not secured by the ssl protocol)

* Local <br>
In xampp/htdocs add folder for your files. <br>
Add to this folder files from "Accuweather side" in downloads catalog.  <br>
Start modul Apache and MySQL in xampp. <br>
Go to side: http://localhost/phpmyadmin/ and import data base from folder "MySQL Data Base"  to "accuweather" data base. <br>
Start using a side.<br>
If side show you message "Api Authorization failed" or "Wyczerpano liczbę użyć  klucza API" you have to change api key in files:
<ul>
  <li>AutoCompleteSearch.php</li>
  <li>Geoposition.php</li>
  <li>getLocation.php</li>
  <li>getWeather.php</li>
</ul>
To send email message you have to change email and password in files in folder php/PHPMailer/src:
<ul>
  <li>send.php</li>
  <li>RecoveryPassword.php</li>
</ul>

## License
This project is released under the MIT Licence.

## Author
Paweł Malina
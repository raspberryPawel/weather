var mapStyleName = grayMapStyle;
var control = true;
$(document).ready(function () {
    getCookieMapStyle();
    $("#loc").on("click", function () {
        control = true;
        getLocation();
    });

    $("#save").on("click", function () {
        control = false;
        getLocation();
    });
    var sign = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż', ' '];
    var signUTF = ['%C4%85 ', '%C4%87 ', '%C4%99', '%C5%82', '%C5%84', '%C3%B3', '%C5%9B', '%C5%BA', '%C5%BC', '%20'];
    $("#search").on("input", function () {
        $("#searchAutoComplete")
            .empty()
            .css("height", "0px")
            .css("padding", "0 0 0 0");
        let toSearch = this.value;
        let newSearch = repleacePolishLetters(sign, signUTF, toSearch);

        $.ajax({
            url: "php/AutoCompleteSearch.php",
            data: { search: newSearch },
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(JSON.parse(data));
                console.log("obj ", obj.Message);
                if (obj.Message == "The allowed number of requests has been exceeded.") {
                    console.log("wyczerpano liczbę użyć  klucza");
                }
                else {
                    var optionLength;
                    if (obj.length > 5)
                        optionLength = 5;
                    else
                        optionLength = obj.length;

                    var length = 0;
                    for (var i = 0; i < optionLength; i++) {
                        //console.log("super element ====>  ",obj[i]);
                        let div = $("<div>")
                            .attr("class", "completeOption")
                            .attr("key", obj[i].Key)
                            .html(obj[i].LocalizedName + ", " + obj[i].AdministrativeArea.LocalizedName + ", " + obj[i].Country.LocalizedName)
                            .on("click", optionClick);
                        //length += 50;
                        $("#searchAutoComplete")
                            .append(div)
                            .css("transition", "1s")
                            .css("padding", "16px 0 8px 0px")
                            .css("height", "auto");
                    }
                }
            },
            error: function (xhr, status, error) {
                //console.log(xhr);
            },
        });
    });

    function optionClick() {
        getCookieMapStyle();
        $("#searchAutoComplete")
            .css("transition", "1s")
            .css("height", "0px")
            .css("padding", "0 0 0 0");
        var city = this.innerHTML.split(",")[0];
        $("#search").val(city);
        let toSearch = this.attributes.key.value;
        lastSearch(city, toSearch);
        getWeatherFromKey(toSearch)
    }
    setTimeout(function () { initMap("52.232", "21.007", 5, "map", mapStyleName, true, 1); }, 1000)
});


function getCookieMapStyle() {
    var x = getCookie('mapStyle');
    console.log("ciasteczko: ", x);
    if (x != null || x != "") {
        mapStyleName = window[x];
    }
    else {
        mapStyleName = grayMapStyle;
    }
}

function createWeatherContainer() {
    var div = $("<div>")
        .attr("id", "weatherInfo");
    var hide = $("<div>")
        .attr("id", "hideWeather")
        .html("Ukryj pogodę <i class='fas fa-arrow-down'></i>")
        .on("click", function () {
            if ($("#hideWeather")[0].innerHTML == 'Ukryj pogodę <i class="fas fa-arrow-down"></i>') {
                $("#weatherInfo")
                    .css("transition", "1s")
                    .css("top", "120%");
                $("#hideWeather")
                    .html('Pokaż pogodę <i class="fas fa-arrow-up"></i>');
            }
            else {
                $("#weatherInfo")
                    .css("transition", "1s")
                    .css("top", "12vh");
                $("#hideWeather")
                    .html("Ukryj pogodę <i class='fas fa-arrow-down'></i>");
            }
        });
    div.append(hide);
    $("#map").append(div);
}

function repleacePolishLetters(sign, signUTF, toSearch) {
    toSearch = toSearch.toLowerCase();
    let newSearch = "";
    for (var i = 0; i < toSearch.length; i++) {
        let bool = false;
        let index = 0;
        for (var j = 0; j < sign.length; j++) {
            if (toSearch[i] == sign[j]) {
                bool = true;
                index = j;
            }
        }
        if (bool)
            newSearch += signUTF[index];
        else
            newSearch += toSearch[i];
    }
    return newSearch;
}


function getLocation() {
    if (navigator.geolocation) {
        $("#positionInfo")
            .css("display", "flex");
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
        $("#posInfo")
            .html("Twoja przeglądarka nie wspiera usługi lokalizacji, zostanie ona określona na podstawie adresu IP dostawcy Twojego internetu.");
        $("#positionInfo")
            .css("display", "flex");
        $.getJSON('http://ip-api.com/json?callback=?', function (data) {
            console.log(JSON.stringify(data, null, 2));
            var position = data;
            var newSearch = position.lat + "," + position.lon;
            console.log(control, " <=========control");
            if (control)
                getPositionFromLatLon(newSearch)
            else
                savePosition(position.lat, position.lon)
        });
    }
}

function savePosition(lat, lon) {
    var id = getCookie('userID');
    if (id != null && id != '') {
        $.ajax({
            url: "php/SavePosition.php",
            data: { latitude: lat, longitude: lon, userID: id, },
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(JSON.parse(data));
                console.log("obj ", obj);
                if (obj == true) {
                    $("#positionInfo")
                        .css("display", "none");
                }
                else {
                    console.log("wystąpił nieoczekiwany błąd z bazą danych");
                }
            },
            error: function (xhr, status, error) {
                //console.log(xhr);
            },
        });
    }
    else {
        $("#login").animate({ right: "0%" }, 1000);
    }

}

function showPosition(position) {
    var newSearch = position.coords.latitude + "," + position.coords.longitude;
    console.log(newSearch);
    if (control)
        getPositionFromLatLon(newSearch)
    else
        savePosition(position.coords.latitude, position.coords.longitude)
}

function getPositionFromLatLon(newSearch) {
    getCookieMapStyle();
    $.ajax({
        url: "php/Geoposition.php",
        data: { search: newSearch },
        type: "POST",
        success: function (data) {
            var obj = JSON.parse(JSON.parse(data));
            console.log("obj ", obj);
            if (obj.Message == "The allowed number of requests has been exceeded.") {
                console.log("wyczerpano liczbę użyć  klucza");
            }
            else {
                console.log("key======> " + obj.LocalizedName);
                console.log("obj======> " + obj.Key);
                console.log("long======> " + obj.GeoPosition.Longitude);
                $("#search").val(obj.LocalizedName);
                initMap(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude, 13, "map", mapStyleName, true, 1);
                createWeatherContainer();
                getWeather(obj.Key);
                lastSearch(obj.LocalizedName, obj.Key)
                $("#positionInfo")
                    .css("display", "none");
            }
        },
        error: function (xhr, status, error) {
            //console.log(xhr);
        },
    });
}

function getWeatherFromKey(toSearch){
    $.ajax({
        url: "php/getLocation.php",
        data: { search: toSearch},
        type: "POST",
        success: function (data) {
            var obj = JSON.parse(JSON.parse(data));
            $("#searchAutoComplete").empty();
            initMap(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude, 13, "map", mapStyleName, true, 1);
            //console.log(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude);
            createWeatherContainer();
            getWeather(toSearch);
            $("#adminPage").animate({ right: "-120%" }, 500);
        },
        error: function (xhr, status, error) {
            //console.log(xhr);
        },
    });
}

function lastSearch(city, toSearch) {
    var id = getCookie('userID');
    $.ajax({
        url: "php/lastSearch.php",
        data: { search: toSearch, city: city, userID: id },
        type: "POST",
        success: function (data) {
            var obj = JSON.parse(JSON.parse(data));
            $("#searchAutoComplete").empty();
            initMap(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude, 13, "map", mapStyleName, true, 1);
            //console.log(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude);
            createWeatherContainer();
            getWeather(toSearch);
        },
        error: function (xhr, status, error) {
            //console.log(xhr);
        },
    });
}
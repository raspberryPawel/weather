var mapStyleName = grayMapStyle;
$(document).ready(function () {
    // get skins for google maps
    getCookieMapStyle();
    // get location and search weather
    $("#loc").on("click", function () {
        Settings.control = true;
        getLocation();
    });
    // save location and show on map in account page
    $("#save").on("click", function () {
        Settings.control = false;
        getLocation();
    });
    // search in search box | show city prompt
    $("#search").on("input", function () {
        let toSearch = this.value;
        searchFocusClick(toSearch)
    });
    // search in search box | show city prompt
    $("#search").on("click", function () {
        let toSearch = this.value;
        searchFocusClick(toSearch)
    });
    // show default city weather or init clear map
    var cityId = getCookie('defaultCity');
    if (cityId != null && cityId != "") {
        getWeatherFromKey(cityId.split("%26")[0])
    }
    else {
        setTimeout(function () { initMap("52.232", "21.007", 5, "map", mapStyleName, true, 1); }, 1000)
    }

});
//click city option in prompt box
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

function searchFocusClick(toSearch) {
    $("#searchAutoComplete")
        .empty()
        .css("height", "0px")
        .css("padding", "0 0 0 0");
    let newSearch = repleacePolishLetters(toSearch);

    $.ajax({
        url: "php/AutoCompleteSearch.php",
        data: { search: newSearch },
        type: "POST",
        success: function (data) {
            var obj = JSON.parse(JSON.parse(data));
            if (obj.Message == "The allowed number of requests has been exceeded.") {
                $("#positionInfo div")
                    .css("opacity", "0");
                $("#positionInfo h1")
                    .html("Wyczerpano liczbę użyć  klucza API");
                $("#positionInfo").css("display", "flex").animate({ width: "100%" }, 500);
            }
            else if (obj.Message == "Api Authorization failed") {
                $("#positionInfo div")
                    .css("opacity", "0");
                $("#positionInfo h1")
                    .html("Api Authorization failed");
                $("#positionInfo").css("display", "flex").animate({ width: "100%" }, 500);
            }
            else {
                var optionLength;
                if (obj.length > 5)
                    optionLength = 5;
                else
                    optionLength = obj.length;

                var length = 0;
                for (var i = 0; i < optionLength; i++) {
                    let div = $("<div>")
                        .attr("class", "completeOption")
                        .attr("key", obj[i].Key)
                        .html(obj[i].LocalizedName + ", " + obj[i].AdministrativeArea.LocalizedName + ", " + obj[i].Country.LocalizedName)
                        .on("click", optionClick);
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

}
// get skins name for google map from cookie
function getCookieMapStyle() {
    var x = getCookie('mapStyle');
    if (x != null && x != "") {
        mapStyleName = window[x];
    }
    else {
        mapStyleName = grayMapStyle;
    }
}
// create div for weather
function createWeatherContainer() {
    var div = $("<div>")
        .attr("id", "weatherInfo");
    var hide = $("<div>")
        .attr("id", "hideWeather")
        .html("Ukryj pogodę <i class='fas fa-arrow-down'></i>")
        .on("click", hideWeather);
    div.append(hide);
    $("#map").append(div);
}
// hide weather div
function hideWeather() {
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
}
//repleace polish letters for UTF8 
function repleacePolishLetters(toSearch) {
    let sign = Settings.sign;
    let signUTF = Settings.signUTF;
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
    newSearch.replace(/\+/g, '');
    return newSearch;
}

//get location cords
function getLocation() {
    $("#positionInfo div")
        .css("opacity", "1");
    $("#positionInfo h1")
        .html("Określamy Twoją lokalizację");
    if (navigator.geolocation) {
        $("#positionInfo").css("display", "flex").animate({ width: "100%" }, 500);
        navigator.geolocation.getCurrentPosition(showPosition);
        setTimeout(function () {
            $("#posInfo")
                .html("Przykro mi, wystąpił błąd z lokalizacją na Twoim urządzeniu. <br> Spróbuj ponownie");
            $("#positionInfo div")
                .css("transition", "1s")
                .css("opacity", "0");
            setTimeout(function () {
                $("#positionInfo").animate({ width: "0%" }, 500);
                setTimeout(function () {
                    $("#positionInfo").css("display", "none");
                }, 1000);
            }, 5000);
        }, 15000);
    } else {
        $("#posInfo")
            .html("Twoja przeglądarka nie wspiera usługi lokalizacji, zostanie ona określona na podstawie adresu IP dostawcy Twojego internetu.");
        $("#positionInfo").animate({ width: "100%" }, 500);
        $.getJSON('http://ip-api.com/json?callback=?', function (data) {
            var position = data;
            var newSearch = position.lat + "," + position.lon;
            if (Settings.control)
                getPositionFromLatLon(newSearch)
            else
                savePosition(position.lat, position.lon)
        });
    }
}
//savve position in map
function savePosition(lat, lon) {
    var id = getCookie('userID');
    if (id != null && id != '') {
        $.ajax({
            url: "php/SavePosition.php",
            data: { latitude: lat, longitude: lon, userID: id, },
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(JSON.parse(data));
                if (obj == true) {
                    $("#positionInfo").animate({ width: 0 }, 1000);
                }
                else {
                    // console.log("wystąpił nieoczekiwany błąd z bazą danych");
                }
            },
            error: function (xhr, status, error) {
                //console.log(xhr);
            },
        });
    }
    else {
        $("#login").animate({ width: "100%" }, 1000);
    }

}

function showPosition(position) {
    var newSearch = position.coords.latitude + "," + position.coords.longitude;
    if (Settings.control)
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
            if (obj.Message == "The allowed number of requests has been exceeded.") {
                $("#positionInfo div")
                    .css("opacity", "0");
                $("#positionInfo h1")
                    .html("Wyczerpano liczbę użyć  klucza API");
                $("#positionInfo").animate({ width: "100%" }, 500);
            }
            else if (obj.Message == "Api Authorization failed") {
                $("#positionInfo div")
                    .css("opacity", "0");
                $("#positionInfo h1")
                    .html("Api Authorization failed");
                $("#positionInfo").animate({ width: "100%" }, 500);
            }
            else {
                $("#search").val(obj.LocalizedName);
                initMap(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude, 13, "map", mapStyleName, true, 1);
                createWeatherContainer();
                Settings.curentLat = obj.GeoPosition.Latitude;
                Settings.curentLan = obj.GeoPosition.Longitude;
                getWeather(obj.Key);
                lastSearch(obj.LocalizedName, obj.Key)
                $("#positionInfo").animate({ width: "0%" }, 1000);
            }
        },
        error: function (xhr, status, error) {
            //console.log(xhr);
        },
    });
}
// get weather from city key in accuweather api
function getWeatherFromKey(toSearch) {
    $.ajax({
        url: "php/getLocation.php",
        data: { search: toSearch },
        type: "POST",
        success: function (data) {
            var obj = JSON.parse(JSON.parse(data));
            if (obj.Message == "The allowed number of requests has been exceeded.") {
                $("#positionInfo div")
                    .css("opacity", "0");
                $("#positionInfo h1")
                    .html("Wyczerpano liczbę użyć  klucza API");
                $("#positionInfo").animate({ width: 0 }, 500);
            }
            else if (obj.Message == "Api Authorization failed") {
                $("#positionInfo div")
                    .css("opacity", "0");
                $("#positionInfo h1")
                    .html("Api Authorization failed");
                $("#positionInfo").animate({ width: 0 }, 500);
            }
            else {
                $("#search").val(obj.LocalizedName);
                $("#searchAutoComplete").empty();
                initMap(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude, 13, "map", mapStyleName, true, 1);
                Settings.curentLat = obj.GeoPosition.Latitude;
                Settings.curentLan = obj.GeoPosition.Longitude;
                createWeatherContainer();
                getWeather(toSearch);
                $("#adminPage").animate({ width: "0%" }, 500);
                setTimeout(function () {
                    $("#adminPage").css("display", "none");
                }, 500);
            }
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
            // var obj = JSON.parse(JSON.parse(data));
            // $("#searchAutoComplete").empty();
            // initMap(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude, 13, "map", mapStyleName, true, 1);
            // createWeatherContainer();
            // getWeather(toSearch);
        },
        error: function (xhr, status, error) {
            //console.log(xhr);
        },
    });
}
$(document).ready(function () {
    var sign = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'];
    var signUTF = ['%C4%85 ', '%C4%87 ', '%C4%99', '%C5%82', '%C5%84', '%C3%B3', '%C5%9B', '%C5%BA', '%C5%BC'];

    $("#search").on("input", function () {
        $("#searchAutoComplete")
            .empty()
            .css("height", "0px");
        //console.log(this.value);
        let toSearch = this.value;
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

        $.ajax({
            url: "php/AutoCompleteSearch.php",
            data: { search: newSearch },
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(JSON.parse(data));
                console.log("obj ", obj.Message);
                if (obj.Message == "The allowed number of requests has been exceeded.") {
                    console.log("chuj");
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
                        length += 48;
                        $("#searchAutoComplete")
                            .append(div)
                            .css("transition", "1s")
                            .css("height", length);
                    }
                }
            },
            error: function (xhr, status, error) {
                //console.log(xhr);
            },
        });
    });

    function optionClick() {
        console.log("to klucz miasta ==>  ", this.innerHTML);
        var city = this.innerHTML;
        $("#search").val(city);
        let toSearch = this.attributes.key.value;
        $.ajax({
            url: "php/getLocation.php",
            data: { search: toSearch },
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(JSON.parse(data));
                console.log("obj ", obj);
                console.log("obj geoposition ===> ", obj.GeoPosition);
                console.log("obj latitude == >", obj.GeoPosition.Latitude);
                console.log("obj Longitude ===> ", obj.GeoPosition.Longitude);
                $("#searchAutoComplete").empty();
                initMap(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude);
                var div = $("<div>")
                    .attr("id", "weatherInfo");
                $("#map").append(div);
                getWeather(toSearch);
            },
            error: function (xhr, status, error) {
                //console.log(xhr);
            },
        });
    }

    function initMap(latitude, longitude) {
        var myLatLng = { lat: latitude, lng: longitude };

        // Create a map object and specify the DOM element
        // for display.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 13,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                }
            ]
        });

        // Create a marker and set its position.
        var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            title: 'Hello World!',
            icon: 'images/marker.png' // null = default icon
        });
    }
});

function getWeather(toSearch) {
    var data = new Date();
    var hour = data.getHours();
    var todayIsDay = data.getDay();

    console.log("godzina: ", hour);
    var dayVisible = "flex";
    var nightVisible = "none";

    if (hour > 18) {
        dayVisible = "none";
        nightVisible = "flex";
    }
    var days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    $.ajax({
        url: "php/getWeather.php",
        data: { search: toSearch },
        type: "POST",
        success: function (data) {
            var obj = JSON.parse(JSON.parse(data));
            console.log("obj ", obj);
            console.log("obj DailyForecasts ===> ", obj.DailyForecasts);
            var order = 0;
            for (var i = 0; i < 4; i++) {
                if(todayIsDay + i > 6)
                    var today = days[-2 + i];
                else
                var today = days[todayIsDay + i];
                
                let div = $("<div>")
                    .attr("class", "DailyWeather")
                    .css("order", order);
                order++;
                let image = $("<div>")
                    .attr("class", "weatherImage")
                    .css("background-image", "url(images/Sun.png)");
                var t = Math.floor((obj.DailyForecasts[i].Temperature.Maximum.Value - 32) / 1.8);
                let temperature = $("<div>")
                    .attr("class", "weatherTemperature")
                    .html(t + "<span>&deg;</span>");
                let todayIs = $("<div>")
                    .attr("class", "weatherToday")
                    .html(today);
                var speed = Math.floor(obj.DailyForecasts[i].Day.Wind.Speed.Value * 1.61)
                let wind = $("<div>")
                    .attr("class", "weatherWind")
                    .html("<i class='fas fa-wind'></i>  " + speed + "km/h");
                let weatherState = $("<div>")
                    .attr("class", "weatherState")
                    .html(obj.DailyForecasts[i].Day.IconPhrase);
                let iD = $("<i>")
                    .attr("class", "fas fa-moon")
                    .on("click", function () {
                        let day = this.parentNode.parentNode.children[0];
                        let night = this.parentNode.parentNode.children[1];
                        day.style.display = "none"; // css("display", "none");
                        night.style.display = "flex"; //css("display", "flex");
                    });
                let day = $("<div>")
                    .attr("class", "DailyWeatherDay")
                    .css("display", dayVisible)
                    .append(iD)
                    .append(image)
                    .append(todayIs)
                    .append(temperature)
                    .append(wind)
                    .append(weatherState);

                let imageN = $("<div>")
                    .attr("class", "weatherImage")
                    .css("background-image", "url(images/Moon.png)");
                var t = Math.floor((obj.DailyForecasts[i].Temperature.Minimum.Value - 32) / 1.8);
                let temperatureN = $("<div>")
                    .attr("class", "weatherTemperature")
                    .html(t + "<span>&deg;</span>");
                let iN = $("<i>")
                    .attr("class", "fas fa-sun")
                    .on("click", function () {
                        let day = this.parentNode.parentNode.children[0];
                        let night = this.parentNode.parentNode.children[1];
                        day.style.display = "flex"; //("display", "flex");
                        night.style.display = "none"; //.css("display", "none");
                    });
                let todayIsN = $("<div>")
                    .attr("class", "weatherToday")
                    .html(today);
                var speed = Math.floor(obj.DailyForecasts[i].Night.Wind.Speed.Value * 1.61)
                let windN = $("<div>")
                    .attr("class", "weatherWind")
                    .html("<i class='fas fa-wind'></i>  " + speed + "km/h");
                let weatherStateN = $("<div>")
                    .attr("class", "weatherState")
                    .html(obj.DailyForecasts[i].Night.IconPhrase);
                let night = $("<div>")
                    .css("display", nightVisible)
                    .attr("class", "DailyWeatherNight")
                    .append(iN)
                    .append(imageN)
                    .append(todayIsN)
                    .append(temperatureN)
                    .append(windN)
                    .append(weatherStateN);

                div
                    .append(day)
                    .append(night);
                $("#weatherInfo").append(div);
                // + ", " + obj.DailyForecasts[i].Temperature.Maximum.Value + ", " + obj.DailyForecasts[i].Day.IconPhrase + ", " + obj.DailyForecasts[i].Night.IconPhrase            
            }
        },
        error: function (xhr, status, error) {
        },
    });
}

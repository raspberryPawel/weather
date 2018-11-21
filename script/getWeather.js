
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
            if (obj.Message == "The allowed number of requests has been exceeded.") {
                console.log("wyczerpano liczbę użyć  klucza");
            }
            else {
                for (var i = 0; i < 4; i++) {
                    if (todayIsDay + i == 7) {
                        var today = days[0];
                    }
                    else if (todayIsDay + i == 8) {
                        var today = days[1];
                    }
                    else if (todayIsDay + i == 9) {
                        var today = days[2];
                    }
                    else if (todayIsDay + i == 10) {
                        var today = days[3];
                    }
                    else {
                        var today = days[todayIsDay + i];
                    }
                    var dayState = obj.DailyForecasts[i].Day.Icon;
                    var nightState = obj.DailyForecasts[i].Night.Icon;
                    console.log("daystate=>> ", dayState);
                    console.log("nightstate=>> ", nightState);

                    var dayImage = "suncloud.png";
                    var nightImage = "mooncloud.png";

                    if (dayState >= 1 && dayState <= 3) {
                        dayImage = "sun.png";
                    }
                    else if (dayState >= 4 && dayState <= 5 || dayState >= 20 && dayState <= 21 || dayState == 32) {
                        dayImage = "suncloud.png";
                    }
                    else if (dayState >= 6 && dayState <= 8) {
                        dayImage = "cloud.png";
                    }
                    else if (dayState >= 12 && dayState <= 14 || dayState == 18) {
                        dayImage = "rain.png";
                    }
                    else if (dayState >= 15 && dayState <= 17) {
                        dayImage = "thunder.png";
                    }
                    else if (dayState >= 22 && dayState <= 29 || dayState == 31 || dayState >= 43 && dayStates <= 44 || dayState == 19) {
                        dayImage = "snow.png";
                    }
                    else if (dayState == 11) {
                        dayImage = "fog.png";
                    }


                    if (nightState >= 33 && nightState <= 34) {
                        nightImage = "blood.png";
                    }
                    else if (nightState >= 35 && nightState <= 37) {
                        nightImage = "mooncloud.png";
                    }
                    else if (nightState == 38) {
                        nightImage = "cloud.png";
                    }
                    else if (nightState >= 39 && nightState <= 40) {
                        nightImage = "rain.png";
                    }
                    else if (nightState >= 41 && nightState <= 42) {
                        nightImage = "thunder.png";
                    }
                    else if (nightState >= 43 && nightState <= 44 || nightState >= 24 && nightState <= 29) {
                        nightImage = "snow.png";
                    }


                    var t;
                    var speed;
                    let div;
                    let day;
                    ({ t, speed, div, day } = createDayElements(obj, i, today, dayVisible, dayImage));

                    var { t, speed, night } = createNightElement(t, obj, i, today, speed, nightVisible, nightImage);

                    div
                        .append(day)
                        .append(night);
                    $("#weatherInfo").append(div);
                    // + ", " + obj.DailyForecasts[i].Temperature.Maximum.Value + ", " + obj.DailyForecasts[i].Day.IconPhrase + ", " + obj.DailyForecasts[i].Night.IconPhrase            
                }
            }
        },
        error: function (xhr, status, error) {
        },
    });
}

function createNightElement(t, obj, i, today, speed, nightVisible, nightImage) {
    let imageN = $("<div>")
        .attr("class", "weatherImage")
        .css("background-image", "url(images/night/" + nightImage + ")");
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
    var speed = Math.floor(obj.DailyForecasts[i].Night.Wind.Speed.Value * 1.61);
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
    return { t, speed, night };
}

function createDayElements(obj, i, today, dayVisible, dayImage) {
    let div = $("<div>")
        .attr("class", "DailyWeather")
    let image = $("<div>")
        .attr("class", "weatherImage")
        .css("background-image", "url(images/day/" + dayImage + ")");
    var t = Math.floor((obj.DailyForecasts[i].Temperature.Maximum.Value - 32) / 1.8);
    let temperature = $("<div>")
        .attr("class", "weatherTemperature")
        .html(t + "<span>&deg;</span>");
    let todayIs = $("<div>")
        .attr("class", "weatherToday")
        .html(today);
    var speed = Math.floor(obj.DailyForecasts[i].Day.Wind.Speed.Value * 1.61);
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
    return { t, speed, div, day };
}

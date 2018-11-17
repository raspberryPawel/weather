
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
                var order = 0;
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
                    var t;
                    var speed;
                    let div;
                    let day;
                    ({ t, speed, div, day, order } = createDayElements(order, obj, i, today, dayVisible));

                    var { t, speed, night } = createNightElement(t, obj, i, today, speed, nightVisible);

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

function createNightElement(t, obj, i, today, speed, nightVisible) {
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

function createDayElements(order, obj, i, today, dayVisible) {
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
    return { t, speed, div, day, order };
}

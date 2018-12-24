

//number is from the Accuweather Api images 
function getNightImage(nightState, nightImage, nightImage2, animationNight) {
    if (nightState >= 33 && nightState <= 34) {
        nightImage = "blood.png";
    }
    if (nightState >= 35 && nightState <= 37) {
        nightImage2 = "suncloud.png";
    }
    if (nightState == 38) {
        nightImage2 = "cloud.png";
    }
    if (nightState >= 39 && nightState <= 40) {
        nightImage = "rain.png";
        nightImage2 = "rain1.png";
        animationNight = "snow";
    }
    if (nightState >= 41 && nightState <= 42) {
        nightImage = "thunder.png";
        nightImage2 = "rain1.png";
        animationNight = "snow";
    }
    if (nightState >= 43 && nightState <= 44 || nightState >= 24 && nightState <= 29) {
        nightImage = "snow.png";
        nightImage2 = "snow2.png";
        animationNight = "snow";
    }
    return { nightImage, nightImage2, animationNight };
}

function getDayImage(dayState, dayImage2, nightState, nightImage2, dayImage, animationDay, nightImage, animationNight) {
    if (dayState >= 1 && dayState <= 3) {
        dayImage2 = "clear.png";
    }
    if (dayState >= 4 && dayState <= 5 || dayState >= 20 && dayState <= 21 || dayState == 32) {
        dayImage2 = "suncloud.png";
    }
    if (nightState >= 4 && nightState <= 5 || nightState >= 20 && nightState <= 21 || nightState == 32) {
        animationTimeN = 40;
        nightImage2 = "suncloud.png";
    }
    if (dayState >= 6 && dayState <= 8) {
        dayImage2 = "cloud.png";
    }
    if (nightState >= 6 && nightState <= 8) {
        animationTimeN = 40;
        nightImage2 = "cloud.png";
    }
    if (dayState >= 12 && dayState <= 14 || dayState == 18) {
        dayImage = "rain.png";
        dayImage2 = "rain1.png";
        animationDay = "snow";
    }
    if (nightState >= 12 && nightState <= 14 || nightState == 18) {
        nightImage = "rain.png";
        nightImage2 = "rain1.png";
        animationNight = "snow";
    }
    if (dayState >= 15 && dayState <= 17) {
        dayImage = "thunder.png";
        dayImage2 = "rain1.png";
        animationDay = "snow";
    }
    if (dayState >= 22 && dayState <= 29 || dayState == 31 || dayState >= 43 && dayStates <= 44 || dayState == 19) {
        dayImage = "snow.png";
        dayImage2 = "snow2.png";
        animationDay = "snow";
    }
    if (nightState >= 22 && nightState <= 29 || nightState == 31 || nightState >= 43 && nightState <= 44 || nightState == 19) {
        nightImage = "snow.png";
        nightImage2 = "snow2.png";
        animationNight = "snow";
    }
    if (dayState == 11) {
        dayImage = "fog.png";
    }
    return { dayImage2, nightImage2, dayImage, animationDay, nightImage, animationNight };
}

function getDayName(todayIsDay, i) {
    if (todayIsDay + i == 7) {
        var today = Settings.days[0];
    }
    else if (todayIsDay + i == 8) {
        var today = Settings.days[1];
    }
    else if (todayIsDay + i == 9) {
        var today = Settings.days[2];
    }
    else if (todayIsDay + i == 10) {
        var today = Settings.days[3];
    }
    else {
        var today = Settings.days[todayIsDay + i];
    }
    return today;
}

function createNightElement(t, obj, i, today, speed, nightVisible, nightImage, nightImage2, animation) {
    let imageN = $("<div>")
        .attr("class", "weatherImage")
        .css("background-image", "url(images/night/" + nightImage + ")")
    let imageN2 = $("<div>")
        .attr("class", "weatherImage2")
        .css("background-image", "url(images/day/" + nightImage2 + ")")
        .css("animation", "" + animation + " 1200s linear infinite");

    var t = Math.floor((obj.DailyForecasts[i].Temperature.Minimum.Value - 32) / 1.8);
    let temperatureN = $("<div>")
        .attr("class", "weatherTemperature")
        .html(t + "<span>&deg;</span>");
    let iN = $("<i>")
        .attr("class", "fas fa-moon")
        .on("click", function () {
            let day = this.parentNode.parentNode.children[0];
            let night = this.parentNode.parentNode.children[1];
            day.style.display = "flex";
            night.style.display = "none";
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
    imageN.append(imageN2);
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

function createDayElements(obj, i, today, dayVisible, dayImage, dayImage2, animation) {
    let div = $("<div>")
        .attr("class", "DailyWeather")
    let image = $("<div>")
        .attr("class", "weatherImage")
        .css("background-image", "url(images/day/" + dayImage + ")");
    let image2 = $("<div>")
        .attr("class", "weatherImage2")
        .css("background-image", "url(images/day/" + dayImage2 + ")")
        .css("animation", "" + animation + " 1200s linear infinite");
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
        .attr("class", "fas fa-sun")
        .on("click", function () {
            let day = this.parentNode.parentNode.children[0];
            let night = this.parentNode.parentNode.children[1];
            day.style.display = "none";
            night.style.display = "flex";
        });
    image.append(image2);
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

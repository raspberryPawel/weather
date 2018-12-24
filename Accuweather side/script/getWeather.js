
function getWeather(toSearch) {
    var data = new Date();
    var hour = data.getHours();
    var todayIsDay = data.getDay();

    var dayVisible = "flex";
    var nightVisible = "none";
    // day/night visible
    if (hour > 18) {
        dayVisible = "none";
        nightVisible = "flex";
    }

    $.ajax({
        url: "php/getWeather.php",
        data: { search: toSearch },
        type: "POST",
        success: function (data) {
            var obj = JSON.parse(JSON.parse(data));
            if (obj.Message == "The allowed number of requests has been exceeded.") {
                $("#positionInfo div")
                    .css("opacity", "0");
                $("#positionInfo h1")
                    .html("Wyczerpano liczbę użyć klucza API");
                $("#positionInfo").animate({ right: "0%" }, 500);
            }
            else {
                for (var i = 0; i < 4; i++) {
                    //get day name
                    var today = getDayName(todayIsDay, i);

                    var dayState = parseInt(obj.DailyForecasts[i].Day.Icon);
                    var nightState = parseInt(obj.DailyForecasts[i].Night.Icon);

                    var dayImage = "sun.png";
                    var nightImage = "moon.png";
                    var dayImage2 = "clear.png";
                    var nightImage2 = "clear.png";
                    var animationDay = "cloud";
                    var animationNight = "cloud";
                    //get image for day
                    ({ dayImage2, nightImage2, dayImage, animationDay, nightImage, animationNight } = getDayImage(dayState, dayImage2, nightState, nightImage2, dayImage, animationDay, nightImage, animationNight));

                    //get image for night
                    ({ nightImage, nightImage2, animationNight } = getNightImage(nightState, nightImage, nightImage2, animationNight));

                    var t;
                    var speed;
                    let div;
                    let day;
                    //create card and Elements for day
                    ({ t, speed, div, day } = createDayElements(obj, i, today, dayVisible, dayImage, dayImage2, animationDay));
                    //create card and elements for night
                    var { t, speed, night } = createNightElement(t, obj, i, today, speed, nightVisible, nightImage, nightImage2, animationNight);

                    div
                        .append(day)
                        .append(night);
                    $("#weatherInfo").append(div);
                }
            }
        },
        error: function (xhr, status, error) {
        },
    });
}

$(document).ready(function () {
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
        $("#searchAutoComplete")
            .css("transition", "1s")
            .css("height", "0px")
            .css("padding", "0 0 0 0");

        var city = this.innerHTML;
        $("#search").val(city);
        let toSearch = this.attributes.key.value;
        $.ajax({
            url: "php/getLocation.php",
            data: { search: toSearch },
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(JSON.parse(data));
                $("#searchAutoComplete").empty();
                initMap(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude, 13);
                //console.log(obj.GeoPosition.Latitude, obj.GeoPosition.Longitude);
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
                                .html('Pokaż pogodę <i class="fas fa-arrow-up"></i>')
                        }
                        else {
                            $("#weatherInfo")
                                .css("transition", "1s")
                                .css("top", "0%");
                            $("#hideWeather")
                                .html("Ukryj pogodę <i class='fas fa-arrow-down'></i>")
                        }

                    });
                $("#map").append(hide).append(div);
                getWeather(toSearch);
            },
            error: function (xhr, status, error) {
                //console.log(xhr);
            },
        });
    }
    setTimeout(function () { initMap("52.232", "21.007", 5); }, 1000)
});

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


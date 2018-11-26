var stylesTab = [
    { styleName: "multiMapStyle", name: multiMapStyle, visibleName: "Multi Brand Network", id: "mapMulti" },
    { styleName: "lightMapStyle", name: lightMapStyle, visibleName: "Light Grey", id: "mapLight" },
    { styleName: "paleMapStyle", name: paleMapStyle, visibleName: "Pale Dawn", id: "mapPale" },
    { styleName: "assinMapStyle", name: assinMapStyle, visibleName: "Assassin's Creed IV", id: "mapAssassin" },
    { styleName: "appleMapStyle", name: appleMapStyle, visibleName: "Apple Maps-esque", id: "mapApple" },
    { styleName: "grayMapStyle", name: grayMapStyle, visibleName: "Shades of Grey", id: "mapShades" },
    { styleName: "natureMapStyle", name: natureMapStyle, visibleName: "Nature", id: "mapNature" },
    { styleName: "bentleyMapStyle", name: bentleyMapStyle, visibleName: "Bentley", id: "mapBentley" },
    { styleName: "cobaltMapStyle", name: cobaltMapStyle, visibleName: "Cobalt custom", id: "mapCobalt" },
    { styleName: "sinCityMapStyle", name: sinCityMapStyle, visibleName: "Sin City", id: "mapSinCity" },
    { styleName: "redMapStyle", name: redMapStyle, visibleName: "Red Map", id: "mapRed" },
    { styleName: "lightMonochromeMapStyle", name: lightMonochromeMapStyle, visibleName: "Light Monochrome Bluish", id: "mapLightMonochrome" },
    { styleName: "lightGreenMapStyle", name: lightGreenMapStyle, visibleName: "Light Green", id: "mapGreen" },
]

var pinsTab = [
    "pin0",
    "pin1",
    "pin2",
    "pin3",
    "pin4",
    "pin5",
    "pin6",
    "pin7",
    "pin8",
    "pin9",
    "pin10",
    "pin11",
    "pin12",
]


$(document).ready(function () {
    //tolltip
    $('[data-toggle="tooltip"]').tooltip();
    // wysuwane menu
    var click = 0;
    $("#menu-button").on("click", function () {
        click = show_Menu(click);
        var x = getCookie('userName');
        if (x == null) {
            $("#online").css("display", "none");
            $("#offline").css("display", "block");
        }
        else {
            $("#offline").css("display", "none");
            $("#online").css("display", "block");
        }
        console.log("cookie: ==> ", x);
    });
    //hide login panel
    $("#loginCancel").on("click", function () {
        //$("#login").css("transition", "2s").css("top", "-1000%");
        $("#login").animate({ right: "-120%" }, 500);
    });
    //hide register panel
    $("#registerCancel").on("click", function () {
        //$("#registerForm").css("transition", "2s").css("top", "-1000%");
        $("#registerForm").animate({ right: "-120%" }, 500);
    });
    //show login panel
    $("#sigIn").on("click", function () {
        //$("#login").css("transition", "1s").css("top", "0%");
        $("#login").animate({ right: "0%" }, 1000);
        click = show_Menu(click);
    });
    //show register panel
    $("#register").on("click", function () {
        //$("#registerForm").css("transition", "1s").css("top", "0%");
        $("#registerForm").animate({ right: "0%" }, 1000);
        click = show_Menu(click);
    });

    //logout
    $("#logout").on("click", function () {
        deleteCookie('userName');
        //$("#login").css("transition", "2s").css("top", "-1000%");
        $("#login").animate({ right: "-120%" }, 500);
        click = show_Menu(click);
    });
    //admin page sidebar 
    $("#dismiss").on("click", function () {
        $("#adminPage nav").animate({ left: "-350px" }, 500);
    });

    $("#show").on("click", function () {
        $("#adminPage nav").animate({ left: "0px" }, 500);
    });

    $("#account").on("click", function () {
        //$("#adminPage").css("transition", "2s").css("right", "0%");
        $("#adminPage").animate({ right: "0px" }, 1000);
        click = show_Menu(click);
    });

    //hide register panel
    $("#adminPageCancel").on("click", function () {
        //$("#adminPage").css("transition", "2s").css("top", "-1000%");
        $("#adminPage").animate({ right: "-120%" }, 500);
    });
    $("#design").on("click", function () {
        $("#adminPage nav").animate({ left: "-300px" }, 500);
        $("#content")
            .empty()
            .html("<h1>Design mapy:</h1>");
        stylesTab.forEach(element => {
            var container = $("<div>")
                .attr("class", "mapContainer")
                .attr("mapName", element.styleName)
            var h1 = $("<h1>")
                .html(element.visibleName)
            var map = $("<div>")
                .attr("class", "exampleMap")
                .attr("id", element.id)
            var input = $("<input>")
                .attr("class", "styleCheckbox")
                .attr("type", "checkbox")
                .attr("mapName", element.styleName)
                .on("click", function () {
                    var checkbox = $(".styleCheckbox");
                    console.log(checkbox);
                    for (var i = 0; i < checkbox.length; i++) {
                        checkbox[i].checked = false;
                    }
                    setCookie("mapStyle", this.attributes.mapName.value, 1000, 2, 2, 1);
                    this.checked = true;
                    initMap("52.232", "21.007", 5, "map", window[this.attributes.mapName.value], true, 1);
                });
            container
                .append(h1)
                .append(input)
                .append(map);
            $("#content")
                .append(container);
            initMap("52.232", "21.007", 12, element.id, element.name, true, 1);
        });
    });

    $("#pinDesign").on("click", function () {
        $("#adminPage nav").animate({ left: "-300px" }, 500);
        $("#content")
            .empty()
            .html("<h1>Design pinezki:</h1>");
        pinsTab.forEach(element => {
            var container = $("<div>")
                .attr("class", "pinsContainer")
                .css("background-image", "url(images/GooglePinsBig/" + element + ".png)")

            var input = $("<input>")
                .attr("class", "styleCheckbox")
                .attr("pinsName", element)
                .attr("type", "checkbox")
                .on("click", function () {
                    var checkbox = $(".styleCheckbox");
                    console.log(checkbox);
                    for (var i = 0; i < checkbox.length; i++) {
                        checkbox[i].checked = false;
                    }
                    setCookie("pinName", this.attributes.pinsName.value, 1000, 2, 2, 1);
                    this.checked = true;
                    initMap("52.232", "21.007", 5, "map", mapStyleName, true, 1);
                });
            container.append(input);
            $("#content")
                .append(container);
        });
    });

    $("#savePosition").on("click", function () {
        $("#adminPage nav").animate({ left: "-300px" }, 500);
        $("#content").empty();
        var map = $("<div>")
            .attr("id", "savePositionMap")
        $("#content").append(map);
        var id = getCookie('userID');
        $.ajax({
            url: "php/GetSavedPosition.php",
            data: { userID: id, },
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(data);
                getCookieMapStyle();
                initMap("52.232", "21.007", 5, "savePositionMap", mapStyleName, false, obj);
            },
            error: function (xhr, status, error) {
                //console.log(xhr);
            },
        });
    });

    $("#lastSearch").on("click", function () {
        console.log("chuj nie działa");
        $("#adminPage nav").animate({ left: "-300px" }, 500);
        $("#content").empty();
        var id = getCookie('userID');
        $.ajax({
            url: "php/GetLastSearch.php",
            data: { userID: id, },
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(data);
                console.log(obj);
                var ul = $("<ul>")
                obj.forEach(element => {
                    var div = $("<li>")
                        .attr("class", "lastSearchOption")
                        .attr("key", element.key)
                        .attr("searchID", element.id)
                        .html(element.name)
                        .on("click", function () {
                            console.log(this.attributes.key.value);
                            //console.log(this);
                            getWeatherFromKey(this.attributes.key.value)
                            var city = this.innerHTML;
                            $("#search").val(city);
                        });
                    ul.append(div);
                });
                $("#content")
                    .html("<h1>Ostatnio wyszukane:</h1>")
                    .append(ul);
                //getCookieMapStyle();
                //initMap("52.232", "21.007", 5, "savePositionMap", mapStyleName, false, obj);
            },
            error: function (xhr, status, error) {
                //console.log(xhr);
            },
        });
    });
});

function show_Menu(click) {
    if ($("#menu-button").children()[0].style.display == "block") {
        $("#menu-button").children()[0].style.display = "none";
        $("#menu-button").children()[1].style.display = "block";
    }
    else {
        $("#menu-button").children()[1].style.display = "none";
        $("#menu-button").children()[0].style.display = "block";
    }
    if (click % 2 == 0) {
        $('nav')
            .css("width", "100%")
            .css("transition", "1s");
        click++;
    }
    else {
        $('nav')
            .css("width", "0px")
            .css("transition", "1.2s");
        click++;
    }
    return click;
}
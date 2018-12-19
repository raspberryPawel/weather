$(document).ready(function () {
    //tolltip
    $('[data-toggle="tooltip"]').tooltip();
    //toogle rightside nav
    var click = 0;
    $("#menu-button").on("click", function () {
        click = show_Menu(click);
        //get login cookie
        var x = getCookie('userName');
        if (x == null) {
            $("#online").css("display", "none");
            $("#offline").css("display", "block");
        }
        else {
            $("#offline").css("display", "none");
            $("#online").css("display", "block");
        }
    });

    //show user register panel
    $("#register").on("click", function () {
        $("#registerForm").css("display", "flex").animate({ width: "100%" }, 1000);
        click = show_Menu(click);
    });
    //hide user register panel
    $("#registerCancel").on("click", function () {
        $("#registerForm").animate({ width: "0" }, 500);
        setTimeout(function () {
            $("#registerForm").css("display", "none");
        }, 500);
    });

    //show user login panel
    $("#sigIn").on("click", function () {
        $("#login").css("display", "flex").animate({ width: "100%" }, 1000);
        click = show_Menu(click);
    });
    //hide user login panel
    $("#loginCancel").on("click", function () {
        $("#login").animate({ width: "0" }, 500);
        setTimeout(function () {
            $("#login").css("display", "none");
        }, 500);
    });

    //user logout
    $("#logout").on("click", function () {
        deleteCookie('userName');
        //$("#login").css("transition", "2s").css("top", "-1000%");
        $("#login").animate({ width: "0" }, 500);
        setTimeout(function () {
            $("#login").css("display", "none");
        }, 500);
        click = show_Menu(click);
    });

    //show admin page sidebar 
    $("#show").on("click", function () {
        $("#adminPage nav").animate({ left: "0px" }, 300);
    });
    //hide admin page sidebar 
    $("#dismiss").on("click", function () {
        $("#adminPage nav").animate({ left: "-350px" }, 300);
    });

    //show user admin page
    $("#account").on("click", function () {
        var id = getCookie('userID');
        if ($("#content").html() == "") {
            getLastSearchAjax(id);
        }
        $("#adminPage").css("display", "flex").animate({ width: "100%" }, 1000);
        click = show_Menu(click);
    });
    //hide user admin page
    $("#adminPageCancel").on("click", function () {
        $("#adminPage nav").animate({ left: "-300px" }, 20);
        $("#adminPage").animate({ width: "0" }, 500);
        setTimeout(function () {
            $("#adminPage").css("display", "none");
        }, 500);
    });

    //show password recovery panel
    $("#forgotPassword").on("click", function () {
        $("#forgotPasswordPanel").css("display", "flex").animate({ width: "100%" }, 1000);
    });
    //hide password recovery panel
    $("#recoveryPasswordCancel").on("click", function () {
        $("#forgotPasswordPanel").animate({ width: "0" }, 500);
        setTimeout(function () {
            $("#forgotPasswordPanel").css("display", "none");
        }, 500);
    });

    //show contact panel
    $(".contactForm").on("click", function () {
        click = show_Menu(click);
        $("#contact").css("display", "flex");
        $("#contact").css("z-index", "199");
        $("#contact").animate({ opacity: "1" }, 1000);
        $("#contact").animate({ right: "0px" }, 1000);
    });
    //hide contact panel
    $("#contactCancel").on("click", function () {
        $("#contact").animate({ right: "-500%" }, 1000);
        $("#contact").animate({ opacity: "0" }, 1000);
        setTimeout(function () {
            $("#contact").css("z-index", "-1");
            setTimeout(function () {
                $("#contact").css("display", "none");
            }, 1000);
        }, 1000);
    });

    // send message
    $("#send").on("click", function () {
        $("#spiner").css("display", "block");
        send();
    });
    //select google map design
    mapDesignClick();
    //select google map pin design
    designGooglePinsClick();
    //save your position to DB
    savePOsitionClick();
    //select and change user settings
    userSettingsClick();
    //look at last search
    lastSearchClick();
});

function changePasswordClick() {
    $("#changePasswordSubmit").on("click", function () {
        var id = getCookie('userID');
        var password1 = $("#changePassword")[0].value;
        var password2 = $("#changePasswordTwo")[0].value;
        if (password1 == password2) {
            changePasswordAjax(id, password1);
        }
        else
            $("#changePasswordInfo").html("Hasła nie są identyczne");
    });
}

function mapDesignClick() {
    $("#design").on("click", function () {
        $("#adminPage nav").animate({ left: "-300px" }, 100);
        $("#content")
            .empty()
            .html("<h1>Design mapy:</h1>");
        var selectedMap = getCookie('mapStyle');
        Settings.stylesTab.forEach(element => {
            if (selectedMap != null && selectedMap != "" && selectedMap == element.styleName)
                var selected = true;
            else
                var selected = false;
            var container = $("<div>")
                .attr("class", "mapContainer")
                .attr("mapName", element.styleName);
            var h1 = $("<h1>")
                .html(element.visibleName);
            var map = $("<div>")
                .attr("class", "exampleMap")
                .attr("id", element.id);
            var input = $("<input>")
                .attr("class", "styleCheckbox")
                .attr("type", "checkbox")
                .attr("checked", selected)
                .attr("mapName", element.styleName)
                .on("click", function () {
                    var checkbox = $(".styleCheckbox");
                    for (var i = 0; i < checkbox.length; i++) {
                        checkbox[i].checked = false;
                    }
                    setCookie("mapStyle", this.attributes.mapName.value, 1000, 2, 2, 1);
                    $("#snackbar").html("Zmieniono design mapy").attr("class", "show");
                    setTimeout(function () { $("#snackbar").attr("class", ""); }, 3000);
                    this.checked = true;
                    var weather = $("#weatherInfo").html();
                    if (weather != "" && weather != null) {
                        initMap(Settings.curentLat, Settings.curentLan, 13, "map", window[this.attributes.mapName.value], true, 1);
                        createWeatherContainer();
                        $("#weatherInfo").html(weather);
                        $("#hideWeather")
                            .html("Ukryj pogodę <i class='fas fa-arrow-down'></i>")
                            .on("click", hideWeather);
                    }
                    else
                        initMap("52.232", "21.007", 5, "map", window[this.attributes.mapName.value], true, 1);
                });
            container
                .append(h1)
                .append(input)
                .append('<span class="checkmark"></span>')
                .append(map);
            $("#content")
                .append(container);
            initMap("52.232", "21.007", 12, element.id, element.name, true, 1);
        });
    });
}

function designGooglePinsClick() {
    $("#pinDesign").on("click", function () {
        $("#adminPage nav").animate({ left: "-300px" }, 100);
        $("#content")
            .empty()
            .html("<h1>Design pinezki:</h1>");
        var selectedPin = getCookie('pinName');
        Settings.pinsTab.forEach(element => {
            if (selectedPin != null && selectedPin != "" && selectedPin == element)
                var selected = true;
            else
                var selected = false;
            var container = $("<div>")
                .attr("class", "pinsContainer")
                .css("background-image", "url(images/GooglePinsBig/" + element + ".png)");
            var input = $("<input>")
                .attr("class", "styleCheckbox")
                .attr("pinsName", element)
                .attr("checked", selected)
                .attr("type", "checkbox")
                .on("click", function () {
                    getCookieMapStyle();
                    var checkbox = $(".styleCheckbox");
                    for (var i = 0; i < checkbox.length; i++) {
                        checkbox[i].checked = false;
                    }
                    setCookie("pinName", this.attributes.pinsName.value, 1000, 2, 2, 1);
                    $("#snackbar").html("Zmieniono design pinezki").attr("class", "show");
                    setTimeout(function () { $("#snackbar").attr("class", ""); }, 3000);
                    this.checked = true;
                    var weather = $("#weatherInfo").html();
                    if (weather != "" && weather != null) {
                        initMap(Settings.curentLat, Settings.curentLan, 13, "map", mapStyleName, true, 1);
                        createWeatherContainer();
                        $("#weatherInfo").html(weather);
                        $("#hideWeather")
                            .html("Ukryj pogodę <i class='fas fa-arrow-down'></i>")
                            .on("click", hideWeather);
                    }
                    else
                        initMap("52.232", "21.007", 5, "map", mapStyleName, true, 1);
                });
            container.append(input).append('<span class="checkmark"></span>');
            $("#content")
                .append(container);
        });
    });
}

function savePOsitionClick() {
    $("#savePosition").on("click", function () {
        $("#adminPage nav").animate({ left: "-300px" }, 100);
        $("#content").empty();
        var map = $("<div>")
            .attr("id", "savePositionMap");
        $("#content").append(map);
        var id = getCookie('userID');
        GetSavedPositionAjax(id);
    });
}

function userSettingsClick() {
    $("#userSettings").on("click", function () {
        $("#adminPage nav").animate({ left: "-300px" }, 100);
        $("#content")
            .empty()
            .html("<h1>Ustawienia użytkownika:</h1>");
        var main = $("<div>");
        var div = $("<div>")
            .attr("class", "changePassword")
            .html(' <div class="Login"><div class= "form-group"><input type="password" class="form-control" id="changePassword" placeholder="Nowe Hasło"></div><div class="form-group"><input type="password" class="form-control" id="changePasswordTwo" placeholder="Powtórz hasło"> </div><button type="submit" id="changePasswordSubmit" class="btn btn-primary">Zmień Hasło</button><div id="changePasswordInfo" style="text-align: center; padding: 10px;"></div> </div>')
            .css("display", "none");

        var container = $("<div>")
            .attr("class", "userSettingsContainer")
            .html("Zmiana hasła")
            .on("click", function () {
                div.slideToggle(500);
            });
        main.append(container).append(div);
        $("#content").append(main);

        //event on change password submit
        changePasswordClick();

    });
}

function lastSearchClick() {
    $("#lastSearch").on("click", function () {
        $("#adminPage nav").animate({ left: "-300px" }, 100);
        $("#content").empty();
        var id = getCookie('userID');
        getLastSearchAjax(id);
    });
}


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
$(document).ready(function () {
    $("#registerSubmit").on("click", function () {
        if ($("#registerPassword")[0].value.length > 0 && $("#registerEmail")[0].value.length > 0 && $("#registerName")[0].value.length > 0) {
            if ($("#registerPassword")[0].value == $("#registerPasswordRepeat")[0].value) {
                $("#info").html("");
                var n = $("#registerName")[0].value;
                var e = $("#registerEmail")[0].value;
                var pass = $("#registerPassword")[0].value;
                $.ajax({
                    url: "php/Register.php",
                    data: { email: e, password: pass, name: n },
                    type: "POST",
                    success: function (data) {
                        var obj = data;
                        if (obj == "mistake")
                            $("#info").html("Na podany email utworzono już konto");
                        else if (obj == "success") {
                            $("#info").html("Gratulacje, konto zostało założone");
                            setTimeout(function () {
                                $("#registerForm").animate({ width: "0%" }, 500);
                                setTimeout(function () {
                                    $("#registerForm").css("display", "none");
                                }, 500);
                            }, 1500);
                        }


                    },
                    error: function (xhr, status, error) {
                    },
                });
            }
            else {
                $("#info").html("Podane hasła są różne");
            }
        }
        else {
            $("#info").html("Uzupełnij wymagane pola");
        }
    });

    $("#loginSubmit").on("click", function () {
        if ($("#inputEmail")[0].value.length > 0 && $("#inputPassword")[0].value.length > 0) {
            $("#loginInfo").html("");
            var e = $("#inputEmail")[0].value;
            var pass = $("#inputPassword")[0].value;
            $.ajax({
                url: "php/Login.php",
                data: { email: e, password: pass },
                type: "POST",
                success: function (data) {
                    var obj = data;
                    if (obj == "mistake")
                        $("#loginInfo").html("Podany email nie figuruje w naszej bazie");
                    else if (obj == "valid") {
                        $("#loginInfo").html("Zalogowano");
                        setTimeout(function () {
                            $("#login").animate({ width: "0%" }, 500);
                            setTimeout(function () {
                                $("#login").css("display", "none");
                            }, 500);
                        }, 1500);
                    }
                    else if (obj == "invalidPassword")
                        $("#loginInfo").html("Hasło niepoprawne");
                },
                error: function (xhr, status, error) {
                },
            });
        }
        else {
            $("#info").html("Uzupełnij wymagane pola");
        }
    });

    $("#recoverySubmit").on("click", function () {
        if ($("#recoveryInputEmail")[0].value.length > 0 && $("#recoveryInputName")[0].value.length > 0) {
            $("#loginInfo").html("");
            var newPass = '';
            for (var i = 0; i < 10; i++) {
                newPass += (Math.floor(Math.random() * 100) + 1).toString();
            }
            var e = $("#recoveryInputEmail")[0].value;
            var name = $("#recoveryInputName")[0].value;
            $.ajax({
                url: "php/PHPMailer/src/RecoveryPassword.php",
                data: { email: e, name: name, pass: newPass },
                type: "POST",
                success: function (data) {
                    var obj = data;
                    if (obj == "mistake")
                        $("#recoveryInfo").html("Podane dane są niepoprawne");
                    else if (obj == "yup") {
                        $("#recoveryInfo").html("Hasło zostało zresetowane, nowe hasło zostało wysłane na podany email");
                        setTimeout(function () {
                            $("#login").animate({ width: "0%" }, 500);
                            setTimeout(function () {
                                $("#login").css("display", "none");
                            }, 500);
                        }, 1500);
                    }
                    else if (obj == "no")
                        $("#recoveryInfo").html("Nie udało się zmienić hasła :(");
                    else
                        $("#recoveryInfo").html(obj);
                },
                error: function (xhr, status, error) {
                },
            });
        }
        else {
            $("#info").html("Uzupełnij wymagane pola");
        }
    });


});

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(key, value, expireDays, expireHours, expireMinutes, expireSeconds) {
    var expireDate = new Date();
    if (expireDays) {
        expireDate.setDate(expireDate.getDate() + expireDays);
    }
    if (expireHours) {
        expireDate.setHours(expireDate.getHours() + expireHours);
    }
    if (expireMinutes) {
        expireDate.setMinutes(expireDate.getMinutes() + expireMinutes);
    }
    if (expireSeconds) {
        expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
    }
    document.cookie = key + "=" + escape(value) +
        ";domain=" + window.location.hostname +
        ";path=/" +
        ";expires=" + expireDate.toUTCString();
}

function deleteCookie(name) {
    setCookie(name, "", null, null, null, 1);
}

function send() {
    var Name = $("#contactName").val();
    var Email = $("#contactEmail").val();
    var Phone = $("#contactPhone").val();
    var Message = $("#contactMessagearea").val();
    $(".icon-spin1").css("display", "block");
    $("#info").css("display", "block");
    $.ajax({
        url: "php/PHPMailer/src/send.php",
        data: { name: Name, email: Email, message: Message, phone: Phone },
        type: "POST",
        success: function (data) {
            $(".icon-spin1").css("display", "none");
            if (data == "ok") {
                $("#infoContent").empty();
                $("#infoContent").html("Wiadomość wysłana");
                $("#info").css("display", "block");
                $("#contactName").val("");
                $("#contactEmail").val("");
                $("#contactPhone").val("");
                $("#contactMessagearea").val("");
                $("#spiner").css("display", "none");
                setTimeout(function () {
                    $("#contact").animate({ right: "-300%" }, 1000);
                    $("#contact").animate({ opacity: "0" }, 1000);
                    setTimeout(function () {
                        $("#contact").css("z-index", "-1");
                        setTimeout(function () {
                            $("#contact").css("display", "none");
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
            else {
                $("#infoContent").empty();
                $("#infoContent").html("Bład");
                $("#info").css("display", "block");
            }
        },
        error: function (xhr, status, error) {
            //console.log(xhr);
        },
    });

}

//send ajax with password to change
function changePasswordAjax(id, password1) {
    $.ajax({
        url: "php/ChangePassword.php",
        data: { userID: id, password: password1 },
        type: "POST",
        success: function (data) {
            var obj = data;
            if (obj == 1) {
                $("#changePasswordInfo").html("");
                $("#snackbar").html("Zmieniono hasło").attr("class", "show");
                setTimeout(function () { $("#snackbar").attr("class", ""); }, 3000);
            }
            else {
                $("#changePasswordInfo").html("Wystąpił błąd. Hasło nie zostało zmienione");
            }
        },
        error: function (xhr, status, error) {
        },
    });
}

//send ajax with user id to show position
function GetSavedPositionAjax(id) {
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
        },
    });
}

//send ajax with user id to show user Last search
function getLastSearchAjax(id) {
    var userID = id;
    $.ajax({
        url: "php/GetLastSearch.php",
        data: { userID: userID, },
        type: "POST",
        success: function (data) {
            var obj = JSON.parse(data);
            var ul = $("<ul>");
            obj.splice(9, obj.length);
            var cityId = getCookie('defaultCity');
            obj.forEach(element => {
                var div = $("<li>")
                    .attr("class", "lastSearchOption")
                    .attr("key", element.key)
                    .attr("searchID", element.id)
                    .html(element.name)
                    .on("click", function () {
                        getWeatherFromKey(this.attributes.key.value);
                        var city = this.innerHTML;
                        $("#search").val(element.name);
                    });
                if (cityId != null && cityId != "" && element.key == cityId.split("%26")[0])
                    var color = "#e5c163";
                else
                    var color = "#000000";
                var icon = $("<i>")
                    .attr("class", "fas fa-save lastSearchButton")
                    .attr("key", element.key)
                    .attr("searchID", element.id)
                    .css("color", color)
                    //.attr("title", "Zapisz jako domyślne miejsce wyświetlania pogody")
                    .on("click", function (event) {
                        event.stopPropagation();
                        setCookie("defaultCity", this.attributes.key.value + "&" + element.name, 1000, 2, 2, 1);
                        $("#snackbar").html("Zapisano domyślne miejsce").attr("class", "show");
                        getLastSearchAjax(userID)
                        setTimeout(function () { $("#snackbar").attr("class", ""); }, 3000);
                    });
                var popup = $("<div>")
                    .attr("class", "popup")
                    .append(icon)
                    .append('<span class= "popupText">Zapisz jako domyślne miejsce wyświetlania pogody</span >');
                div.append(popup);
                ul.append(div);
            });
            $("#content")
                .html("<h1>Ostatnio wyszukane:</h1>")
                .append(ul);
        },
        error: function (xhr, status, error) {
        },
    });
}
$(document).ready(function () {
    $("#registerSubmit").on("click", function () {
        console.log($("#registerPassword"))
        if ($("#registerPassword")[0].value.length > 0 && $("#registerEmail")[0].value.length > 0 && $("#registerName")[0].value.length > 0) {
            if ($("#registerPassword")[0].value == $("#registerPasswordRepeat")[0].value) {
                $("#info").html("");
                var n = $("#registerName")[0].value;
                var e = $("#registerEmail")[0].value;
                var pass = $("#registerPassword")[0].value;
                console.log(n, e, pass);
                $.ajax({
                    url: "php/Register.php",
                    data: { email: e, password: pass, name: n },
                    type: "POST",
                    success: function (data) {
                        var obj = data;
                        console.log(obj);
                        if (obj == "mistake")
                            $("#info").html("Na podany email utworzono już konto");
                        else if (obj == "success") {
                            $("#info").html("Gratulacje, konto zostało założone");
                            setTimeout(function () {
                                $("#registerForm").animate({ right: "-120%" }, 500);
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
        console.log($("#loginSubmit"))
        if ($("#inputEmail")[0].value.length > 0 && $("#inputPassword")[0].value.length > 0) {
            $("#loginInfo").html("");
            var e = $("#inputEmail")[0].value;
            var pass = $("#inputPassword")[0].value;
            console.log(e, pass);
            $.ajax({
                url: "php/Login.php",
                data: { email: e, password: pass },
                type: "POST",
                success: function (data) {
                    var obj = data;
                    console.log(obj);
                    if (obj == "mistake")
                        $("#loginInfo").html("Podany email nie figuruje w naszej bazie");
                    else if (obj == "valid") {
                        $("#loginInfo").html("Zalogowano");
                        setTimeout(function () {
                            $("#login").animate({ right: "-120%" }, 500);
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
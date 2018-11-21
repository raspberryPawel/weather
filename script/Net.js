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
                        else if (obj == "success")
                            $("#info").html("Gratulacje, konto zostało założone");
                    },
                    error: function (xhr, status, error) {
                    },
                });
                console.log("identyczne");
            }
            else {
                $("#info").html("Podane hasła są różne");
                console.log("taki chuj nie identyczne");
            }
        }
        else {
            $("#info").html("Uzupełnij wymagane pola");
            console.log("taki chuj nie identyczne");
        }

    });
});
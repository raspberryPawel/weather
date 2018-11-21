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
        $("#login").css("transition", "2s").css("top", "-1000%");
    });
    //hide register panel
    $("#registerCancel").on("click", function () {
        $("#registerForm").css("transition", "2s").css("top", "-1000%");
    });
    //show login panel
    $("#sigIn").on("click", function () {
        $("#login").css("transition", "1s").css("top", "0%");
        click = show_Menu(click);
    });
    //show register panel
    $("#register").on("click", function () {
        $("#registerForm").css("transition", "1s").css("top", "0%");
        click = show_Menu(click);
    });

    //logout
    $("#logout").on("click", function () {
        deleteCookie('userName');
        $("#login").css("transition", "2s").css("top", "-1000%");
        click = show_Menu(click);
    });
    //admin page sidebar 
    $("#dismiss").on("click", function () {
        $("#adminPage nav").animate({ left: "-350px" }, 500);
    });

    $("#show").on("click", function () {
        $("#adminPage nav").animate({ left: "0px" }, 500);
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
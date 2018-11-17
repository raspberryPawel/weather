$(document).ready(function () {
    // wysuwane menu
    var click = 0;
    $("#menu-button").on("click", function () {
        click = show_Menu(click);
    });

    $("#loginCancel").on("click", function () {
        $("#login").css("transition", "1s").css("top", "-100%");
    });
    $("#sigIn").on("click", function () {
        $("#login").css("transition", "1s").css("top", "0%");
        click = show_Menu(click);
    });
    $("#register").on("click", function () {
        $("#registerForm").css("transition", "1s").css("top", "0%");
        click = show_Menu(click);
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
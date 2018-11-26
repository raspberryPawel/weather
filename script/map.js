function initMap(latitude, longitude, zoomVal, id, mapStyle, controlMap, positionObject) {
    //var myLatLng = { lat: latitude, lng: longitude };
    var pinName = getCookie('pinName');
    var myLatLng = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
    console.log("inicjuje mapę");
    // Create a map object and specify the DOM element
    // for display.
    var map = new google.maps.Map(document.getElementById(id), {
        center: myLatLng,
        zoom: zoomVal,
        styles: mapStyle,
    });

    // Create a marker and set its position.
    if (controlMap) {
        var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            title: 'Hello World!',
            icon: 'images/GooglePins/'+pinName+'.png' // null = default icon
        });
    }
    else {
        positionObject.forEach(element => {
            var myLatLng = new google.maps.LatLng(parseFloat(element.latitude), parseFloat(element.longitude));
            var marker = new google.maps.Marker({
                map: map,
                position: myLatLng,
                title: 'Odwiedzono: ' + element.date,
                icon: 'images/GooglePins/'+pinName+'.png' // null = default icon
            });
        });
    }
}
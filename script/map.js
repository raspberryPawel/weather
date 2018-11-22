function initMap(latitude, longitude, zoomVal, id, mapStyle) {
    var stylesTab = [
        { name: "multiMapStyle", visibleName: "Multi Brand Network", },
        { name: "lightMapStyle", visibleName: "Light Grey", },
        { name: "paleMapStyle", visibleName: "Pale Dawn", },
        { name: "assinMapStyle", visibleName: "Assassin's Creed IV", },
        { name: "appleMapStyle", visibleName: "Apple Maps-esque", },
        { name: "grayMapStyle", visibleName: "Shades of Grey", }
    ]

    //var myLatLng = { lat: latitude, lng: longitude };
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
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Hello World!',
        icon: 'images/marker.png' // null = default icon
    });
}
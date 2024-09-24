$(function() {
    var map = L.map('map').setView([32.7157, -117.1611], 9);
    var popups = [];

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

    $.getJSON("data.json", function(result){
        $.each(result, function(i, field){
            let dynamicRowHTML = `
                <tr> 
                    <td>${field.name}</td> 
                    <td>${field.description}</td> 
                    <td><a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${field.location}">Directions <i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
                </tr>`;
            $('#locations > tbody').append(dynamicRowHTML)
            var marker = L.marker(field.location).addTo(map);
            var popup = marker.bindPopup(`<b>${field.name}:</b> ${field.description} <a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${field.location}">Directions <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`);
            popups.push(popup);
        });
        console.log(popups);
    });

    $('#locations tbody').on('click', 'tr', function() {
        popups[$(this).index()].openPopup();
        $(window).scrollTop(0);
    });

    $("button").on(click, function() {
        $('#locations tbody').addClass("collapse");
    });
});
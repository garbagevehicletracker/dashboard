
var map = new Microsoft.Maps.Map('#map', {
    credentials: 'Akg60X7E388oEBNDe_wQNZMX_PmOSpXoWdurv6g5MaTx-R3keu55Rii_5-3UiG0-'
});

var allCoordinates = [];

function updateMap() {

    var recentCoordinates = allCoordinates.slice(-5);
    var locations = recentCoordinates.map(coord => new Microsoft.Maps.Location(coord.latitude, coord.longitude));

    // map.entities.clear();
    map.entities.remove(pushpin);

    var polyline = new Microsoft.Maps.Polyline(locations, {
        strokeColor: 'blue',
        strokeThickness: 3
    });

    map.entities.push(polyline);

    if (recentCoordinates.length > 0) {
        var latestCoordinate = recentCoordinates[recentCoordinates.length - 1];
        var latestLocation = new Microsoft.Maps.Location(latestCoordinate.latitude, latestCoordinate.longitude);

        var pushpin = new Microsoft.Maps.Pushpin(latestLocation, {
            color: 'red',
            title: 'Latest Coordinate'
        });

        map.entities.push(pushpin);
        // Microsoft.Maps.Events.animate(pushpin, Microsoft.Maps.Animation.drop);
    }
}


function fetchCoordinates() {
    fetch('https://garbage-collect-backend.onrender.com/get/user1')
        .then(response => response.json())
        .then(data => {
            var latitude = data.latitude;
            var longitude = data.longitude;
            console.log(latitude, longitude);
            allCoordinates.push({ latitude, longitude });

            updateMap();
        })
        .catch(error => console.error('Error fetching coordinates:', error))
        .finally(() => {
            setTimeout(fetchCoordinates, 1000);
        });
}

fetchCoordinates();

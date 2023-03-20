const url = "http://127.0.0.1:5000/api/all-data-json";

let myMap = L.map("map", {
  center: [-37.8136, 144.9631],
  zoom: 13
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// create a new marker cluster group
let markers = L.markerClusterGroup();

d3.json(url).then(function (data) {
  for (let i = 0; i < data.length; i++) {
    let record = data[i];
    let location = [record.Latitude, record.Longitude];
    // create a new marker and add it to the marker cluster group
    let marker = L.marker(location)
      .bindPopup(`<h3>Type ${record.Type}</h3> <hr> <h3>Suburb ${record.Suburb}</h3>`);
    markers.addLayer(marker);
  }

  // add the marker cluster group to the map
  myMap.addLayer(markers);
});



const url = "http://127.0.0.1:5000/api/all-data-json";
const submitButton_300_400 = document.getElementById('300-400');
const submitButton_401_500 = document.getElementById('401-500');
const submitButton_501_600 = document.getElementById('501-600');
const submitButton_distance = document.getElementById('Distance10k');
let myMap = L.map("map", {
  center: [-37.8136, 144.9631],
  zoom: 10
});
// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
// create a new marker cluster group
let markers_1 = L.markerClusterGroup();
let markers_2 = L.markerClusterGroup();
let markers_3 = L.markerClusterGroup();
let markers_4 = L.markerClusterGroup();
submitButton_300_400.addEventListener('click', () => {
    remove_layers() ;
    load_markers(300, 400, markers_1) ;
});
submitButton_401_500.addEventListener('click', () => {
    remove_layers();
    load_markers(401, 500, markers_2) ;
});
submitButton_501_600.addEventListener('click', () => {
    remove_layers();
    load_markers(501, 600, markers_3) ;
});
    
submitButton_distance.addEventListener('click', () => {
    remove_layers() ;
    
    d3.json(url).then(function (data) {
        for (let i = 0; i < data.length; i++) {
            let record = data[i];
            if (record.Distance <= 10) {
                let location = [record.Latitude, record.Longitude];
                // create a new marker and add it to the marker cluster group
                let marker = L.marker(location)
                    .bindPopup(`<h1>Suburb : ${record.Suburb}</h1> 
                                <h3>Distance from CBD : ${record.Distance} kms</h3>
                                <h3>Median Weekly Rent : $${record.Median_rent_weekly}</h3>
                                <h3>Number of Bathroom : ${record.Number_of_Bathroom}</h3>
                                <h3>Number of Bedroom : ${record.Number_of_Bedroom}</h3>
                                <h3>Number of Carpark : ${record.Number_of_Carpark}</h3>`);
                    markers_4.addLayer(marker);
        
                // add the marker cluster group to the map
                myMap.addLayer(markers_4);
            }
        }
    });
});
function remove_layers() {
    myMap.removeLayer(markers_1);
    markers_1.clearLayers();
    myMap.removeLayer(markers_2);
    markers_2.clearLayers();
    myMap.removeLayer(markers_3);
    markers_3.clearLayers();
    myMap.removeLayer(markers_4);
    markers_4.clearLayers();    
        
};
function load_markers(start_rent, end_rent, marker_type) {
    d3.json(url).then(function (data) {
        for (let i = 0; i < data.length; i++) {
            let record = data[i];
            if (record.Median_rent_weekly > start_rent && record.Median_rent_weekly < end_rent) {
                let location = [record.Latitude, record.Longitude];
                // create a new marker and add it to the marker cluster group
                let marker = L.marker(location)
                    .bindPopup(`<h1>Suburb : ${record.Suburb}</h1> 
                                <h3>Distance from CBD : ${record.Distance} kms</h3>
                                <h3>Median Weekly Rent : $${record.Median_rent_weekly}</h3>
                                <h3>Number of Bathroom : ${record.Number_of_Bathroom}</h3>
                                <h3>Number of Bedroom : ${record.Number_of_Bedroom}</h3>
                                <h3>Number of Carpark : ${record.Number_of_Carpark}</h3>`);
                    marker_type.addLayer(marker);
        
                // add the marker cluster group to the map
                myMap.addLayer(marker_type);
            }
        }
    })
};

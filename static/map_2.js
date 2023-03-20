const url = "http://127.0.0.1:5000/api/all-data-json";
// const chartDiv = document.getElementById("chart");


const dropdown = document.getElementById("suburbSelect");
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
  const suburbs = [...new Set(data.map(d => d.Suburb))];

  // Create initial data for the first suburb in the list
  let chartData = createDataForSuburb(data, suburbs[0]);
  createChart(chartData, suburbs[0]);

  // Populate dropdown menu
  populateDropdown(suburbs);

  // Add change event listener to dropdown
  dropdown.addEventListener("change", function () {
    const selectedSuburb = this.value;
    const newData = createDataForSuburb(data, selectedSuburb);
    updateChart(newData, selectedSuburb);
  });

  function createDataForSuburb(data, suburb) {
    let filteredData = data.filter(d => d.Suburb === suburb);
    console.log(filteredData.length);
    return filteredData;
  };

  function createChart(data, selectedSuburb) {
    // clear the existing markers from the marker cluster group
    markers.clearLayers();

    for (let i = 0; i < data.length; i++) {
      let record = data[i]

      if (record.Suburb == selectedSuburb) {
        let location = [record.Latitude, record.Longitude]
        // create a new marker and add it to the marker cluster group
        let marker = L.marker(location)
          .bindPopup(`<h3>Type ${record.Type}</h3> <hr> <h3>Suburb ${record.Suburb}</h3>`);
        markers.addLayer(marker);
      }
    }

    // add the marker cluster group to the map
    myMap.addLayer(markers);
  }

  function updateChart(data, selectedSuburb) {
    // clear the existing markers from the marker cluster group
    markers.clearLayers();

    for (let i = 0; i < data.length; i++) {
      let record = data[i]

      if (record.Suburb == selectedSuburb) {
        let location = [record.Latitude, record.Longitude]
        // create a new marker and add it to the marker cluster group
        let marker = L.marker(location)
          .bindPopup(`<h3>Type ${record.Type}</h3> <hr> <h3>Suburb ${record.Suburb}</h3>`);
        markers.addLayer(marker);
      }
    }

    // add the marker cluster group to the map
    myMap.addLayer(markers);
  }

  function populateDropdown(suburbs) {
    suburbs.forEach(function (suburb) {
      const option = document.createElement("option");
      option.text = suburb;
      dropdown.add(option);
    });
  }
});

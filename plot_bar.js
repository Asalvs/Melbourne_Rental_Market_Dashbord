// STEP 1

// Get the API URL

const url = "http://127.0.0.1:5000/api/all-data-json";
// const dropdown = document.getElementById("suburbSelect");

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);

  // STEP 2

  let locs = data.Suburb;
  console.log("All suburbs", locs);

  //Populate the dropdown list
  var dropdownMenu = d3.select("#suburbSelect");
  locs.forEach(function(option) {
    dropdownMenu.append("option").text(option).property("value", option);
  });

  //Creating a function that updates bar chart when new suburb is selected
  function updateCharts(sample) {
    // Filter the data to get the sample values, OTU ids, and OTU labels for the selected sample
    var filteredData = data.Suburb.filter(d => d.Suburb === sample)[0];
    var sampleValues = filteredData.Number_of_Bedroom;
    var noBeds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Create the trace for the horizontal bar chart
    var barTrace = {
      x: sampleValues,
      y: noBeds,
      text: noBeds,
      type: "bar",
      orientation: "v"
    };

    // Define the data array and layout for the bar chart
    var barData = [barTrace];
    var barLayout = {
      title: "Number of Bedrooms",
      xaxis: { title: "Frequency" },
      yaxis: { title: "Number of Bedrooms" }
    };

    // Use Plotly to plot the bar chart to the "bar" div
    Plotly.newPlot("bar", barData, barLayout);
  }

  // Set the default sample to the first one in the dataset
  var defaultSuburb = locs[0];

  // Call the updateCharts function with the default sample to initialize the charts
  updateCharts(defaultSuburb);

  // Add an event listener to the dropdown menu to update the charts when a new sample is selected
  dropdownMenu.on("change", function() {
    var newSuburb = d3.select(this).property("value");
    updateCharts(newSuburb);
  });
});
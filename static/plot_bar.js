const url = "http://127.0.0.1:5000/api/all-data-json";
const chartDiv = document.getElementById("chart");
const dropdown = document.getElementById("suburbSelect");

// Load data from JSON file
d3.json(url).then(function (data) {
  const suburbs = [...new Set(data.map(d => d.Suburb))];
  const bedrooms = [...new Set(data.map(d => d.Number_of_Bedroom))];

  // Create initial bar chart
  const chartData = createDataForSuburb(data, suburbs[0]);
  createChart(chartData);

  // Populate dropdown menu
  populateDropdown(suburbs);

  // Add change event listener to dropdown
  dropdown.addEventListener("change", function () {
    const selectedSuburb = this.value;
    const newData = createDataForSuburb(data, selectedSuburb);
    updateChart(newData);
  });

  function createDataForSuburb(data, suburb) {
    const filteredData = data.filter(d => d.Suburb === suburb);
    const typeCount = {};

    bedrooms.forEach(function (type) {
      const count = filteredData.filter(d => d.Number_of_Bedroom === type).length;
      typeCount[type] = count;
    });

    return {
      x: Object.keys(typeCount),
      y: Object.values(typeCount),
      type: "bar"
    };
  }

  function createChart(data) {
    const layout = {
      title: "Number of Bedrooms per Suburb",
      height: 500,
      width: 700,
      xaxis: {
        title: "Number of Bedrooms"
      },
      yaxis: {
        title: "Count"
      }
    
    };

    Plotly.newPlot(chartDiv, [data], layout);
  }

  function updateChart(data) {
    const chartData = {
      x: data.x,
      y: data.y,
      type: "bar"
    };

    Plotly.react(chartDiv, [chartData]);
  }

  function populateDropdown(suburbs) {
    suburbs.forEach(function (suburb) {
      const option = document.createElement("option");
      option.text = suburb;
      dropdown.add(option);
    });
  }
});
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
      type: "bar",
      marker: { color: "rgba(58, 200, 225, 0.7)", line: { color: "rgba(58, 200, 225, 1)", width: 1.5 } } // Customize bar appearance
    };
  }

  function createChart(data) {
    const layout = {
      title: "Number of Bedrooms per Suburb",
      height: 500,
      width: 700,
      xaxis: {
        title: "Number of Bedrooms",
        tickfont: { size: 14, color: "#333"} // Customize x-axis tick labels
      },
      yaxis: {
        title: "Count",
        tickfont: { size: 14, color: "#333" } // Customize y-axis tick labels
      },
      plot_bgcolor: "#f4f4f4", // Change plot background color
      margin: { t: 40, b: 40, l: 80, r: 10 } // Adjust chart margins
    };

    Plotly.newPlot(chartDiv, [data], layout);
  }

  function updateChart(data) {
    const chartData = [data];
    const layout = {
      title: "Number of Bedrooms per Suburb",
      height: 500,
      width: 700,
      xaxis: {
        title: "Number of Bedrooms",
        tickfont: { size: 14, color: "#333" }
      },
      yaxis: {
        title: "Count",
        tickfont: { size: 14, color: "#333" }
      },
      plot_bgcolor: "#f4f4f4",
      margin: { t: 40, b: 40, l: 80, r: 10 }
    };

    Plotly.react(chartDiv, chartData, layout);
  }

  function populateDropdown(suburbs) {
    suburbs.forEach(function (suburb) {
      const option= document.createElement("option");
      option.text = suburb;
      dropdown.add(option);
    });
  }
});
const url = "http://127.0.0.1:5000/api/all-data-json";
const chartDiv = document.getElementById("chart");

// Load data from JSON file
d3.json(url).then(function (data) {
  const suburbs = [...new Set(data.map(d => d.Suburb))]; // get unique suburbs
  const traces = suburbs.map(suburb => {
    const filteredData = data.filter(d => d.Suburb === suburb);
    return {
      x: filteredData.map(d => d.Distance),
      y: filteredData.map(d => d.Median_rent_weekly),
      mode: 'markers',
      type: 'scatter',
      name: suburb,
      marker: {
        size: 10,
        opacity: 0.75
      }
    }
  });

  const layout = {
    title: 'Average Rent vs Distance from CBD',
    xaxis: {
      title: 'Distance from Melbourne CBD (km)'
    },
    yaxis: {
      title: 'Average Rent (AU$ pw)'
    },
    height: 700,
    width: 1500,
    legend: {
      x: 1,
      y: 1
    }
  };

  Plotly.newPlot(chartDiv, traces, layout);
});

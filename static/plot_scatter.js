const url = "http://127.0.0.1:5000/api/all-data-json";
var chartDiv = document.getElementById('chart');


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
        size: 11.2,
        opacity:2
      }
    }
  });

  const layout = {
    title: {
      text: 'Average Rent vs Distance from CBD',
      font: {
        size: 24,
        family: 'Arial',
        color: '#333'
      }
    },
    xaxis: {
      title: {
        text: 'Distance from Melbourne CBD (km)',
        font: {
          size: 18,
          family: 'Arial',
          color: '#333'
        }
      },
      tickfont: {
        size: 14,
        family: 'Arial',
        color: '#333'
      }
    },
    yaxis: {
      title: {
        text: 'Average Rent (AU$ pw)',
        font: {
          size: 18,
          family: 'Arial',
          color: '#333'
        }
      },
      tickfont: {
        size: 14,
        family: 'Arial',
        color: '#333'
      }
    },
    autosize: true,
    height: null,
    width: null,
    legend: {
      x: 1,
      y: 1
    },
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    paper_bgcolor: "rgba(0, 0, 0, 0)"
  };

  Plotly.newPlot(chartDiv, traces, layout, {responsive: true});

});

// Resize the chart when the window is resized
window.addEventListener('resize', function() {
  Plotly.Plots.resize(chartDiv);
});
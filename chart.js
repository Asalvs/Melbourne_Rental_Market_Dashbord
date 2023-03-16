
// Define the URL of the JSON data source
const dataUrl = 'http://127.0.0.1:5000/data';

// Get the plot element and the suburb select element from the DOM
const plotElement = document.getElementById('plot');
const suburbSelect = document.getElementById('suburb-select');

// Load the JSON data from the server
fetch(dataUrl)
  .then(response => response.json())
  .then(data => {
    // Get an array of unique suburb names from the data
    const suburbNames = [...new Set(data.map(d => d.Suburb))];

    // Populate the suburb select dropdown with the suburb names
    suburbNames.forEach(suburb => {
      const option = document.createElement('option');
      option.value = suburb;
      option.textContent = suburb;
      suburbSelect.appendChild(option);
    });

    // Create a function to update the chart when the suburb select value changes
    function updateChart(selectedSuburb) {
      // Filter the data for the selected suburb
      const filteredData = data.filter(d => d.Suburb === selectedSuburb);

      // Get the counts of each property type for the selected suburb
      const typeCounts = filteredData.reduce((counts, d) => {
        counts[d.Type] = (counts[d.Type] || 0) + 1;
        return counts;
      }, {});

      // Convert the type counts to a Plotly data array
      const plotData = [{
        values: Object.values(typeCounts),
        labels: Object.keys(typeCounts),
        type: 'pie'
      }];

      // Set the plot layout options
      const plotLayout = {
        title: `Property Types in ${selectedSuburb}`,
        height: 400,
        width: 400
      };

      // Plot the chart
      Plotly.newPlot(plotElement, plotData, plotLayout);
    }

    // Initialize the chart with the first suburb in the dropdown
    updateChart(suburbNames[0]);

    // Add an event listener to update the chart when the suburb select value changes
    suburbSelect.addEventListener('change', () => {
      updateChart(suburbSelect.value);
    });
  })
  

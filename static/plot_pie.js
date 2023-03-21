const url = "http://127.0.0.1:5000/api/all-data-json";
const chartCanvas = document.createElement("canvas");
const chartDiv = document.getElementById("chart");
chartDiv.appendChild(chartCanvas);
const dropdown = document.getElementById("suburbSelect");

let chart; // Declare chart variable outside of createChart function

// Load data from JSON file
fetch(url)
  .then(response => response.json())
  .then(data => {
    const suburbs = [...new Set(data.map(d => d.Suburb))];
    const types = [...new Set(data.map(d => d.Type))];

    // Create initial pie chart
    const chartData = createDataForSuburb(data, suburbs[0]);
    createChart(chartCanvas, chartData);

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
      types.forEach(function (type) {
        const count = filteredData.filter(d => d.Type === type).length;
        typeCount[type] = count;
      });
      
      const legendLabels = ['Unit', 'House', 'Townhouse'];
      const labels = Object.keys(typeCount).map(function (label) {
        if (label === 'u') {
          return legendLabels[0];
        } else if (label === 'h') {
          return legendLabels[1];
        } else if (label === 't') {
          return legendLabels[2];
        } else {
          return label;
        }
      });
    
      return {
        data: Object.values(typeCount),
        labels: labels,
        legendLabels: legendLabels,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ]
      };
    }

    function createChart(canvas, data) {
      const newLocal = 'top';
      chart = new Chart(canvas, {
        type: 'doughnut',
        data: {
          datasets: [data],
          labels: data.labels
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 4,
          width: 10,
          height: 50,
          title: {
            display: true,
            text: "Rental Property types In Melbourne",
            position: "top",
            align: "center",
            fontSize: 18,
            fontColor: "red"
          },

        }
      });
    }

    function updateChart(data) {
      chart.data.datasets.pop();
      chart.data.datasets.push(data);
      chart.data.labels = data.labels.map(function (label) {
        if (label === 'u') {
          return 'Units';
        } else if (label === 'h') {
          return 'House';
        } else if (label === 't') {
          return 'Townhouse';
        } else {
          return label;
        }
      });
      chart.update();
    }

    function populateDropdown(suburbs) {
      suburbs.forEach(function (suburb) {
        const option = document.createElement("option");
        option.text = suburb;
        dropdown.add(option);
      });
    }
  });

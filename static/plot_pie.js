const url = "http://127.0.0.1:5000/api/all-data-json";
const chartCanvas1 = document.createElement("canvas");
const chartCanvas2 = document.createElement("canvas");
const chartDiv1 = document.getElementById("chart1");
const chartDiv2 = document.getElementById("chart2");
chartDiv1.appendChild(chartCanvas1);
chartDiv2.appendChild(chartCanvas2);
const dropdown = document.getElementById("suburbSelect");

let chart1, chart2; // Declare chart variables outside of createChart function

// Load data from JSON file
fetch(url)
  .then(response => response.json())
  .then(data => {
    const suburbs = [...new Set(data.map(d => d.Suburb))];

    // Create initial pie charts
    const chart1Data = createDataForSuburb(data, suburbs[0], 'Type');
    const chart2Data = createDataForSuburb(data, suburbs[0], 'Real_Estate_Agent');
    createChart(chartCanvas1, chart1Data, 'Type');
    createChart(chartCanvas2, chart2Data, 'Real_Estate_Agent');

    // Populate dropdown menu
    populateDropdown(suburbs);

    // Add change event listener to dropdown
    dropdown.addEventListener("change", function () {
      const selectedSuburb = this.value;
      const newData1 = createDataForSuburb(data, selectedSuburb, 'Type');
      const newData2 = createDataForSuburb(data, selectedSuburb, 'Real_Estate_Agent');
      updateChart(chart1, newData1);
      updateChart(chart2, newData2);
    });

    function createDataForSuburb(data, suburb, category) {
      const filteredData = data.filter(d => d.Suburb === suburb);

      if (category === 'Type') {
        const typeCount = {};
        const types = [...new Set(data.map(d => d.Type))];
        types.forEach(function (type) {
          const count = filteredData.filter(d => d.Type === type).length;
          typeCount[type] = count;
        });

        const labels = Object.keys(typeCount).map(function (label) {
          return label === 'u' ? 'Unit' : label === 'h' ? 'House' : 'Townhouse';
        });

        return {
          data: Object.values(typeCount),
          labels: labels,
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
      } else if (category === 'Real_Estate_Agent') {
        const agentCount = {};

        filteredData.forEach(d => {
          if (agentCount[d.Real_Estate_Agent]) {
            agentCount[d.Real_Estate_Agent]++;
          } else {
            agentCount[d.Real_Estate_Agent] = 1;
          }
        });

        // Sort real estate agents by count and select the top 5
        const sortedAgents = Object.entries(agentCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

        return {
          data: sortedAgents.map(agent => agent[1]),
          labels: sortedAgents.map(agent => agent[0]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ]
        };
      }
    }

    function createChart(canvas, data, category) {
      const title = category === 'Type' ? 'Rental Property Types in Melbourne (by Suburb)' : 'Top 5 Real Estate Agents (by Suburb)';
      chart = new Chart(canvas, {
        type: 'doughnut',
        data: {
          datasets: [data],
          labels: data.labels
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          title: {
            display: true,
            text: title,
            position: "center",
            align: "center",
            fontSize: 20,
            fontColor: "red"
          }
        }
      });

      if (category === 'Type') {
        chart1 = chart;
      } else {
        chart2 = chart;
      }
    }

    function updateChart(chart, data) {
      chart.data.datasets.pop();
      chart.data.datasets.push(data);
      chart.data.labels = data.labels;
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

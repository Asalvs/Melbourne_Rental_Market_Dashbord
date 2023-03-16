console.log(data2);

// // Greek god names
// Suburbs = data.map(function (row){
//   return row.Suburb
// });

// Trace for the Greek Data
let trace1 = {
    x: data2.map(row => row.Suburb),
    y: data2.map(row => row.Median_rent_weekly),
    type: "bar"
  };

// Data trace array
let traceData = [trace1];

// Apply the group barmode to the layout
let layout = {
  title: "Greek gods search results"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);
const url = "http://127.0.0.1:5000/api/all-data-json";

d3.json(url).then(function(data) {
    console.log(data);
    
    var layout = {
      title: "Melbourne Rental Market",
      xaxis: {
        title: "Distance to CBD (km)"
      },
      yaxis: {
        title: "Price per Week ($)"
      }
    };
    
    var trace = {
      x: data.map(d => d.Distance),
      y: data.map(d => d.Median_Rent_Weekly),
      mode: "markers",
      type: "scatter"
    };
    
    var plotData = [trace];
    
    Plotly.newPlot("plot", plotData, layout);
  });

  
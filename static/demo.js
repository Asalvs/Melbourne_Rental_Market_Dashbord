const url = "http://127.0.0.1:5000/api/all-data-json";
d3.json(url).then(function (response) {
    console.log(response);
});


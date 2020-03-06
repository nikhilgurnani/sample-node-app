const express = require('express');
const app = express();
const port = 3000;

const https = require('https');


app.use(express.json());

app.get('/', function(request, response){

	return response.json({status: "Healthy!"});

});

app.get('/countries', function(request, response) {

    https.get('https://restcountries.eu/rest/v2/all', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        return response.json(JSON.parse(data));
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

})

app.listen(port, function(){
	console.log('Listening at port 3000!');
});

module.exports = app;

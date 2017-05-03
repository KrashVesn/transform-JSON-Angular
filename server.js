var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
	res.sendFile('index.html')
});



app.get('/js/subscribe.json', function(req, res) {
	res.sendFile('js/subscribe.json')
})


app.listen(8000, function() {
	console.log('server started on port 8000')
});

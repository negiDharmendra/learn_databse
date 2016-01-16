var express = require('express');
var body_parser = require('body-parser');
var pg = require('pg');
console.log(pg)

var app = express();
module.exports = app;

app.set('view engine', 'jade');

app.use(express.static('./public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', webname: 'THIS IS MY FIRST WEB PAGE USING JADE'});
});
app.use(body_parser.urlencoded({ extended: true }));


app.post('/internInfo', function (req, res) {
	console.log(req.body)
	res.send()
});


function addData(internInfo){
	pg.connect(constring,function(client,err))
}
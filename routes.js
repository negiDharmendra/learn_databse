var express = require('express');
var body_parser = require('body-parser');
var pg = require('pg');
var pgDb = require('./data/info.js');
var conString = pgDb.hostname + "://postgres:"+pgDb.password+"@localhost/step_intern";

var app = express();
module.exports = app;

app.set('view engine', 'jade');

app.use(express.static('./views'));

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hey',
        webname: 'THIS IS MY FIRST WEB PAGE USING JADE'
    });
});
app.use(body_parser.urlencoded({
    extended: true
}));


app.post('/internInfo', function(req, res) {
    console.log(req.body);
    addData(req.body);
    res.redirect('/');
});
app.post('/search_intern',function(req,res){
    console.log(req.body)
	getData(req.body,res)
})

function addData(internInfo) {
	var data = [];
	for(var index in internInfo)
		data.push('\''+internInfo[index]+'\'');
    pg.connect(conString, function(err, client, done) {
        if (err)
            return console.error('error fetching client from pool', err);
        client.query('insert into step_intern_2015 values('+data.join(',')+');',function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
        });
    })
}

function getData(queryText,res){
	var searchedData = [];
	var formattedQuer = [];
	console.log("formattedQuer=========>  ",queryText)
	for(var index in queryText)
		if(queryText[index])formattedQuer.push(index+'=\''+queryText[index]+'\'');
	console.log("formattedQuer=========>  ",'select * from step_intern_2015 where '+formattedQuer.join('AND')+';')
	pg.connect(conString,function(err,client,done){
		if(err)return console.error('error fetching client from pool', err);
		var query = client.query('select * from step_intern_2015 where '+formattedQuer.join(' AND ')+';');
		query.on('row',function(row){
			searchedData.push(row);
		})
		query.on('end',function(row){
			done();
			console.log("done=======>   ",JSON.stringify(searchedData))
			res.send(JSON.stringify(searchedData));
		})
	})
}








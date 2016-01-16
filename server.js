var http = require('http');
var app =  require('./routes.js')


http.createServer(app).listen(3000);